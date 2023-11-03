"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_stats = exports.z_score = exports.std = exports.mean = exports.sum = exports.write = void 0;
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
var get_stats = function (players) {
    var stats = [];
    var counting_stats = [];
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
        p.gamelogs.forEach(function (g) {
            games_played += 1;
            all_min.push(g.minutes);
            min.push(g.minutes);
            all_fgm.push(g.fgm);
            fgm.push(g.fgm);
            all_fga.push(g.fga);
            fga.push(g.fga);
            if (g.fg_pct !== null) {
                all_fgpct.push(g.fg_pct);
            }
            all_ftm.push(g.ftm);
            ftm.push(g.ftm);
            all_fta.push(g.fta);
            fta.push(g.fta);
            if (g.ft_pct !== null) {
                all_ftpct.push(g.ft_pct);
            }
            all_fg3m.push(g.fg3m);
            fg3m.push(g.fg3m);
            all_fg3a.push(g.fg3a);
            fg3a.push(g.fg3a);
            if (g.fg3_pct !== null) {
                all_fg3pct.push(g.fg3_pct);
            }
            all_pts.push(g.pts);
            pts.push(g.pts);
            all_oreb.push(g.oreb);
            oreb.push(g.oreb);
            all_dreb.push(g.dreb);
            dreb.push(g.dreb);
            all_reb.push(g.reb);
            reb.push(g.reb);
            all_ast.push(g.ast);
            ast.push(g.ast);
            all_stl.push(g.stl);
            stl.push(g.stl);
            all_blk.push(g.blk);
            blk.push(g.blk);
            all_tov.push(g.tov);
            tov.push(g.tov);
            all_pf.push(g.pf);
            pf.push(g.pf);
            all_pm.push(g.plus_minus);
            pm.push(g.plus_minus);
            all_fpts.push(g.fantasy_pts);
            fpts.push(g.fantasy_pts);
        });
        all_gp.push(games_played);
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
        var tmp = {
            id: p.id,
            totals: totals,
            avgs: avgs
        };
        counting_stats.push(tmp);
        all_gp_totals.push(totals.games_played);
        all_min_totals.push(totals.minutes);
        all_fgm_totals.push(totals.fgm);
        all_fga_totals.push(totals.fga);
        if (totals.fg_pct !== null) {
            all_fgpct_totals.push(totals.fg_pct);
        }
        all_ftm_totals.push(totals.ftm);
        all_fta_totals.push(totals.fta);
        if (totals.ft_pct !== null) {
            all_ftpct_totals.push(totals.ft_pct);
        }
        all_fg3m_totals.push(totals.fg3m);
        all_fg3a_totals.push(totals.fg3a);
        if (totals.fg3_pct !== null) {
            all_fg3pct_totals.push(totals.fg3_pct);
        }
        all_pts_totals.push(totals.pts);
        all_oreb_totals.push(totals.oreb);
        all_dreb_totals.push(totals.dreb);
        all_reb_totals.push(totals.reb);
        all_ast_totals.push(totals.ast);
        all_stl_totals.push(totals.stl);
        all_blk_totals.push(totals.blk);
        all_tov_totals.push(totals.tov);
        all_pf_totals.push(totals.pf);
        all_pm_totals.push(totals.plus_minus);
        all_fpts_totals.push(totals.fantasy_pts);
    });
    //get z_scores
    var league_avgs = {
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
    var league_totals = {
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
    var z_avgs = {
        avg: league_avgs,
        std: {
            games_played: (0, exports.std)(all_gp, league_avgs.games_played),
            minutes: (0, exports.std)(all_min, league_avgs.minutes),
            fgm: (0, exports.std)(all_fgm, league_avgs.fgm),
            fga: (0, exports.std)(all_fga, league_avgs.fga),
            fg_pct: (0, exports.std)(all_fgpct, league_avgs.fg_pct),
            ftm: (0, exports.std)(all_ftm, league_avgs.ftm),
            fta: (0, exports.std)(all_fta, league_avgs.fta),
            ft_pct: (0, exports.std)(all_ftpct, league_avgs.ft_pct),
            fg3m: (0, exports.std)(all_fg3m, league_avgs.fg3m),
            fg3a: (0, exports.std)(all_fg3a, league_avgs.fg3a),
            fg3_pct: (0, exports.std)(all_fg3pct, league_avgs.fg3_pct),
            pts: (0, exports.std)(all_pts, league_avgs.pts),
            oreb: (0, exports.std)(all_oreb, league_avgs.oreb),
            dreb: (0, exports.std)(all_dreb, league_avgs.dreb),
            reb: (0, exports.std)(all_reb, league_avgs.reb),
            ast: (0, exports.std)(all_ast, league_avgs.ast),
            stl: (0, exports.std)(all_stl, league_avgs.stl),
            blk: (0, exports.std)(all_blk, league_avgs.blk),
            tov: (0, exports.std)(all_tov, league_avgs.tov),
            pf: (0, exports.std)(all_pf, league_avgs.pf),
            plus_minus: (0, exports.std)(all_pm, league_avgs.plus_minus),
            fantasy_pts: (0, exports.std)(all_fpts, league_avgs.fantasy_pts)
        }
    };
    var z_totals = {
        avg: league_totals,
        std: {
            games_played: (0, exports.std)(all_gp_totals, league_totals.games_played),
            minutes: (0, exports.std)(all_min_totals, league_totals.minutes),
            fgm: (0, exports.std)(all_fgm_totals, league_totals.fgm),
            fga: (0, exports.std)(all_fga_totals, league_totals.fga),
            fg_pct: (0, exports.std)(all_fgpct_totals, league_totals.fg_pct),
            ftm: (0, exports.std)(all_ftm_totals, league_totals.ftm),
            fta: (0, exports.std)(all_fta_totals, league_totals.fta),
            ft_pct: (0, exports.std)(all_ftpct_totals, league_totals.ft_pct),
            fg3m: (0, exports.std)(all_fg3m_totals, league_totals.fg3m),
            fg3a: (0, exports.std)(all_fg3a_totals, league_totals.fg3a),
            fg3_pct: (0, exports.std)(all_fg3pct_totals, league_totals.fg3_pct),
            pts: (0, exports.std)(all_pts_totals, league_totals.pts),
            oreb: (0, exports.std)(all_oreb_totals, league_totals.oreb),
            dreb: (0, exports.std)(all_dreb_totals, league_totals.dreb),
            reb: (0, exports.std)(all_reb_totals, league_totals.reb),
            ast: (0, exports.std)(all_ast_totals, league_totals.ast),
            stl: (0, exports.std)(all_stl_totals, league_totals.stl),
            blk: (0, exports.std)(all_blk_totals, league_totals.blk),
            tov: (0, exports.std)(all_tov_totals, league_totals.tov),
            pf: (0, exports.std)(all_pf_totals, league_totals.pf),
            plus_minus: (0, exports.std)(all_pm_totals, league_totals.plus_minus),
            fantasy_pts: (0, exports.std)(all_fpts_totals, league_totals.fantasy_pts)
        }
    };
    players.forEach(function (p) {
        var counting_stat = counting_stats.find(function (player) { return player.id === p.id; });
        var s = {
            totals: counting_stat.totals,
            avgs: counting_stat.avgs
        };
        var z = {
            totals: {
                games_played: (0, exports.z_score)(s.totals.games_played, z_totals.avg.games_played, z_totals.std.games_played),
                minutes: (0, exports.z_score)(s.totals.minutes, z_totals.avg.minutes, z_totals.std.minutes),
                fgm: (0, exports.z_score)(s.totals.fgm, z_totals.avg.fgm, z_totals.std.fgm),
                fga: (0, exports.z_score)(s.totals.fga, z_totals.avg.fga, z_totals.std.fga),
                fg_pct: s.totals.fg_pct ? ((0, exports.z_score)(s.totals.fg_pct, z_totals.avg.fg_pct, z_totals.std.fg_pct)) : (null),
                ftm: (0, exports.z_score)(s.totals.ftm, z_totals.avg.ftm, z_totals.std.ftm),
                fta: (0, exports.z_score)(s.totals.fta, z_totals.avg.fta, z_totals.std.fta),
                ft_pct: s.totals.ft_pct ? ((0, exports.z_score)(s.totals.ft_pct, z_totals.avg.ft_pct, z_totals.std.ft_pct)) : (null),
                fg3m: (0, exports.z_score)(s.totals.fg3m, z_totals.avg.fg3m, z_totals.std.fg3m),
                fg3a: (0, exports.z_score)(s.totals.fg3a, z_totals.avg.fg3a, z_totals.std.fg3a),
                fg3_pct: s.totals.fg3_pct ? ((0, exports.z_score)(s.totals.fg3_pct, z_totals.avg.fg3_pct, z_totals.std.fg3_pct)) : (null),
                pts: (0, exports.z_score)(s.totals.pts, z_totals.avg.pts, z_totals.std.pts),
                oreb: (0, exports.z_score)(s.totals.oreb, z_totals.avg.oreb, z_totals.std.oreb),
                dreb: (0, exports.z_score)(s.totals.dreb, z_totals.avg.dreb, z_totals.std.dreb),
                reb: (0, exports.z_score)(s.totals.reb, z_totals.avg.reb, z_totals.std.reb),
                ast: (0, exports.z_score)(s.totals.ast, z_totals.avg.ast, z_totals.std.ast),
                stl: (0, exports.z_score)(s.totals.stl, z_totals.avg.stl, z_totals.std.stl),
                blk: (0, exports.z_score)(s.totals.blk, z_totals.avg.blk, z_totals.std.blk),
                tov: (0, exports.z_score)(s.totals.tov, z_totals.avg.tov, z_totals.std.tov),
                pf: (0, exports.z_score)(s.totals.pf, z_totals.avg.pf, z_totals.std.pf),
                plus_minus: (0, exports.z_score)(s.totals.plus_minus, z_totals.avg.plus_minus, z_totals.std.plus_minus),
                fantasy_pts: (0, exports.z_score)(s.totals.fantasy_pts, z_totals.avg.fantasy_pts, z_totals.std.fantasy_pts)
            },
            avgs: {
                games_played: (0, exports.z_score)(s.avgs.games_played, z_avgs.avg.games_played, z_avgs.std.games_played),
                minutes: (0, exports.z_score)(s.avgs.minutes, z_avgs.avg.minutes, z_avgs.std.minutes),
                fgm: (0, exports.z_score)(s.avgs.fgm, z_avgs.avg.fgm, z_avgs.std.fgm),
                fga: (0, exports.z_score)(s.avgs.fga, z_avgs.avg.fga, z_avgs.std.fga),
                fg_pct: s.avgs.fg_pct ? ((0, exports.z_score)(s.avgs.fg_pct, z_avgs.avg.fg_pct, z_avgs.std.fg_pct)) : (null),
                ftm: (0, exports.z_score)(s.avgs.ftm, z_avgs.avg.ftm, z_avgs.std.ftm),
                fta: (0, exports.z_score)(s.avgs.fta, z_avgs.avg.fta, z_avgs.std.fta),
                ft_pct: s.avgs.ft_pct ? ((0, exports.z_score)(s.avgs.ft_pct, z_avgs.avg.ft_pct, z_avgs.std.ft_pct)) : (null),
                fg3m: (0, exports.z_score)(s.avgs.fg3m, z_avgs.avg.fg3m, z_avgs.std.fg3m),
                fg3a: (0, exports.z_score)(s.avgs.fg3a, z_avgs.avg.fg3a, z_avgs.std.fg3a),
                fg3_pct: s.avgs.fg3_pct ? ((0, exports.z_score)(s.avgs.fg3_pct, z_avgs.avg.fg3_pct, z_avgs.std.fg3_pct)) : (null),
                pts: (0, exports.z_score)(s.avgs.pts, z_avgs.avg.pts, z_avgs.std.pts),
                oreb: (0, exports.z_score)(s.avgs.oreb, z_avgs.avg.oreb, z_avgs.std.oreb),
                dreb: (0, exports.z_score)(s.avgs.dreb, z_avgs.avg.dreb, z_avgs.std.dreb),
                reb: (0, exports.z_score)(s.avgs.reb, z_avgs.avg.reb, z_avgs.std.reb),
                ast: (0, exports.z_score)(s.avgs.ast, z_avgs.avg.ast, z_avgs.std.ast),
                stl: (0, exports.z_score)(s.avgs.stl, z_avgs.avg.stl, z_avgs.std.stl),
                blk: (0, exports.z_score)(s.avgs.blk, z_avgs.avg.blk, z_avgs.std.blk),
                tov: (0, exports.z_score)(s.avgs.tov, z_avgs.avg.tov, z_avgs.std.tov),
                pf: (0, exports.z_score)(s.avgs.pf, z_avgs.avg.pf, z_avgs.std.pf),
                plus_minus: (0, exports.z_score)(s.avgs.plus_minus, z_avgs.avg.plus_minus, z_avgs.std.plus_minus),
                fantasy_pts: (0, exports.z_score)(s.avgs.fantasy_pts, z_avgs.avg.fantasy_pts, z_avgs.std.fantasy_pts)
            }
        };
        var player = {
            id: p.id,
            counting_stats: s,
            z_score: z
        };
        stats.push(player);
    });
    return stats;
};
exports.get_stats = get_stats;
