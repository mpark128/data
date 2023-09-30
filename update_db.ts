import {write} from './functions';
import {boxscore, Team, Player, Game, Gamelog} from './types';
import {pool} from './db';


const season:string = '2022-23';
let teams:Team[] = [];
let players:Player[] = [];
let games:Game[] = [];
let gamelogs:Gamelog[] = [];

const headerData = {
    'Connection': 'keep-alive',
    'Accept': 'application/json, text/plain, */*',
    'x-nba-stats-token': 'true',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'x-nba-stats-origin': 'stats',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Mode': 'cors',
    'Referer': 'https://stats.nba.com/',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
};
const pindex_url = new URL('https://stats.nba.com/stats/playerindex');
const pindex_params = new URLSearchParams({
    LeagueId: '00',
    Season: season
});
pindex_url.search = pindex_params.toString();
fetch(pindex_url, {headers: headerData})
.then(res => res.json())
.then(d => {
    write(d, `${season}playerindex.txt`);
    const headers = d.resultSets[0].headers;
    const rows = d.resultSets[0].rowSet;
    // divisions
    const atlantic:number[] = [1610612738, 1610612751, 1610612752, 1610612755, 1610612761];
    const central:number[] = [1610612741, 1610612739, 1610612765, 1610612754, 1610612749];
    const southeast:number[] = [1610612737, 1610612766, 1610612748, 1610612753, 1610612764];
    const northwest:number[] = [1610612743, 1610612750, 1610612760, 1610612757, 1610612762];
    const pacific:number[] = [1610612744, 1610612746, 1610612747, 1610612756, 1610612758];
    const southwest:number[] = [1610612742, 1610612745, 1610612763, 1610612740, 1610612759];
    rows.forEach(row => {
        let team:Team;
        const team_id:number = parseInt(row[headers.indexOf('TEAM_ID')]);
        let jsy_number:number|null;
        if (team_id === 0) {
            team = new Team(team_id, 'Free Agent', null, 'F/A', null, null, 'free-agent');
            jsy_number = null;
        } else {
            let conference:string = '';
            let division:string = '';
            if (atlantic.includes(team_id)) {
                division = 'Atlantic';
                conference = 'Eastern';
            } else if (central.includes(team_id)) {
                division = 'Central';
                conference = 'Eastern';
            } else if (southeast.includes(team_id)) {
                division = 'Southeast';
                conference = 'Eastern';
            } else if (northwest.includes(team_id)) {
                division = 'Northwest';
                conference = 'Western';
            } else if (pacific.includes(team_id)) {
                division = 'Pacific';
                conference = 'Western';
            } else if (southwest.includes(team_id)) {
                division = 'Southwest';
                conference = 'Western';
            }
            team = new Team(
                team_id, 
                row[headers.indexOf('TEAM_NAME')],
                row[headers.indexOf('TEAM_CITY')],
                row[headers.indexOf('TEAM_ABBREVIATION')],
                conference,
                division,
                row[headers.indexOf('TEAM_SLUG')]
            );
            jsy_number = row[headers.indexOf('JERSEY_NUMBER')];
        }
        const in_teams:boolean = teams.some(t => t.id === team_id);
        if (!in_teams) {
            teams.push(team);
            pool.query('SELECT * FROM team WHERE id=$1', [team.id], (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.rows[0]) {
                        pool.query(`UPDATE team SET name=$1, city=$2, abbreviation=$3, conference=$4, division=$5, slug=$6 WHERE id=$7`, [
                            team.name, 
                            team.city, 
                            team.abbreviation, 
                            team.conference, 
                            team.division, 
                            team.slug,
                            team.id
                        ], (err, res) => {
                            if (err) {
                                console.log(err);
                            } 
                        });
                    } else {
                        pool.query('INSERT INTO team(id, name, city, abbreviation, conference, division, slug) VALUES($1, $2, $3, $4, $5, $6, $7)', [
                            team.id, 
                            team.name, 
                            team.city, 
                            team.abbreviation, 
                            team.conference, 
                            team.division, 
                            team.slug
                        ], (err, res) => {
                            if (err) {
                                console.log(err);
                            } 
                        });
                    }
                }
            });
        }
        const pos:string = row[headers.indexOf('POSITION')];
        let positions:string[] = [];
        if (pos.includes('-')) {
            positions = pos.split('-');
        } else {
            positions.push(pos);
        }
        const height:string = row[headers.indexOf('HEIGHT')];
        const height_array:string[] = height.split('-');
        const height_inches:number = (parseInt(height_array[0]) * 12) + parseInt(height_array[1]);
        const player = new Player(
            parseInt(row[headers.indexOf('PERSON_ID')]),
            row[headers.indexOf('PLAYER_FIRST_NAME')],
            row[headers.indexOf('PLAYER_LAST_NAME')],
            team_id,
            jsy_number,
            positions,
            height_inches,
            parseInt(row[headers.indexOf('WEIGHT')]),
            row[headers.indexOf('COLLEGE')],
            row[headers.indexOf('COUNTRY')],
            row[headers.indexOf('DRAFT_YEAR')],
            row[headers.indexOf('DRAFT_ROUND')],
            row[headers.indexOf('DRAFT_NUMBER')],
            parseInt(row[headers.indexOf('FROM_YEAR')]),
            parseInt(row[headers.indexOf('TO_YEAR')]),
            row[headers.indexOf('PLAYER_SLUG')]
        );
        players.push(player);
        pool.query('SELECT * FROM player WHERE id=$1', [player.id], (err, res) => {
            if (err) {
                console.log(err);
            } else {
                if (res.rows[0]) {
                    pool.query(`UPDATE player SET first_name=$1, last_name=$2, team_id=$3, jsy_number=$4, height_inches=$5, weight_lbs=$6, last_attended=$7, draft_year=$8, draft_round=$9, draft_number=$10, from_year=$11, to_year=$12, country=$13, position=$14, slug=$15 WHERE id=${player.id}`, [
                        player.first_name, 
                        player.last_name, 
                        player.team_id, 
                        player.jsy_number, 
                        player.height_inches, 
                        player.weight_lbs, 
                        player.last_attended, 
                        player.draft_year, 
                        player.draft_round, 
                        player.draft_number, 
                        player.from_year,
                        player.to_year, 
                        player.country, 
                        player.position, 
                        player.slug
                    ], (err, res) => {
                        if (err) {
                            console.log(err); 
                        } 
                    });
                } else {
                    pool.query('INSERT INTO player(id, first_name, last_name, team_id, jsy_number, height_inches, weight_lbs, last_attended, draft_year, draft_round, draft_number, from_year, to_year, country, position, slug) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)', [
                        player.id, 
                        player.first_name, 
                        player.last_name, 
                        player.team_id, 
                        player.jsy_number, 
                        player.height_inches, 
                        player.weight_lbs, 
                        player.last_attended, 
                        player.draft_year, 
                        player.draft_round, 
                        player.draft_number, 
                        player.from_year,
                        player.to_year, 
                        player.country, 
                        player.position, 
                        player.slug
                    ], (err, res) => {
                        if (err) {
                            console.log(err);
                        } 
                    });
                }
            }
        });
    });
    // league schedule
    const schedule_url = new URL('https://stats.nba.com/stats/scheduleleaguev2');
    const schedule_params = new URLSearchParams({
        LeagueId: '00',
        Season: season
    });
    schedule_url.search = schedule_params.toString();
    fetch(schedule_url, {headers: headerData})
    .then(res => res.json())
    .then(d => {
        write(d, `${season}schedule.txt`);
        let team_ids:number[] = [];
        teams.forEach(team => {
            team_ids.push(team.id);
        });

        const rows = d.leagueSchedule.gameDates;
        rows.forEach(row => {
            const game_rows = row.games;
            game_rows.forEach(gr => {
                const date_string:string = gr.gameDateTimeUTC;
                const date:Date = new Date(date_string);
                if (gr.weekNumber > 0 && team_ids.includes(gr.homeTeam.teamId) && team_ids.includes(gr.awayTeam.teamId)) {
                    const game:Game = new Game(
                        parseInt(gr.gameId),
                        season,
                        date,
                        gr.homeTeam.teamId,
                        gr.awayTeam.teamId,
                        gr.homeTeam.score,
                        gr.awayTeam.score
                    );
                    games.push(game);
                    pool.query('SELECT * FROM game WHERE id=$1', [game.id], (err, res) => {
                        if (err) {
                            console.log(`get error: ${err}`);
                        } else {
                            if (res.rows[0]) {
                                pool.query(`UPDATE game SET season=$1, date=$2, home_id=$3, away_id=$4, home_score=$5, away_score=$6 WHERE id=$7`, [
                                    game.season, 
                                    game.date, 
                                    game.home_id, 
                                    game.away_id, 
                                    game.home_score, 
                                    game.away_score,
                                    game.id
                                ], (err, res) => {
                                    if (err) {
                                        console.log(`update error: ${err}`);
                                    } 
                                });
                            } else {
                                pool.query('INSERT INTO game(id, season, date, home_id, away_id, home_score, away_score) VALUES($1, $2, $3, $4, $5, $6, $7)', [
                                    game.id, 
                                    game.season, 
                                    game.date, 
                                    game.home_id, 
                                    game.away_id, 
                                    game.home_score, 
                                    game.away_score
                                ], (err, res) => {
                                    if (err) {
                                        console.log(`insert error: ${err}`);
                                    } 
                                });
                            }
                        }
                    });
                }
            });
        });
    });
    // season gamelogs
    const gamelog_url = new URL('https://stats.nba.com/stats/leaguegamelog');
    const gamelog_params = new URLSearchParams({
        Counter: '0',
        Direction: 'ASC',
        LeagueID: '00',
        PlayerOrTeam: 'P',
        Season: season,
        SeasonType: 'Regular Season',
        Sorter: 'DATE'
    });
    gamelog_url.search = gamelog_params.toString();
    fetch(gamelog_url, {headers: headerData})
    .then(res => res.json())
    .then(d => {
        write(d, `${season}gamelogs.txt`);
        const headers = d.resultSets[0].headers;
        const rows = d.resultSets[0].rowSet;

        type player_gp = {
            id:number,
            games_played:number
        };
        let players_gp:player_gp[] = [];
        rows.forEach(row => {
            const player_gp = players_gp.find(player => player.id === row[headers.indexOf('PLAYER_ID')]);
            if (player_gp) {
                player_gp.games_played += 1;
            } else {
                const p_obj:player_gp = {
                    id: row[headers.indexOf('PLAYER_ID')],
                    games_played: 1
                }
                players_gp.push(p_obj);
            }
            let fg_pct:number|null;
            let ft_pct:number|null;
            let fg3_pct:number|null;
            if (row[headers.indexOf('FGA')] > 0) {
                fg_pct = parseFloat(row[headers.indexOf('FGM')]) / parseFloat(row[headers.indexOf('FGA')]);
            } else {
                fg_pct = null;
            }
            if (row[headers.indexOf('FTA')] > 0) {
                ft_pct = parseFloat(row[headers.indexOf('FTM')]) / parseFloat(row[headers.indexOf('FTA')]);
            } else {
                ft_pct = null;
            }
            if (row[headers.indexOf('FG3A')] > 0) {
                fg3_pct = parseFloat(row[headers.indexOf('FG3M')]) / parseFloat(row[headers.indexOf('FG3A')]);
            } else {
                fg3_pct = null;
            }
            let games_played:number = 0;
            players_gp.forEach(player => {
                if (player.id === row[headers.indexOf('PLAYER_ID')]) {
                    games_played = player.games_played;
                }
            });
            const stats:boxscore = {
                games_played: games_played,
                minutes: parseInt(row[headers.indexOf('MIN')]),
                fgm: parseInt(row[headers.indexOf('FGM')]),
                fga: parseInt(row[headers.indexOf('FGA')]),
                fg_pct: fg_pct,
                ftm: parseInt(row[headers.indexOf('FTM')]),
                fta: parseInt(row[headers.indexOf('FTA')]),
                ft_pct: ft_pct,
                fg3m: parseInt(row[headers.indexOf('FG3M')]),
                fg3a: parseInt(row[headers.indexOf('FG3A')]),
                fg3_pct: fg3_pct,
                pts: parseInt(row[headers.indexOf('PTS')]),
                oreb: parseInt(row[headers.indexOf('OREB')]),
                dreb: parseInt(row[headers.indexOf('DREB')]),
                reb: parseInt(row[headers.indexOf('REB')]),
                ast: parseInt(row[headers.indexOf('AST')]),
                stl: parseInt(row[headers.indexOf('STL')]),
                blk: parseInt(row[headers.indexOf('BLK')]),
                tov: parseInt(row[headers.indexOf('TOV')]),
                pf: parseInt(row[headers.indexOf('PF')]),
                plus_minus: parseInt(row[headers.indexOf('PLUS_MINUS')]),
                fantasy_pts: parseFloat(row[headers.indexOf('FANTASY_PTS')])
            };
            const gamelog = new Gamelog(
                parseInt(row[headers.indexOf('GAME_ID')]),
                parseInt(row[headers.indexOf('PLAYER_ID')]),
                parseInt(row[headers.indexOf('TEAM_ID')]),
                stats
            ); 
            gamelogs.push(gamelog);
            pool.query(`SELECT * FROM gamelog WHERE game_id=$1 AND player_id=$2`, [
                gamelog.game_id,
                gamelog.player_id
            ], (err, res) => {
                if (err) {
                    console.log(err);
                } else {
                    if (res.rows[0]) {
                        pool.query('UPDATE gamelog SET team_id=$1, minutes=$2, fgm=$3, fga=$4, fg_pct=$5, ftm=$6, fta=$7, ft_pct=$8, fg3m=$9, fg3a=$10, fg3_pct=$11, pts=$12, oreb=$13, dreb=$14, reb=$15, ast=$16, stl=$17, blk=$18, tov=$19, pf=$20, plus_minus=$21, fantasy_pts=$22, games_played=$23 WHERE game_id=$24 AND player_id=$25', [
                            gamelog.team_id, 
                            gamelog.stats.minutes, 
                            gamelog.stats.fgm, 
                            gamelog.stats.fga, 
                            gamelog.stats.fg_pct, 
                            gamelog.stats.ftm, 
                            gamelog.stats.fta, 
                            gamelog.stats.ft_pct, 
                            gamelog.stats.fg3m, 
                            gamelog.stats.fg3a, 
                            gamelog.stats.fg3_pct, 
                            gamelog.stats.pts, 
                            gamelog.stats.oreb, 
                            gamelog.stats.dreb, 
                            gamelog.stats.reb, 
                            gamelog.stats.ast, 
                            gamelog.stats.stl, 
                            gamelog.stats.blk, 
                            gamelog.stats.tov, 
                            gamelog.stats.pf, 
                            gamelog.stats.plus_minus, 
                            gamelog.stats.fantasy_pts,
                            gamelog.stats.games_played,
                            gamelog.game_id,
                            gamelog.player_id
                        ], (err, res) => {
                            if (err) {
                                console.log(err);
                            } 
                        });
                    } else {
                        pool.query('INSERT INTO gamelog(game_id, player_id, team_id, games_played, minutes, fgm, fga, fg_pct, ftm, fta, ft_pct, fg3m, fg3a, fg3_pct, pts, oreb, dreb, reb, ast, stl, blk, tov, pf, plus_minus, fantasy_pts) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24)', [
                            gamelog.game_id,
                            gamelog.player_id,
                            gamelog.team_id, 
                            gamelog.stats.games_played,
                            gamelog.stats.minutes, 
                            gamelog.stats.fgm, 
                            gamelog.stats.fga, 
                            gamelog.stats.fg_pct, 
                            gamelog.stats.ftm, 
                            gamelog.stats.fta, 
                            gamelog.stats.ft_pct, 
                            gamelog.stats.fg3m, 
                            gamelog.stats.fg3a, 
                            gamelog.stats.fg3_pct, 
                            gamelog.stats.pts, 
                            gamelog.stats.oreb, 
                            gamelog.stats.dreb, 
                            gamelog.stats.reb, 
                            gamelog.stats.ast, 
                            gamelog.stats.stl, 
                            gamelog.stats.blk, 
                            gamelog.stats.tov, 
                            gamelog.stats.pf, 
                            gamelog.stats.plus_minus, 
                            gamelog.stats.fantasy_pts
                        ], (err, res) => {
                            if (err) {
                                console.log(err);
                            } 
                        });
                    }
                }
            });
        });
    });
});

    