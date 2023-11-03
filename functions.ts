const fs = require('fs');
import {Player, Gamelog, player, boxscore, gamelog, stats} from './types';

export const write = (o:object, f:string):void => {
    const json:string = JSON.stringify(o, null, 2);
    fs.writeFile(f, json, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`${f} created!`);
    });
}

export const sum = (a:number[]):number => {
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        sum += a[i];
    }
    return sum;
}

export const mean = (a:number[]):number => {
    return sum(a) / a.length;
}

export const std = (a:number[], mean_a:number):number => {
    let x = 0;
    a.forEach(n => {
        x += ((n - mean_a) * (n - mean_a));
    })
    return Math.sqrt(x / a.length);
}

export const z_score = (n:number, mean:number, std:number):number => {
    return (n - mean) / std;
}

export const get_stats = (players:player[]):stats[] => {
    type tmp = {
        id:number,
        totals:boxscore,
        avgs:boxscore
    };
    type z_data = {
        avg:boxscore,
        std:boxscore
    };

    let stats:stats[] = [];
    let counting_stats:tmp[] = [];

    // league avgs (avgs/totals)
    let all_gp:number[] = [];
    let all_min:number[] = [];
    let all_fgm:number[] = [];
    let all_fga:number[] = [];
    let all_fgpct:number[] = [];
    let all_ftm:number[] = [];
    let all_fta:number[] = [];
    let all_ftpct:number[] = [];
    let all_fg3m:number[] = [];
    let all_fg3a:number[] = [];
    let all_fg3pct:number[] = [];
    let all_pts:number[] = [];
    let all_oreb:number[] = [];
    let all_dreb:number[] = [];
    let all_reb:number[] = [];
    let all_ast:number[] = [];
    let all_stl:number[] = [];
    let all_blk:number[] = [];
    let all_tov:number[] = [];
    let all_pf:number[] = [];
    let all_pm:number[] = [];
    let all_fpts:number[] = [];
    
    let all_gp_totals:number[] = [];
    let all_min_totals:number[] = [];
    let all_fgm_totals:number[] = [];
    let all_fga_totals:number[] = [];
    let all_fgpct_totals:number[] = [];
    let all_ftm_totals:number[] = [];
    let all_fta_totals:number[] = [];
    let all_ftpct_totals:number[] = [];
    let all_fg3m_totals:number[] = [];
    let all_fg3a_totals:number[] = [];
    let all_fg3pct_totals:number[] = [];
    let all_pts_totals:number[] = [];
    let all_oreb_totals:number[] = [];
    let all_dreb_totals:number[] = [];
    let all_reb_totals:number[] = [];
    let all_ast_totals:number[] = [];
    let all_stl_totals:number[] = [];
    let all_blk_totals:number[] = [];
    let all_tov_totals:number[] = [];
    let all_pf_totals:number[] = [];
    let all_pm_totals:number[] = [];
    let all_fpts_totals:number[] = [];

    players.forEach(p => {
        let games_played:number = 0;
        let min:number[] = [];
        let fgm:number[] = [];
        let fga:number[] = [];
        let ftm:number[] = [];
        let fta:number[] = [];
        let fg3m:number[] = [];
        let fg3a:number[] = [];
        let pts:number[] = [];
        let oreb:number[] = [];
        let dreb:number[] = [];
        let reb:number[] = [];
        let ast:number[] = [];
        let stl:number[] = [];
        let blk:number[] = [];
        let tov:number[] = [];
        let pf:number[] = [];
        let pm:number[] = [];
        let fpts:number[] = [];

        p.gamelogs.forEach(g => {
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
        let fg_pct:number|null = 0;
        let ft_pct:number|null = 0;
        let fg3_pct:number|null = 0;
        if (sum(fga) > 0) {
            fg_pct = sum(fgm) / sum(fga);
        } else {
            fg_pct = null;
        }
        if (sum(fta) > 0) {
            ft_pct = sum(ftm) / sum(fta);
        } else {
            ft_pct = null;
        }
        if (sum(fg3a) > 0) {
            fg3_pct = sum(fg3m) / sum(fg3a);
        } else {
            fg3_pct = null;
        }
        const totals:boxscore = {
            games_played: games_played,
            minutes: sum(min),
            fgm: sum(fgm),
            fga: sum(fga),
            fg_pct: fg_pct,
            ftm: sum(ftm),
            fta: sum(fta),
            ft_pct: ft_pct,
            fg3m: sum(fg3m),
            fg3a: sum(fg3a),
            fg3_pct: fg3_pct,
            pts: sum(pts),
            oreb: sum(oreb),
            dreb: sum(dreb),
            reb: sum(reb),
            ast: sum(ast),
            stl: sum(stl),
            blk: sum(blk),
            tov: sum(tov),
            pf: sum(pf),
            plus_minus: sum(pm),
            fantasy_pts: sum(fpts)
        };
        let avgs:boxscore;
        if (games_played > 0) {
            avgs = {
                games_played: games_played,
                minutes: mean(min),
                fgm: mean(fgm),
                fga: mean(fga),
                fg_pct: fg_pct,
                ftm: mean(ftm),
                fta: mean(fta),
                ft_pct: ft_pct,
                fg3m: mean(fg3m),
                fg3a: mean(fg3a),
                fg3_pct: fg3_pct,
                pts: mean(pts),
                oreb: mean(oreb),
                dreb: mean(dreb),
                reb: mean(reb),
                ast: mean(ast),
                stl: mean(stl),
                blk: mean(blk),
                tov: mean(tov),
                pf: mean(pf),
                plus_minus: mean(pm),
                fantasy_pts: mean(fpts)
            };
        } else {
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
        const tmp:tmp = {
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
    const league_avgs:boxscore = {
        games_played: mean(all_gp),
        minutes: mean(all_min),
        fgm: mean(all_fgm),
        fga: mean(all_fga),
        fg_pct: mean(all_fgpct),
        ftm: mean(all_ftm),
        fta: mean(all_fta),
        ft_pct: mean(all_ftpct),
        fg3m: mean(all_fg3m),
        fg3a: mean(all_fg3a),
        fg3_pct: mean(all_fg3pct),
        pts: mean(all_pts),
        oreb: mean(all_oreb),
        dreb: mean(all_dreb),
        reb: mean(all_reb),
        ast: mean(all_ast),
        stl: mean(all_stl),
        blk: mean(all_blk),
        tov: mean(all_tov),
        pf: mean(all_pf),
        plus_minus: mean(all_pm),
        fantasy_pts: mean(all_fpts)
    };
    const league_totals:boxscore = {
        games_played: mean(all_gp_totals),
        minutes: mean(all_min_totals),
        fgm: mean(all_fgm_totals),
        fga: mean(all_fga_totals),
        fg_pct: mean(all_fgpct_totals),
        ftm: mean(all_ftm_totals),
        fta: mean(all_fta_totals),
        ft_pct: mean(all_ftpct_totals),
        fg3m: mean(all_fg3m_totals),
        fg3a: mean(all_fg3a_totals),
        fg3_pct: mean(all_fg3pct_totals),
        pts: mean(all_pts_totals),
        oreb: mean(all_oreb_totals),
        dreb: mean(all_dreb_totals),
        reb: mean(all_reb_totals),
        ast: mean(all_ast_totals),
        stl: mean(all_stl_totals),
        blk: mean(all_blk_totals),
        tov: mean(all_tov_totals),
        pf: mean(all_pf_totals),
        plus_minus: mean(all_pm_totals),
        fantasy_pts: mean(all_fpts_totals)
    };
    const z_avgs:z_data = {
        avg: league_avgs,
        std: {
            games_played: std(all_gp, league_avgs.games_played),
            minutes: std(all_min, league_avgs.minutes),
            fgm: std(all_fgm, league_avgs.fgm),
            fga: std(all_fga, league_avgs.fga),
            fg_pct: std(all_fgpct, league_avgs.fg_pct as number),
            ftm: std(all_ftm, league_avgs.ftm),
            fta: std(all_fta, league_avgs.fta),
            ft_pct: std(all_ftpct, league_avgs.ft_pct as number),
            fg3m: std(all_fg3m, league_avgs.fg3m),
            fg3a: std(all_fg3a, league_avgs.fg3a),
            fg3_pct: std(all_fg3pct, league_avgs.fg3_pct as number),
            pts: std(all_pts, league_avgs.pts),
            oreb: std(all_oreb, league_avgs.oreb),
            dreb: std(all_dreb, league_avgs.dreb),
            reb: std(all_reb, league_avgs.reb),
            ast: std(all_ast, league_avgs.ast),
            stl: std(all_stl, league_avgs.stl),
            blk: std(all_blk, league_avgs.blk),
            tov: std(all_tov, league_avgs.tov),
            pf: std(all_pf, league_avgs.pf),
            plus_minus: std(all_pm, league_avgs.plus_minus),
            fantasy_pts: std(all_fpts, league_avgs.fantasy_pts)
        }
    };
    const z_totals:z_data = {
        avg: league_totals,
        std: {
            games_played: std(all_gp_totals, league_totals.games_played),
            minutes: std(all_min_totals, league_totals.minutes),
            fgm: std(all_fgm_totals, league_totals.fgm),
            fga: std(all_fga_totals, league_totals.fga),
            fg_pct: std(all_fgpct_totals, league_totals.fg_pct as number),
            ftm: std(all_ftm_totals, league_totals.ftm),
            fta: std(all_fta_totals, league_totals.fta),
            ft_pct: std(all_ftpct_totals, league_totals.ft_pct as number),
            fg3m: std(all_fg3m_totals, league_totals.fg3m),
            fg3a: std(all_fg3a_totals, league_totals.fg3a),
            fg3_pct: std(all_fg3pct_totals, league_totals.fg3_pct as number),
            pts: std(all_pts_totals, league_totals.pts),
            oreb: std(all_oreb_totals, league_totals.oreb),
            dreb: std(all_dreb_totals, league_totals.dreb),
            reb: std(all_reb_totals, league_totals.reb),
            ast: std(all_ast_totals, league_totals.ast),
            stl: std(all_stl_totals, league_totals.stl),
            blk: std(all_blk_totals, league_totals.blk),
            tov: std(all_tov_totals, league_totals.tov),
            pf: std(all_pf_totals, league_totals.pf),
            plus_minus: std(all_pm_totals, league_totals.plus_minus),
            fantasy_pts: std(all_fpts_totals, league_totals.fantasy_pts)
        }
    };

    players.forEach(p => {
        const counting_stat = counting_stats.find(player => player.id === p.id) as tmp;
        const s:{totals:boxscore, avgs:boxscore} = {
            totals: counting_stat.totals,
            avgs: counting_stat.avgs            
        };
        const z:{totals:boxscore, avgs:boxscore} = {
            totals: {
                games_played: z_score(s.totals.games_played, z_totals.avg.games_played, z_totals.std.games_played),
                minutes: z_score(s.totals.minutes, z_totals.avg.minutes, z_totals.std.minutes),
                fgm: z_score(s.totals.fgm, z_totals.avg.fgm, z_totals.std.fgm),
                fga: z_score(s.totals.fga, z_totals.avg.fga, z_totals.std.fga),
                fg_pct: s.totals.fg_pct ? (
                    z_score(s.totals.fg_pct, z_totals.avg.fg_pct as number, z_totals.std.fg_pct as number)
                ) : (
                    null
                ),
                ftm: z_score(s.totals.ftm, z_totals.avg.ftm, z_totals.std.ftm),
                fta: z_score(s.totals.fta, z_totals.avg.fta, z_totals.std.fta),
                ft_pct: s.totals.ft_pct ? (
                    z_score(s.totals.ft_pct, z_totals.avg.ft_pct as number, z_totals.std.ft_pct as number)
                ) : (
                    null
                ),
                fg3m: z_score(s.totals.fg3m, z_totals.avg.fg3m, z_totals.std.fg3m),
                fg3a: z_score(s.totals.fg3a, z_totals.avg.fg3a, z_totals.std.fg3a),
                fg3_pct: s.totals.fg3_pct ? (
                    z_score(s.totals.fg3_pct, z_totals.avg.fg3_pct as number, z_totals.std.fg3_pct as number)
                ) : (
                    null
                ),
                pts: z_score(s.totals.pts, z_totals.avg.pts, z_totals.std.pts),
                oreb: z_score(s.totals.oreb, z_totals.avg.oreb, z_totals.std.oreb), 
                dreb: z_score(s.totals.dreb, z_totals.avg.dreb, z_totals.std.dreb), 
                reb: z_score(s.totals.reb, z_totals.avg.reb, z_totals.std.reb),
                ast: z_score(s.totals.ast, z_totals.avg.ast, z_totals.std.ast),
                stl: z_score(s.totals.stl, z_totals.avg.stl, z_totals.std.stl),
                blk: z_score(s.totals.blk, z_totals.avg.blk, z_totals.std.blk),
                tov: z_score(s.totals.tov, z_totals.avg.tov, z_totals.std.tov),
                pf: z_score(s.totals.pf, z_totals.avg.pf, z_totals.std.pf),
                plus_minus: z_score(s.totals.plus_minus, z_totals.avg.plus_minus, z_totals.std.plus_minus),
                fantasy_pts: z_score(s.totals.fantasy_pts, z_totals.avg.fantasy_pts, z_totals.std.fantasy_pts)
            },
            avgs: {
                games_played: z_score(s.avgs.games_played, z_avgs.avg.games_played, z_avgs.std.games_played),
                minutes: z_score(s.avgs.minutes, z_avgs.avg.minutes, z_avgs.std.minutes),
                fgm: z_score(s.avgs.fgm, z_avgs.avg.fgm, z_avgs.std.fgm),
                fga: z_score(s.avgs.fga, z_avgs.avg.fga, z_avgs.std.fga),
                fg_pct: s.avgs.fg_pct ? (
                    z_score(s.avgs.fg_pct, z_avgs.avg.fg_pct as number, z_avgs.std.fg_pct as number)
                ) : (
                    null
                ),
                ftm: z_score(s.avgs.ftm, z_avgs.avg.ftm, z_avgs.std.ftm),
                fta: z_score(s.avgs.fta, z_avgs.avg.fta, z_avgs.std.fta),
                ft_pct: s.avgs.ft_pct ? (
                    z_score(s.avgs.ft_pct, z_avgs.avg.ft_pct as number, z_avgs.std.ft_pct as number)
                ) : (
                    null
                ),
                fg3m: z_score(s.avgs.fg3m, z_avgs.avg.fg3m, z_avgs.std.fg3m),
                fg3a: z_score(s.avgs.fg3a, z_avgs.avg.fg3a, z_avgs.std.fg3a),
                fg3_pct: s.avgs.fg3_pct ? (
                    z_score(s.avgs.fg3_pct, z_avgs.avg.fg3_pct as number, z_avgs.std.fg3_pct as number)
                ) : (
                    null
                ),
                pts: z_score(s.avgs.pts, z_avgs.avg.pts, z_avgs.std.pts),
                oreb: z_score(s.avgs.oreb, z_avgs.avg.oreb, z_avgs.std.oreb), 
                dreb: z_score(s.avgs.dreb, z_avgs.avg.dreb, z_avgs.std.dreb), 
                reb: z_score(s.avgs.reb, z_avgs.avg.reb, z_avgs.std.reb),
                ast: z_score(s.avgs.ast, z_avgs.avg.ast, z_avgs.std.ast),
                stl: z_score(s.avgs.stl, z_avgs.avg.stl, z_avgs.std.stl),
                blk: z_score(s.avgs.blk, z_avgs.avg.blk, z_avgs.std.blk),
                tov: z_score(s.avgs.tov, z_avgs.avg.tov, z_avgs.std.tov),
                pf: z_score(s.avgs.pf, z_avgs.avg.pf, z_avgs.std.pf),
                plus_minus: z_score(s.avgs.plus_minus, z_avgs.avg.plus_minus, z_avgs.std.plus_minus),
                fantasy_pts: z_score(s.avgs.fantasy_pts, z_avgs.avg.fantasy_pts, z_avgs.std.fantasy_pts)
            }
        };
        const player:stats = {
            id: p.id,
            counting_stats: s,
            z_score: z
        };
        stats.push(player);
    });
    return stats;
};