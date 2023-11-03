"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
var types_1 = require("./types");
var functions_1 = require("./functions");
var db_query = function (query, values) {
    return new Promise(function (resolve, reject) {
        db_1.pool.query(query, values, function (err, res) {
            if (err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        });
    });
};
var players = [];
var teams = [];
var games = [];
var seasons = [];
db_query('SELECT * FROM player', []).then(function (data) {
    var rows = data.rows;
    var players_db = [];
    rows.forEach(function (row) {
        var pos_a = row.position;
        var pos_b = pos_a.replace('{', '');
        var pos_c = pos_b.replace('}', '');
        var positions = pos_c.split(',');
        var player = new types_1.Player(row.id, row.first_name, row.last_name, row.team_id, row.jsy_number, positions, row.height_inches, row.weight_lbs, row.last_attended, row.country, row.draft_year, row.draft_round, row.draft_number, row.from_year, row.to_year, row.slug, row.is_active);
        players_db.push(player);
    });
    // get gamelogs in descending order
    db_query('SELECT * FROM gamelog ORDER BY game_id DESC', []).then(function (data) {
        rows = data.rows;
        var gamelogs_db = [];
        rows.forEach(function (row) {
            var stats = {
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
            var gamelog = new types_1.Gamelog(row.game_id, row.player_id, row.team_id, stats);
            gamelogs_db.push(gamelog);
        });
        players_db.forEach(function (p) {
            var gamelogs = [];
            gamelogs_db.forEach(function (g) {
                if (p.id === g.player_id) {
                    var gamelog = {
                        game_id: g.game_id,
                        team_id: g.team_id,
                        games_played: g.stats.games_played,
                        minutes: g.stats.minutes,
                        fgm: g.stats.fgm,
                        fga: g.stats.fga,
                        fg_pct: g.stats.fg_pct,
                        ftm: g.stats.ftm,
                        fta: g.stats.fta,
                        ft_pct: g.stats.ft_pct,
                        fg3m: g.stats.fg3m,
                        fg3a: g.stats.fg3a,
                        fg3_pct: g.stats.fg3_pct,
                        pts: g.stats.pts,
                        oreb: g.stats.oreb,
                        dreb: g.stats.dreb,
                        reb: g.stats.reb,
                        ast: g.stats.ast,
                        stl: g.stats.stl,
                        blk: g.stats.blk,
                        tov: g.stats.tov,
                        pf: g.stats.pf,
                        plus_minus: g.stats.plus_minus,
                        fantasy_pts: g.stats.fantasy_pts
                    };
                    gamelogs.push(gamelog);
                }
            });
            var player = {
                id: p.id,
                first_name: p.first_name,
                last_name: p.last_name,
                slug: p.slug,
                team_id: p.team_id,
                jsy_number: p.jsy_number,
                position: p.position,
                height_inches: p.height_inches,
                weight_lbs: p.weight_lbs,
                last_attended: p.last_attended,
                country: p.country,
                draft_year: p.draft_year,
                draft_round: p.draft_round,
                draft_number: p.draft_number,
                from_year: p.from_year,
                to_year: p.to_year,
                is_active: p.is_active,
                gamelogs: gamelogs,
            };
            players.push(player);
        });
        db_query('SELECT * FROM team', []).then(function (data) {
            rows = data.rows;
            rows.forEach(function (row) {
                var player_ids = [];
                players.forEach(function (p) {
                    if (p.team_id === row.id) {
                        player_ids.push(p.id);
                    }
                });
                var team = {
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
            db_query('SELECT * FROM game', []).then(function (data) {
                rows = data.rows;
                rows.forEach(function (row) {
                    var in_seasons = seasons.some(function (season) { return season === row.season; });
                    if (!in_seasons) {
                        seasons.push(row.season);
                    }
                    var home_abb = '';
                    var away_abb = '';
                    teams.forEach(function (team) {
                        if (team.id === row.home_id) {
                            home_abb = team.abbreviation;
                        }
                        else if (team.id === row.away_id) {
                            away_abb = team.abbreviation;
                        }
                    });
                    var matchup = "".concat(home_abb, " vs. ").concat(away_abb);
                    var game = {
                        id: row.id,
                        season: row.season,
                        date: row.date,
                        home_id: row.home_id,
                        away_id: row.away_id,
                        home_score: row.home_score,
                        away_score: row.away_score,
                        matchup: matchup
                    };
                    games.push(game);
                });
                var timestamp = new Date();
                var last_updated = timestamp.toLocaleString();
                // sort schedule by date
                games.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
                players.sort(function (a, b) { return a.last_name.localeCompare(b.last_name); });
                seasons.sort(function (a, b) { return b.localeCompare(a); });
                var data_obj = {
                    players: players,
                    teams: teams,
                    games: games,
                    meta: {
                        seasons: seasons,
                        last_updated: last_updated,
                        to_date: null
                    }
                };
                (0, functions_1.write)(data_obj, '../static-app/src/postgres_data.json');
            });
        });
    });
});
