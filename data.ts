import {pool} from './db';
import { QueryResult } from 'pg';
import {boxscore, player, team, game, Player, Gamelog, data_obj} from './types';
import {get_players, write} from './functions';

const db_query = (query:string, values:any) => {
    return new Promise<QueryResult>((resolve, reject) => {
        pool.query(query, values, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

let players:player[] = [];
let teams:team[] = [];
let schedule:game[] = [];
let seasons:string[] = [];
db_query('SELECT * FROM player', []).then(data => {
    let rows = data.rows;
    let players_db:Player[] = [];

    rows.forEach(row => {
        const pos_a:string = row.position;
        const pos_b = pos_a.replace('{' , '');
        const pos_c = pos_b.replace('}' , '');
        const positions:string[] = pos_c.split(',');
        const player:Player = new Player(
            row.id, 
            row.first_name, 
            row.last_name, 
            row.team_id, 
            row.jsy_number, 
            positions, 
            row.height_inches, 
            row.weight_lbs, 
            row.last_attended, 
            row.country, 
            row.draft_year, 
            row.draft_round, 
            row.draft_number, 
            row.from_year, 
            row.to_year, 
            row.slug
        );
        players_db.push(player);
    });
    // get gamelogs in descending order
    db_query('SELECT * FROM gamelog ORDER BY game_id DESC', []).then(data => {
        rows = data.rows;
        let gamelogs_db:Gamelog[] = [];
        rows.forEach(row => {
            const stats:boxscore = {
                games_played: row.games_played,
                minutes: row.minutes,
                fgm: row.fgm,
                fga: row.fga,
                fg_pct: row.fg_pct,
                ftm: row.ftm,
                fta: row.fta,
                ft_pct: row.ft_pct,
                fg3m: row.fg3m,
                fg3a: row.fg3a,
                fg3_pct: row.fg3_pct,
                pts: row.pts,
                oreb: row.oreb,
                dreb: row.dreb,
                reb: row.reb,
                ast: row.ast,
                stl: row.stl,
                blk: row.blk,
                tov: row.tov,
                pf: row.pf,
                plus_minus: row.plus_minus,
                fantasy_pts: row.fantasy_pts 
            };
            const gamelog:Gamelog = new Gamelog(
                row.game_id,
                row.player_id,
                row.team_id,
                stats
            );
            gamelogs_db.push(gamelog);
        });

        players = get_players(players_db, gamelogs_db);
    });
    return db_query('SELECT * FROM team', []);
}).then(data => {
    let rows = data.rows;
    rows.forEach(row => {
        let player_ids:number[] = [];
        players.forEach(p => {
            if (p.team_id === row.id) {
                player_ids.push(p.id);
            }
        });
        const team:team = {
            id: row.id,
            name: row.name,
            city: row.city,
            abbreviation: row.abbreviation,
            conference: row.conference,
            division: row.division,
            slug: row.slug,
            player_ids: player_ids
        };
        teams.push(team);
    });
    return db_query('SELECT * FROM game', []);
}).then(data => {
    let rows = data.rows;
    rows.forEach(row => {
        const in_seasons:boolean = seasons.some(season => season === row.season);
        if (!in_seasons) {
            seasons.push(row.season);
        }
        let home_abb:string = '';
        let away_abb:string = '';
        teams.forEach(team => {
            if (team.id === row.home_id) {
                home_abb = team.abbreviation;
            } else if (team.id === row.away_id) {
                away_abb = team.abbreviation;
            }
        });
        const matchup:string = `${home_abb} vs. ${away_abb}`;
        const game:game = {
            id: row.id,
            season: row.season,
            date: row.date,
            home_id: row.home_id,
            away_id: row.away_id,
            home_score: row.home_score,
            away_score: row.away_score,
            matchup: matchup
        }
        schedule.push(game);
    });
    const timestamp:Date = new Date();
    const last_updated:string = timestamp.toLocaleString();
    // sort players by total fantasy pts
    players.sort((a, b) => b.stats.totals.fantasy_pts - a.stats.totals.fantasy_pts);
    // sort schedule by date
    schedule.sort((a, b) => (new Date(b.date) as any) - (new Date(a.date) as any));
    const data_obj:data_obj = {
        players: players,
        teams: teams,
        schedule: schedule,
        meta: {
            seasons: seasons,
            last_updated: last_updated,
            to_date: null
        }
    };
    write(data_obj, '../static-app/src/postgres_data.json');
    pool.end();
}).catch(err => {
    console.log(err);
});
