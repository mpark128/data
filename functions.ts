const fs = require('fs');
import {Player, Gamelog, player, boxscore, gamelog} from './types';

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

export const get_players = (players:Player[], gamelogs:Gamelog[]):player[] => {
    type z_data = {
        avg:boxscore,
        std:boxscore
    };
    type stats = {
        player_id:number,
        totals:boxscore,
        avgs:boxscore
    };
    type player_gamelog = {
        player_id:number,
        gamelogs:gamelog[]
    };

    let player_stats:stats[] = [];
    let player_gamelogs:player_gamelog[] = [];

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
        let gls:gamelog[] = [];

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

        gamelogs.forEach(g => {
            if (g.player_id === p.id) {
                const gamelog:gamelog = {
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

        const player_gamelog:player_gamelog = {
            player_id: p.id,
            gamelogs:gls
        };
        player_gamelogs.push(player_gamelog);

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
            }
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
            }
        }
        const stats:stats = {
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
    const league_avg = {
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
    const z_avgs:z_data = {
        avg: league_avg,
        std: {
            games_played: std(all_gp, league_avg.games_played),
            minutes: std(all_min, league_avg.minutes),
            fgm: std(all_fgm, league_avg.fgm),
            fga: std(all_fga, league_avg.fga),
            fg_pct: std(all_fgpct, league_avg.fg_pct),
            ftm: std(all_ftm, league_avg.ftm),
            fta: std(all_fta, league_avg.fta),
            ft_pct: std(all_ftpct, league_avg.ft_pct),
            fg3m: std(all_fg3m, league_avg.fg3m),
            fg3a: std(all_fg3a, league_avg.fg3a),
            fg3_pct: std(all_fg3pct, league_avg.fg3_pct),
            pts: std(all_pts, league_avg.pts),
            oreb: std(all_oreb, league_avg.oreb),
            dreb: std(all_dreb, league_avg.dreb),
            reb: std(all_reb, league_avg.reb),
            ast: std(all_ast, league_avg.ast),
            stl: std(all_stl, league_avg.stl),
            blk: std(all_blk, league_avg.blk),
            tov: std(all_tov, league_avg.tov),
            pf: std(all_pf, league_avg.pf),
            plus_minus: std(all_pm, league_avg.plus_minus),
            fantasy_pts: std(all_fpts, league_avg.fantasy_pts)
        }
    };
    
    const totals_avg = {
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
    const z_totals:z_data = {
        avg: totals_avg,
        std: {
            games_played: std(all_gp_totals, totals_avg.games_played),
            minutes: std(all_min_totals, totals_avg.minutes),
            fgm: std(all_fgm_totals, totals_avg.fgm),
            fga: std(all_fga_totals, totals_avg.fga),
            fg_pct: std(all_fgpct_totals, totals_avg.fg_pct),
            ftm: std(all_ftm_totals, totals_avg.ftm),
            fta: std(all_fta_totals, totals_avg.fta),
            ft_pct: std(all_ftpct_totals, totals_avg.ft_pct),
            fg3m: std(all_fg3m_totals, totals_avg.fg3m),
            fg3a: std(all_fg3a_totals, totals_avg.fg3a),
            fg3_pct: std(all_fg3pct_totals, totals_avg.fg3_pct),
            pts: std(all_pts_totals, totals_avg.pts),
            oreb: std(all_oreb_totals, totals_avg.oreb),
            dreb: std(all_dreb_totals, totals_avg.dreb),
            reb: std(all_reb_totals, totals_avg.reb),
            ast: std(all_ast_totals, totals_avg.ast),
            stl: std(all_stl_totals, totals_avg.stl),
            blk: std(all_blk_totals, totals_avg.blk),
            tov: std(all_tov_totals, totals_avg.tov),
            pf: std(all_pf_totals, totals_avg.pf),
            plus_minus: std(all_pm_totals, totals_avg.plus_minus),
            fantasy_pts: std(all_fpts_totals, totals_avg.fantasy_pts)
        }
    };

    let players_obj:player[] = [];
    players.forEach(p => {
        let stats:{totals:boxscore, avgs:boxscore} = {
            totals: {} as boxscore,
            avgs: {} as boxscore
        };
        let z:{totals:boxscore, avgs:boxscore} = {
            totals: {} as boxscore,
            avgs: {} as boxscore
        }
        let gamelogs:gamelog[] = [];
        player_stats.forEach(s => {
            if (s.player_id === p.id) {
                stats = {
                    totals: s.totals,
                    avgs: s.avgs
                }
            }
        });
        player_gamelogs.forEach(g => {
            if (g.player_id === p.id) {
                gamelogs = g.gamelogs;
            }
        });
        z = {
            totals: {
                games_played: z_score(stats.totals.games_played, z_totals.avg.games_played, z_totals.std.games_played),
                minutes: z_score(stats.totals.minutes, z_totals.avg.minutes, z_totals.std.minutes),
                fgm: z_score(stats.totals.fgm, z_totals.avg.fgm, z_totals.std.fgm),
                fga: z_score(stats.totals.fga, z_totals.avg.fga, z_totals.std.fga),
                fg_pct: z_score(stats.totals.fg_pct as number, z_totals.avg.fg_pct as number, z_totals.std.fg_pct as number),
                ftm: z_score(stats.totals.ftm, z_totals.avg.ftm, z_totals.std.ftm),
                fta: z_score(stats.totals.fta, z_totals.avg.fta, z_totals.std.fta),
                ft_pct: z_score(stats.totals.ft_pct as number, z_totals.avg.ft_pct as number, z_totals.std.ft_pct as number), 
                fg3m: z_score(stats.totals.fg3m, z_totals.avg.fg3m, z_totals.std.fg3m),
                fg3a: z_score(stats.totals.fg3a, z_totals.avg.fg3a, z_totals.std.fg3a),
                fg3_pct: z_score(stats.totals.fg3_pct as number, z_totals.avg.fg3_pct as number, z_totals.std.fg3_pct as number),
                pts: z_score(stats.totals.pts, z_totals.avg.pts, z_totals.std.pts),
                oreb: z_score(stats.totals.oreb, z_totals.avg.oreb, z_totals.std.oreb), 
                dreb: z_score(stats.totals.dreb, z_totals.avg.dreb, z_totals.std.dreb), 
                reb: z_score(stats.totals.reb, z_totals.avg.reb, z_totals.std.reb),
                ast: z_score(stats.totals.ast, z_totals.avg.ast, z_totals.std.ast),
                stl: z_score(stats.totals.stl, z_totals.avg.stl, z_totals.std.stl),
                blk: z_score(stats.totals.blk, z_totals.avg.blk, z_totals.std.blk),
                tov: z_score(stats.totals.tov, z_totals.avg.tov, z_totals.std.tov),
                pf: z_score(stats.totals.pf, z_totals.avg.pf, z_totals.std.pf),
                plus_minus: z_score(stats.totals.plus_minus, z_totals.avg.plus_minus, z_totals.std.plus_minus),
                fantasy_pts: z_score(stats.totals.fantasy_pts, z_totals.avg.fantasy_pts, z_totals.std.fantasy_pts)
            },
            avgs: {
                games_played: z_score(stats.avgs.games_played, z_avgs.avg.games_played, z_avgs.std.games_played),
                minutes: z_score(stats.avgs.minutes, z_avgs.avg.minutes, z_avgs.std.minutes),
                fgm: z_score(stats.avgs.fgm, z_avgs.avg.fgm, z_avgs.std.fgm),
                fga: z_score(stats.avgs.fga, z_avgs.avg.fga, z_avgs.std.fga),
                fg_pct: z_score(stats.avgs.fg_pct as number, z_avgs.avg.fg_pct as number, z_avgs.std.fg_pct as number),
                ftm: z_score(stats.avgs.ftm, z_avgs.avg.ftm, z_avgs.std.ftm),
                fta: z_score(stats.avgs.fta, z_avgs.avg.fta, z_avgs.std.fta),
                ft_pct: z_score(stats.avgs.ft_pct as number, z_avgs.avg.ft_pct as number, z_avgs.std.ft_pct as number), 
                fg3m: z_score(stats.avgs.fg3m, z_avgs.avg.fg3m, z_avgs.std.fg3m),
                fg3a: z_score(stats.avgs.fg3a, z_avgs.avg.fg3a, z_avgs.std.fg3a),
                fg3_pct: z_score(stats.avgs.fg3_pct as number, z_avgs.avg.fg3_pct as number, z_avgs.std.fg3_pct as number),
                pts: z_score(stats.avgs.pts, z_avgs.avg.pts, z_avgs.std.pts),
                oreb: z_score(stats.avgs.oreb, z_avgs.avg.oreb, z_avgs.std.oreb), 
                dreb: z_score(stats.avgs.dreb, z_avgs.avg.dreb, z_avgs.std.dreb), 
                reb: z_score(stats.avgs.reb, z_avgs.avg.reb, z_avgs.std.reb),
                ast: z_score(stats.avgs.ast, z_avgs.avg.ast, z_avgs.std.ast),
                stl: z_score(stats.avgs.stl, z_avgs.avg.stl, z_avgs.std.stl),
                blk: z_score(stats.avgs.blk, z_avgs.avg.blk, z_avgs.std.blk),
                tov: z_score(stats.avgs.tov, z_avgs.avg.tov, z_avgs.std.tov),
                pf: z_score(stats.avgs.pf, z_avgs.avg.pf, z_avgs.std.pf),
                plus_minus: z_score(stats.avgs.plus_minus, z_avgs.avg.plus_minus, z_avgs.std.plus_minus),
                fantasy_pts: z_score(stats.avgs.fantasy_pts, z_avgs.avg.fantasy_pts, z_avgs.std.fantasy_pts)
            }
        };
    
        const player:player = {
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
    players_obj.sort((a, b) => b.stats.totals.fantasy_pts - a.stats.totals.fantasy_pts);
    return players_obj;
};
