"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_players = exports.z_score = exports.std = exports.mean = exports.sum = exports.write = void 0;
var fs = require('fs');
var write = function (o, f) {
    var json = JSON.stringify(o, null, 2);
    fs.writeFile(f, json, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("".concat(f, " created!"));
    });
};
exports.write = write;
var sum = function (a) {
    var sum = 0;
    for (var i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
};
exports.sum = sum;
var mean = function (a) {
    return (0, exports.sum)(a) / a.length;
};
exports.mean = mean;
var std = function (a, mean_a) {
    var x = 0;
    a.forEach(function (n) {
        x += ((n - mean_a) * (n - mean_a));
    });
    return Math.sqrt(x / a.length);
};
exports.std = std;
var z_score = function (n, mean, std) {
    return (n - mean) / std;
};
exports.z_score = z_score;
var get_players = function (players, gamelogs) {
    var player_stats = [];
    var player_gamelogs = [];
    // league avgs (avgs/totals)
    var all_gp = [];
    var all_min = [];
    var all_fgm = [];
    var all_fga = [];
    var all_fgpct = [];
    var all_ftm = [];
    var all_fta = [];
    var all_ftpct = [];
    var all_fg3m = [];
    var all_fg3a = [];
    var all_fg3pct = [];
    var all_pts = [];
    var all_oreb = [];
    var all_dreb = [];
    var all_reb = [];
    var all_ast = [];
    var all_stl = [];
    var all_blk = [];
    var all_tov = [];
    var all_pf = [];
    var all_pm = [];
    var all_fpts = [];
    var all_gp_totals = [];
    var all_min_totals = [];
    var all_fgm_totals = [];
    var all_fga_totals = [];
    var all_fgpct_totals = [];
    var all_ftm_totals = [];
    var all_fta_totals = [];
    var all_ftpct_totals = [];
    var all_fg3m_totals = [];
    var all_fg3a_totals = [];
    var all_fg3pct_totals = [];
    var all_pts_totals = [];
    var all_oreb_totals = [];
    var all_dreb_totals = [];
    var all_reb_totals = [];
    var all_ast_totals = [];
    var all_stl_totals = [];
    var all_blk_totals = [];
    var all_tov_totals = [];
    var all_pf_totals = [];
    var all_pm_totals = [];
    var all_fpts_totals = [];
    players.forEach(function (p) {
        var gls = [];
        var games_played = 0;
        var min = [];
        var fgm = [];
        var fga = [];
        var ftm = [];
        var fta = [];
        var fg3m = [];
        var fg3a = [];
        var pts = [];
        var oreb = [];
        var dreb = [];
        var reb = [];
        var ast = [];
        var stl = [];
        var blk = [];
        var tov = [];
        var pf = [];
        var pm = [];
        var fpts = [];
        gamelogs.forEach(function (g) {
            if (g.player_id === p.id) {
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
                gls.push(gamelog);
                games_played += 1;
                all_min.push(g.stats.minutes);
                min.push(g.stats.minutes);
                all_fgm.push(g.stats.fgm);
                fgm.push(g.stats.fgm);
                all_fga.push(g.stats.fga);
                fga.push(g.stats.fga);
                if (g.stats.fg_pct !== null) {
                    all_fgpct.push(g.stats.fg_pct);
                }
                all_ftm.push(g.stats.ftm);
                ftm.push(g.stats.ftm);
                all_fta.push(g.stats.fta);
                fta.push(g.stats.fta);
                if (g.stats.ft_pct !== null) {
                    all_ftpct.push(g.stats.ft_pct);
                }
                all_fg3m.push(g.stats.fg3m);
                fg3m.push(g.stats.fg3m);
                all_fg3a.push(g.stats.fg3a);
                fg3a.push(g.stats.fg3a);
                if (g.stats.fg3_pct !== null) {
                    all_fg3pct.push(g.stats.fg3_pct);
                }
                all_pts.push(g.stats.pts);
                pts.push(g.stats.pts);
                all_oreb.push(g.stats.oreb);
                oreb.push(g.stats.oreb);
                all_dreb.push(g.stats.dreb);
                dreb.push(g.stats.dreb);
                all_reb.push(g.stats.reb);
                reb.push(g.stats.reb);
                all_ast.push(g.stats.ast);
                ast.push(g.stats.ast);
                all_stl.push(g.stats.stl);
                stl.push(g.stats.stl);
                all_blk.push(g.stats.blk);
                blk.push(g.stats.blk);
                all_tov.push(g.stats.tov);
                tov.push(g.stats.tov);
                all_pf.push(g.stats.pf);
                pf.push(g.stats.pf);
                all_pm.push(g.stats.plus_minus);
                pm.push(g.stats.plus_minus);
                all_fpts.push(g.stats.fantasy_pts);
                fpts.push(g.stats.fantasy_pts);
            }
        });
        all_gp.push(games_played);
        var player_gamelog = {
            player_id: p.id,
            gamelogs: gls
        };
        player_gamelogs.push(player_gamelog);
        // get player season totals/avgs
        var fg_pct = 0;
        var ft_pct = 0;
        var fg3_pct = 0;
        if ((0, exports.sum)(fga) > 0) {
            fg_pct = (0, exports.sum)(fgm) / (0, exports.sum)(fga);
        }
        else {
            fg_pct = null;
        }
        if ((0, exports.sum)(fta) > 0) {
            ft_pct = (0, exports.sum)(ftm) / (0, exports.sum)(fta);
        }
        else {
            ft_pct = null;
        }
        if ((0, exports.sum)(fg3a) > 0) {
            fg3_pct = (0, exports.sum)(fg3m) / (0, exports.sum)(fg3a);
        }
        else {
            fg3_pct = null;
        }
        var totals = {
            games_played: games_played,
            minutes: (0, exports.sum)(min),
            fgm: (0, exports.sum)(fgm),
            fga: (0, exports.sum)(fga),
            fg_pct: fg_pct,
            ftm: (0, exports.sum)(ftm),
            fta: (0, exports.sum)(fta),
            ft_pct: ft_pct,
            fg3m: (0, exports.sum)(fg3m),
            fg3a: (0, exports.sum)(fg3a),
            fg3_pct: fg3_pct,
            pts: (0, exports.sum)(pts),
            oreb: (0, exports.sum)(oreb),
            dreb: (0, exports.sum)(dreb),
            reb: (0, exports.sum)(reb),
            ast: (0, exports.sum)(ast),
            stl: (0, exports.sum)(stl),
            blk: (0, exports.sum)(blk),
            tov: (0, exports.sum)(tov),
            pf: (0, exports.sum)(pf),
            plus_minus: (0, exports.sum)(pm),
            fantasy_pts: (0, exports.sum)(fpts)
        };
        var avgs;
        if (games_played > 0) {
            avgs = {
                games_played: games_played,
                minutes: (0, exports.mean)(min),
                fgm: (0, exports.mean)(fgm),
                fga: (0, exports.mean)(fga),
                fg_pct: fg_pct,
                ftm: (0, exports.mean)(ftm),
                fta: (0, exports.mean)(fta),
                ft_pct: ft_pct,
                fg3m: (0, exports.mean)(fg3m),
                fg3a: (0, exports.mean)(fg3a),
                fg3_pct: fg3_pct,
                pts: (0, exports.mean)(pts),
                oreb: (0, exports.mean)(oreb),
                dreb: (0, exports.mean)(dreb),
                reb: (0, exports.mean)(reb),
                ast: (0, exports.mean)(ast),
                stl: (0, exports.mean)(stl),
                blk: (0, exports.mean)(blk),
                tov: (0, exports.mean)(tov),
                pf: (0, exports.mean)(pf),
                plus_minus: (0, exports.mean)(pm),
                fantasy_pts: (0, exports.mean)(fpts)
            };
        }
        else {
            avgs = {
                games_played: games_played,
                minutes: 0.0,
                fgm: 0.0,
                fga: 0.0,
                fg_pct: null,
                ftm: 0.0,
                fta: 0.0,
                ft_pct: null,
                fg3m: 0.0,
                fg3a: 0.0,
                fg3_pct: null,
                pts: 0.0,
                oreb: 0.0,
                dreb: 0.0,
                reb: 0.0,
                ast: 0.0,
                stl: 0.0,
                blk: 0.0,
                tov: 0.0,
                pf: 0.0,
                plus_minus: 0.0,
                fantasy_pts: 0.0
            };
        }
        var stats = {
            player_id: p.id,
            totals: totals,
            avgs: avgs
        };
        player_stats.push(stats);
        all_gp_totals.push(stats.totals.games_played);
        all_min_totals.push(stats.totals.minutes);
        all_fgm_totals.push(stats.totals.fgm);
        all_fga_totals.push(stats.totals.fga);
        if (stats.totals.fg_pct !== null) {
            all_fgpct_totals.push(stats.totals.fg_pct);
        }
        all_ftm_totals.push(stats.totals.ftm);
        all_fta_totals.push(stats.totals.fta);
        if (stats.totals.ft_pct !== null) {
            all_ftpct_totals.push(stats.totals.ft_pct);
        }
        all_fg3m_totals.push(stats.totals.fg3m);
        all_fg3a_totals.push(stats.totals.fg3a);
        if (stats.totals.fg3_pct !== null) {
            all_fg3pct_totals.push(stats.totals.fg3_pct);
        }
        all_pts_totals.push(stats.totals.pts);
        all_oreb_totals.push(stats.totals.oreb);
        all_dreb_totals.push(stats.totals.dreb);
        all_reb_totals.push(stats.totals.reb);
        all_ast_totals.push(stats.totals.ast);
        all_stl_totals.push(stats.totals.stl);
        all_blk_totals.push(stats.totals.blk);
        all_tov_totals.push(stats.totals.tov);
        all_pf_totals.push(stats.totals.pf);
        all_pm_totals.push(stats.totals.plus_minus);
        all_fpts_totals.push(stats.totals.fantasy_pts);
    });
    // get z_scores
    var league_avg = {
        games_played: (0, exports.mean)(all_gp),
        minutes: (0, exports.mean)(all_min),
        fgm: (0, exports.mean)(all_fgm),
        fga: (0, exports.mean)(all_fga),
        fg_pct: (0, exports.mean)(all_fgpct),
        ftm: (0, exports.mean)(all_ftm),
        fta: (0, exports.mean)(all_fta),
        ft_pct: (0, exports.mean)(all_ftpct),
        fg3m: (0, exports.mean)(all_fg3m),
        fg3a: (0, exports.mean)(all_fg3a),
        fg3_pct: (0, exports.mean)(all_fg3pct),
        pts: (0, exports.mean)(all_pts),
        oreb: (0, exports.mean)(all_oreb),
        dreb: (0, exports.mean)(all_dreb),
        reb: (0, exports.mean)(all_reb),
        ast: (0, exports.mean)(all_ast),
        stl: (0, exports.mean)(all_stl),
        blk: (0, exports.mean)(all_blk),
        tov: (0, exports.mean)(all_tov),
        pf: (0, exports.mean)(all_pf),
        plus_minus: (0, exports.mean)(all_pm),
        fantasy_pts: (0, exports.mean)(all_fpts)
    };
    var z_avgs = {
        avg: league_avg,
        std: {
            games_played: (0, exports.std)(all_gp, league_avg.games_played),
            minutes: (0, exports.std)(all_min, league_avg.minutes),
            fgm: (0, exports.std)(all_fgm, league_avg.fgm),
            fga: (0, exports.std)(all_fga, league_avg.fga),
            fg_pct: (0, exports.std)(all_fgpct, league_avg.fg_pct),
            ftm: (0, exports.std)(all_ftm, league_avg.ftm),
            fta: (0, exports.std)(all_fta, league_avg.fta),
            ft_pct: (0, exports.std)(all_ftpct, league_avg.ft_pct),
            fg3m: (0, exports.std)(all_fg3m, league_avg.fg3m),
            fg3a: (0, exports.std)(all_fg3a, league_avg.fg3a),
            fg3_pct: (0, exports.std)(all_fg3pct, league_avg.fg3_pct),
            pts: (0, exports.std)(all_pts, league_avg.pts),
            oreb: (0, exports.std)(all_oreb, league_avg.oreb),
            dreb: (0, exports.std)(all_dreb, league_avg.dreb),
            reb: (0, exports.std)(all_reb, league_avg.reb),
            ast: (0, exports.std)(all_ast, league_avg.ast),
            stl: (0, exports.std)(all_stl, league_avg.stl),
            blk: (0, exports.std)(all_blk, league_avg.blk),
            tov: (0, exports.std)(all_tov, league_avg.tov),
            pf: (0, exports.std)(all_pf, league_avg.pf),
            plus_minus: (0, exports.std)(all_pm, league_avg.plus_minus),
            fantasy_pts: (0, exports.std)(all_fpts, league_avg.fantasy_pts)
        }
    };
    var totals_avg = {
        games_played: (0, exports.mean)(all_gp_totals),
        minutes: (0, exports.mean)(all_min_totals),
        fgm: (0, exports.mean)(all_fgm_totals),
        fga: (0, exports.mean)(all_fga_totals),
        fg_pct: (0, exports.mean)(all_fgpct_totals),
        ftm: (0, exports.mean)(all_ftm_totals),
        fta: (0, exports.mean)(all_fta_totals),
        ft_pct: (0, exports.mean)(all_ftpct_totals),
        fg3m: (0, exports.mean)(all_fg3m_totals),
        fg3a: (0, exports.mean)(all_fg3a_totals),
        fg3_pct: (0, exports.mean)(all_fg3pct_totals),
        pts: (0, exports.mean)(all_pts_totals),
        oreb: (0, exports.mean)(all_oreb_totals),
        dreb: (0, exports.mean)(all_dreb_totals),
        reb: (0, exports.mean)(all_reb_totals),
        ast: (0, exports.mean)(all_ast_totals),
        stl: (0, exports.mean)(all_stl_totals),
        blk: (0, exports.mean)(all_blk_totals),
        tov: (0, exports.mean)(all_tov_totals),
        pf: (0, exports.mean)(all_pf_totals),
        plus_minus: (0, exports.mean)(all_pm_totals),
        fantasy_pts: (0, exports.mean)(all_fpts_totals)
    };
    var z_totals = {
        avg: totals_avg,
        std: {
            games_played: (0, exports.std)(all_gp_totals, totals_avg.games_played),
            minutes: (0, exports.std)(all_min_totals, totals_avg.minutes),
            fgm: (0, exports.std)(all_fgm_totals, totals_avg.fgm),
            fga: (0, exports.std)(all_fga_totals, totals_avg.fga),
            fg_pct: (0, exports.std)(all_fgpct_totals, totals_avg.fg_pct),
            ftm: (0, exports.std)(all_ftm_totals, totals_avg.ftm),
            fta: (0, exports.std)(all_fta_totals, totals_avg.fta),
            ft_pct: (0, exports.std)(all_ftpct_totals, totals_avg.ft_pct),
            fg3m: (0, exports.std)(all_fg3m_totals, totals_avg.fg3m),
            fg3a: (0, exports.std)(all_fg3a_totals, totals_avg.fg3a),
            fg3_pct: (0, exports.std)(all_fg3pct_totals, totals_avg.fg3_pct),
            pts: (0, exports.std)(all_pts_totals, totals_avg.pts),
            oreb: (0, exports.std)(all_oreb_totals, totals_avg.oreb),
            dreb: (0, exports.std)(all_dreb_totals, totals_avg.dreb),
            reb: (0, exports.std)(all_reb_totals, totals_avg.reb),
            ast: (0, exports.std)(all_ast_totals, totals_avg.ast),
            stl: (0, exports.std)(all_stl_totals, totals_avg.stl),
            blk: (0, exports.std)(all_blk_totals, totals_avg.blk),
            tov: (0, exports.std)(all_tov_totals, totals_avg.tov),
            pf: (0, exports.std)(all_pf_totals, totals_avg.pf),
            plus_minus: (0, exports.std)(all_pm_totals, totals_avg.plus_minus),
            fantasy_pts: (0, exports.std)(all_fpts_totals, totals_avg.fantasy_pts)
        }
    };
    var players_obj = [];
    players.forEach(function (p) {
        var stats = {
            totals: {},
            avgs: {}
        };
        var z = {
            totals: {},
            avgs: {}
        };
        var gamelogs = [];
        player_stats.forEach(function (s) {
            if (s.player_id === p.id) {
                stats = {
                    totals: s.totals,
                    avgs: s.avgs
                };
            }
        });
        player_gamelogs.forEach(function (g) {
            if (g.player_id === p.id) {
                gamelogs = g.gamelogs;
            }
        });
        z = {
            totals: {
                games_played: (0, exports.z_score)(stats.totals.games_played, z_totals.avg.games_played, z_totals.std.games_played),
                minutes: (0, exports.z_score)(stats.totals.minutes, z_totals.avg.minutes, z_totals.std.minutes),
                fgm: (0, exports.z_score)(stats.totals.fgm, z_totals.avg.fgm, z_totals.std.fgm),
                fga: (0, exports.z_score)(stats.totals.fga, z_totals.avg.fga, z_totals.std.fga),
                fg_pct: (0, exports.z_score)(stats.totals.fg_pct, z_totals.avg.fg_pct, z_totals.std.fg_pct),
                ftm: (0, exports.z_score)(stats.totals.ftm, z_totals.avg.ftm, z_totals.std.ftm),
                fta: (0, exports.z_score)(stats.totals.fta, z_totals.avg.fta, z_totals.std.fta),
                ft_pct: (0, exports.z_score)(stats.totals.ft_pct, z_totals.avg.ft_pct, z_totals.std.ft_pct),
                fg3m: (0, exports.z_score)(stats.totals.fg3m, z_totals.avg.fg3m, z_totals.std.fg3m),
                fg3a: (0, exports.z_score)(stats.totals.fg3a, z_totals.avg.fg3a, z_totals.std.fg3a),
                fg3_pct: (0, exports.z_score)(stats.totals.fg3_pct, z_totals.avg.fg3_pct, z_totals.std.fg3_pct),
                pts: (0, exports.z_score)(stats.totals.pts, z_totals.avg.pts, z_totals.std.pts),
                oreb: (0, exports.z_score)(stats.totals.oreb, z_totals.avg.oreb, z_totals.std.oreb),
                dreb: (0, exports.z_score)(stats.totals.dreb, z_totals.avg.dreb, z_totals.std.dreb),
                reb: (0, exports.z_score)(stats.totals.reb, z_totals.avg.reb, z_totals.std.reb),
                ast: (0, exports.z_score)(stats.totals.ast, z_totals.avg.ast, z_totals.std.ast),
                stl: (0, exports.z_score)(stats.totals.stl, z_totals.avg.stl, z_totals.std.stl),
                blk: (0, exports.z_score)(stats.totals.blk, z_totals.avg.blk, z_totals.std.blk),
                tov: (0, exports.z_score)(stats.totals.tov, z_totals.avg.tov, z_totals.std.tov),
                pf: (0, exports.z_score)(stats.totals.pf, z_totals.avg.pf, z_totals.std.pf),
                plus_minus: (0, exports.z_score)(stats.totals.plus_minus, z_totals.avg.plus_minus, z_totals.std.plus_minus),
                fantasy_pts: (0, exports.z_score)(stats.totals.fantasy_pts, z_totals.avg.fantasy_pts, z_totals.std.fantasy_pts)
            },
            avgs: {
                games_played: (0, exports.z_score)(stats.avgs.games_played, z_avgs.avg.games_played, z_avgs.std.games_played),
                minutes: (0, exports.z_score)(stats.avgs.minutes, z_avgs.avg.minutes, z_avgs.std.minutes),
                fgm: (0, exports.z_score)(stats.avgs.fgm, z_avgs.avg.fgm, z_avgs.std.fgm),
                fga: (0, exports.z_score)(stats.avgs.fga, z_avgs.avg.fga, z_avgs.std.fga),
                fg_pct: (0, exports.z_score)(stats.avgs.fg_pct, z_avgs.avg.fg_pct, z_avgs.std.fg_pct),
                ftm: (0, exports.z_score)(stats.avgs.ftm, z_avgs.avg.ftm, z_avgs.std.ftm),
                fta: (0, exports.z_score)(stats.avgs.fta, z_avgs.avg.fta, z_avgs.std.fta),
                ft_pct: (0, exports.z_score)(stats.avgs.ft_pct, z_avgs.avg.ft_pct, z_avgs.std.ft_pct),
                fg3m: (0, exports.z_score)(stats.avgs.fg3m, z_avgs.avg.fg3m, z_avgs.std.fg3m),
                fg3a: (0, exports.z_score)(stats.avgs.fg3a, z_avgs.avg.fg3a, z_avgs.std.fg3a),
                fg3_pct: (0, exports.z_score)(stats.avgs.fg3_pct, z_avgs.avg.fg3_pct, z_avgs.std.fg3_pct),
                pts: (0, exports.z_score)(stats.avgs.pts, z_avgs.avg.pts, z_avgs.std.pts),
                oreb: (0, exports.z_score)(stats.avgs.oreb, z_avgs.avg.oreb, z_avgs.std.oreb),
                dreb: (0, exports.z_score)(stats.avgs.dreb, z_avgs.avg.dreb, z_avgs.std.dreb),
                reb: (0, exports.z_score)(stats.avgs.reb, z_avgs.avg.reb, z_avgs.std.reb),
                ast: (0, exports.z_score)(stats.avgs.ast, z_avgs.avg.ast, z_avgs.std.ast),
                stl: (0, exports.z_score)(stats.avgs.stl, z_avgs.avg.stl, z_avgs.std.stl),
                blk: (0, exports.z_score)(stats.avgs.blk, z_avgs.avg.blk, z_avgs.std.blk),
                tov: (0, exports.z_score)(stats.avgs.tov, z_avgs.avg.tov, z_avgs.std.tov),
                pf: (0, exports.z_score)(stats.avgs.pf, z_avgs.avg.pf, z_avgs.std.pf),
                plus_minus: (0, exports.z_score)(stats.avgs.plus_minus, z_avgs.avg.plus_minus, z_avgs.std.plus_minus),
                fantasy_pts: (0, exports.z_score)(stats.avgs.fantasy_pts, z_avgs.avg.fantasy_pts, z_avgs.std.fantasy_pts)
            }
        };
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
            stats: stats,
            z_score: z,
            gamelogs: gamelogs,
        };
        players_obj.push(player);
    });
    // sort players by total fantasy pts
    players_obj.sort(function (a, b) { return b.stats.totals.fantasy_pts - a.stats.totals.fantasy_pts; });
    return players_obj;
};
exports.get_players = get_players;
