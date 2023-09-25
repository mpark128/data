import { boxscore, playerInfo, playerObj, gamelogType, teamType, playerType } from './types';
import {read, sum, mean, std, z_score} from './functions';
const fs = require('fs');

const time1 = new Date();

const season:string = '2022-23';

// headers for nba api
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

// get active players roster
let url = new URL('https://stats.nba.com/stats/playerindex');
let params = new URLSearchParams({
    LeagueId: '00',
    Season: season
});
url.search = params.toString();
fetch(url, {headers: headerData})
.then(res => res.json())
.then(data => {
    read(data, 'playerindex.txt');
    let players:playerType[] = [];
    let teams:teamType[] = [];

    let headers = data.resultSets[0].headers;
    let rows = data.resultSets[0].rowSet;
    rows.forEach((row:[]) => {
        let name:string = `${row[headers.indexOf('PLAYER_FIRST_NAME')]} ${row[headers.indexOf('PLAYER_LAST_NAME')]}`;
        
        let team:teamType; 
        let jsyNumber:number|null;
        // if player is a free agent...
        if (row[headers.indexOf('TEAM_ID')] === 0) {
            team = {
                id: 0,
                name: '',
                city: '',
                abbreviation: 'n/a',
                slug: 'free-agent'
            };
            jsyNumber = null;
        // else if he has a team
        } else {
            team = {
                id: parseInt(row[headers.indexOf('TEAM_ID')]),
                name: row[headers.indexOf('TEAM_NAME')],
                city: row[headers.indexOf('TEAM_CITY')],
                abbreviation: row[headers.indexOf('TEAM_ABBREVIATION')],
                slug: row[headers.indexOf('TEAM_SLUG')]
            },
            jsyNumber = parseInt(row[headers.indexOf('JERSEY_NUMBER')]);
        }
        // populate array of teams
        const in_teams = teams.some(t => t.id === team.id);
        if (!in_teams) {
            teams.push(team);
        }

        // get positions
        let pos:string = row[headers.indexOf('POSITION')];
        let positions:string[] = [];
        if (pos.includes('-')) {
            positions = pos.split('-');
        } else {
            positions.push(pos);
        }

        let heightString:string = row[headers.indexOf('HEIGHT')];
        let heightArray:string[] = heightString.split('-');
        const height:number = (parseInt(heightArray[0]) * 12) + parseInt(heightArray[1]);

        const player = {
            id: parseInt(row[headers.indexOf('PERSON_ID')]), 
            name: name,
            slug: row[headers.indexOf('PLAYER_SLUG')],
            team: team,
            jsyNumber: jsyNumber,
            position: positions,
            heightInches: height,
            weightLbs: parseInt(row[headers.indexOf('WEIGHT')]),
            lastPlayed: row[headers.indexOf('COLLEGE')],
            country: row[headers.indexOf('COUNTRY')],
            draftYear: row[headers.indexOf('DRAFT_YEAR')],
            draftRound: row[headers.indexOf('DRAFT_ROUND')],
            draftNumber: row[headers.indexOf('DRAFT_NUMBER')],
            fromYear: parseInt(row[headers.indexOf('FROM_YEAR')]),
            toYear: parseInt(row[headers.indexOf('TO_YEAR')])
        }; 
        players.push(player);
    });
    // console.log(players);
    // console.log(teams);

    // get gamelogs
    url = new URL('https://stats.nba.com/stats/leaguegamelog');
    params = new URLSearchParams({
        Counter: '0',
        Direction: 'ASC',
        LeagueID: '00',
        PlayerOrTeam: 'P',
        Season: season,
        SeasonType: 'Regular Season',
        Sorter: 'DATE'
    });
    url.search = params.toString();
    fetch(url, {headers: headerData})
    .then(res => res.json())
    .then(data => {
        read(data, 'leaguegamelog.txt');
        headers = data.resultSets[0].headers;
        rows = data.resultSets[0].rowSet;

        // array of all individual games stats
        let allGP:number[] = [];
        let allMin:number[] = [];
        let allFgm:number[] = [];
        let allFga:number[] = [];
        let allFgpct:number[] = [];
        let allFtm:number[] = [];
        let allFta:number[] = [];
        let allFtpct:number[] = [];
        let allFg3m:number[] = [];
        let allFg3a:number[] = [];
        let allFg3pct:number[] = [];
        let allPts:number[] = [];
        let allOreb:number[] = [];
        let allDreb:number[] = [];
        let allReb:number[] = [];
        let allAst:number[] = [];
        let allStl:number[] = [];
        let allBlk:number[] = [];
        let allTov:number[] = [];
        let allPf:number[] = [];
        let allP_m:number[] = [];
        let allFpts:number[] = [];

        // array of all totals
        let allMinTotals:number[] = [];
        let allFgmTotals:number[] = [];
        let allFgaTotals:number[] = [];
        let allFgpctTotals:number[] = [];
        let allFtmTotals:number[] = [];
        let allFtaTotals:number[] = [];
        let allFtpctTotals:number[] = [];
        let allFg3mTotals:number[] = [];
        let allFg3aTotals:number[] = [];
        let allFg3pctTotals:number[] = [];
        let allPtsTotals:number[] = [];
        let allOrebTotals:number[] = [];
        let allDrebTotals:number[] = [];
        let allRebTotals:number[] = [];
        let allAstTotals:number[] = [];
        let allStlTotals:number[] = [];
        let allBlkTotals:number[] = [];
        let allTovTotals:number[] = [];
        let allPfTotals:number[] = [];
        let allP_mTotals:number[] = [];
        let allFptsTotals:number[] = [];

        let p:playerInfo[] = [];
        players.forEach(player => {
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
            let p_m:number[] = [];
            let fpts:number[] = [];
            
            let gamelogs:gamelogType[] = []
            rows.forEach((row:[]) => {
                if (player.id === row[headers.indexOf('PLAYER_ID')]) {
                    allMin.push(row[headers.indexOf('MIN')]);
                    allFgm.push(row[headers.indexOf('FGM')]);
                    allFga.push(row[headers.indexOf('FGA')]);
                    if (row[headers.indexOf('FG_PCT')]) {
                        allFgpct.push(row[headers.indexOf('FG_PCT')]);
                    }
                    allFtm.push(row[headers.indexOf('FTM')]);
                    allFta.push(row[headers.indexOf('FTA')]);
                    if (row[headers.indexOf('FT_PCT')]) {
                        allFtpct.push(row[headers.indexOf('FT_PCT')]);
                    }
                    allFg3m.push(row[headers.indexOf('FG3M')]);
                    allFg3a.push(row[headers.indexOf('FG3A')]);
                    if (row[headers.indexOf('FG3_PCT')]) {
                        allFg3pct.push(row[headers.indexOf('FG3_PCT')]);
                    }
                    allPts.push(row[headers.indexOf('PTS')]);
                    allOreb.push(row[headers.indexOf('OREB')]);
                    allDreb.push(row[headers.indexOf('DREB')]);
                    allReb.push(row[headers.indexOf('REB')]);
                    allAst.push(row[headers.indexOf('AST')]);
                    allStl.push(row[headers.indexOf('STL')]);
                    allBlk.push(row[headers.indexOf('BLK')]);
                    allTov.push(row[headers.indexOf('TOV')]);
                    allPf.push(row[headers.indexOf('PF')]);
                    allP_m.push(row[headers.indexOf('PLUS_MINUS')]);
                    allFpts.push(row[headers.indexOf('FANTASY_PTS')]);

                    games_played += 1;
                    min.push(row[headers.indexOf('MIN')]);
                    fgm.push(row[headers.indexOf('FGM')]);
                    fga.push(row[headers.indexOf('FGA')]);
                    ftm.push(row[headers.indexOf('FTM')]);
                    fta.push(row[headers.indexOf('FTA')]);
                    fg3m.push(row[headers.indexOf('FG3M')]);
                    fg3a.push(row[headers.indexOf('FG3A')]);
                    pts.push(row[headers.indexOf('PTS')]);
                    oreb.push(row[headers.indexOf('OREB')]);
                    dreb.push(row[headers.indexOf('DREB')]);
                    reb.push(row[headers.indexOf('REB')]);
                    ast.push(row[headers.indexOf('AST')]);
                    stl.push(row[headers.indexOf('STL')]);
                    blk.push(row[headers.indexOf('BLK')]);
                    tov.push(row[headers.indexOf('TOV')]);
                    pf.push(row[headers.indexOf('PF')]);
                    p_m.push(row[headers.indexOf('PLUS_MINUS')]);
                    fpts.push(row[headers.indexOf('FANTASY_PTS')]);

                    const stats:boxscore = {
                        games: games_played,
                        minutes: row[headers.indexOf('MIN')],
                        fgm: row[headers.indexOf('FGM')],
                        fga: row[headers.indexOf('FGA')],
                        fgPct: row[headers.indexOf('FG_PCT')],
                        ftm: row[headers.indexOf('FTM')],
                        fta: row[headers.indexOf('FTA')],
                        ftPct: row[headers.indexOf('FT_PCT')],
                        fg3m: row[headers.indexOf('FG3M')],
                        fg3a: row[headers.indexOf('FG3A')],
                        fg3Pct: row[headers.indexOf('FG3_PCT')],
                        pts: row[headers.indexOf('PTS')],
                        oreb: row[headers.indexOf('OREB')],
                        dreb: row[headers.indexOf('DREB')],
                        reb: row[headers.indexOf('REB')],
                        ast: row[headers.indexOf('AST')],
                        stl: row[headers.indexOf('STL')],
                        blk: row[headers.indexOf('BLK')],
                        tov: row[headers.indexOf('TOV')],
                        pf: row[headers.indexOf('PF')],
                        plusMinus: row[headers.indexOf('PLUS_MINUS')],
                        fantasyPts: row[headers.indexOf('FANTASY_PTS')]
                    };

                    const t = teams.filter(t => t.id === row[headers.indexOf('TEAM_ID')]);
                    const team:teamType = t[0];

                    const gamelog:gamelogType = {
                        season: season,
                        player: player,
                        team: team,
                        gameId: parseInt(row[headers.indexOf('GAME_ID')]),
                        date: row[headers.indexOf('GAME_DATE')],
                        matchup: row[headers.indexOf('MATCHUP')],
                        WL: row[headers.indexOf('WL')],
                        stats: stats
                    }
                    gamelogs.push(gamelog);
                }
            });
            allGP.push(games_played);

            // console.log(gamelogs);
            let fg_pct:number|null;
            if (sum(fga) > 0) {
                fg_pct = sum(fgm) / sum(fga);
            } else {
                fg_pct = null;
            }
            let ft_pct:number|null;
            if (sum(fta) > 0) {
                ft_pct = sum(ftm) / sum(fta);
            } else {
                ft_pct = null;
            }
            let fg3_pct:number|null;
            if (sum(fg3a) > 0) {
                fg3_pct = sum(fg3m) / sum(fg3a);
            } else {
                fg3_pct = null;
            }

            const totals:boxscore = {
                games: games_played,
                minutes: sum(min),
                fgm: sum(fgm),
                fga: sum(fga),
                fgPct: fg_pct,
                ftm: sum(ftm),
                fta: sum(fta),
                ftPct: ft_pct,
                fg3m: sum(fg3m),
                fg3a: sum(fg3a),
                fg3Pct: fg3_pct,
                pts: sum(pts),
                oreb: sum(oreb),
                dreb: sum(dreb),
                reb: sum(reb),
                ast: sum(ast),
                stl: sum(stl),
                blk: sum(blk),
                tov: sum(tov),
                pf: sum(pf),
                plusMinus: sum(p_m),
                fantasyPts: sum(fpts)
            };
            allMinTotals.push(totals.minutes);
            allFgmTotals.push(totals.fgm);
            allFgaTotals.push(totals.fga);
            if (totals.fgPct) {
                allFgpctTotals.push(totals.fgPct);
            }
            allFtmTotals.push(totals.ftm);
            allFtaTotals.push(totals.fta);
            if (totals.ftPct) {
                allFtpctTotals.push(totals.ftPct);
            }
            allFg3mTotals.push(totals.fg3m);
            allFg3aTotals.push(totals.fg3a);
            if (totals.fg3Pct) {
                allFg3pctTotals.push(totals.fg3Pct);
            }
            allPtsTotals.push(totals.pts);
            allOrebTotals.push(totals.oreb);
            allDrebTotals.push(totals.dreb);
            allRebTotals.push(totals.reb);
            allAstTotals.push(totals.ast);
            allStlTotals.push(totals.stl);
            allBlkTotals.push(totals.blk);
            allTovTotals.push(totals.tov);
            allPfTotals.push(totals.pf);
            allP_mTotals.push(totals.plusMinus);
            allFptsTotals.push(totals.fantasyPts)

            let avgs:boxscore;
            if (games_played > 0) {
                avgs = {
                    games: games_played,
                    minutes: mean(min),
                    fgm: mean(fgm),
                    fga: mean(fga),
                    fgPct: fg_pct,
                    ftm: mean(ftm),
                    fta: mean(fta),
                    ftPct: ft_pct,
                    fg3m: mean(fg3m),
                    fg3a: mean(fg3a),
                    fg3Pct: fg3_pct,
                    pts: mean(pts),
                    oreb: mean(oreb),
                    dreb: mean(dreb),
                    reb: mean(reb),
                    ast: mean(ast),
                    stl: mean(stl),
                    blk: mean(blk),
                    tov: mean(tov),
                    pf: mean(pf),
                    plusMinus: mean(p_m),
                    fantasyPts: mean(fpts)
                };
            } else {
                avgs = {
                    games: games_played,
                    minutes: 0.0,
                    fgm: 0.0,
                    fga: 0.0,
                    fgPct: fg_pct,
                    ftm: 0.0,
                    fta: 0.0,
                    ftPct: ft_pct,
                    fg3m: 0.0,
                    fg3a: 0.0,
                    fg3Pct: fg3_pct,
                    pts: 0.0,
                    oreb: 0.0,
                    dreb: 0.0,
                    reb: 0.0,
                    ast: 0.0,
                    stl: 0.0,
                    blk: 0.0,
                    tov: 0.0,
                    pf: 0.0,
                    plusMinus: 0.0,
                    fantasyPts: 0.0
                };
            }
            const playerInfo:playerInfo = {
                player: player,
                totals: totals,
                avgs: avgs,
                gamelogs: gamelogs
            }
            p.push(playerInfo);
        });

        // get z_scores
        // get league means
        const allGP_mean:number = mean(allGP);
        const allMin_mean:number = mean(allMin);
        const allFgm_mean:number = mean(allFgm);
        const allFga_mean:number = mean(allFga);
        const allFgpct_mean:number = mean(allFgpct);
        const allFtm_mean:number = mean(allFtm);
        const allFta_mean:number = mean(allFta);
        const allFtpct_mean:number = mean(allFtpct);
        const allFg3m_mean:number = mean(allFg3m);
        const allFg3a_mean:number = mean(allFg3a);
        const allFg3pct_mean:number = mean(allFg3pct);
        const allPts_mean:number = mean(allPts);
        const allOreb_mean:number = mean(allOreb);
        const allDreb_mean:number = mean(allDreb);
        const allReb_mean:number = mean(allReb);
        const allAst_mean:number = mean(allAst);
        const allStl_mean:number = mean(allStl);
        const allBlk_mean:number = mean(allBlk);
        const allTov_mean:number = mean(allTov);
        const allPf_mean:number = mean(allPf);
        const allP_m_mean:number = mean(allP_m);
        const allFpts_mean:number = mean(allFpts);
        const allMinTotals_mean:number = mean(allMinTotals);
        const allFgmTotals_mean:number = mean(allFgmTotals);
        const allFgaTotals_mean:number = mean(allFgaTotals);
        const allFtmTotals_mean:number = mean(allFtmTotals);
        const allFtaTotals_mean:number = mean(allFtaTotals);
        const allFg3mTotals_mean:number = mean(allFg3mTotals);
        const allFg3aTotals_mean:number = mean(allFg3aTotals);
        const allPtsTotals_mean:number = mean(allPtsTotals);
        const allOrebTotals_mean:number = mean(allOrebTotals);
        const allDrebTotals_mean:number = mean(allDrebTotals);
        const allRebTotals_mean:number = mean(allRebTotals);
        const allAstTotals_mean:number = mean(allAstTotals);
        const allStlTotals_mean:number = mean(allStlTotals);
        const allBlkTotals_mean:number = mean(allBlkTotals);
        const allTovTotals_mean:number = mean(allTovTotals);
        const allPfTotals_mean:number = mean(allPfTotals);
        const allP_mTotals_mean:number = mean(allP_mTotals);
        const allFptsTotals_mean:number = mean(allFptsTotals);

        // std
        const allGP_std:number = std(allGP, allGP_mean);
        const allMin_std:number = std(allMin, allMin_mean);
        const allFgm_std:number = std(allFgm, allFgm_mean);
        const allFga_std:number = std(allFga, allFga_mean);
        const allFgpct_std:number = std(allFgpct, allFgpct_mean);
        const allFtm_std:number = std(allFtm, allFtm_mean);
        const allFta_std:number = std(allFta, allFta_mean);
        const allFtpct_std:number = std(allFtpct, allFtpct_mean);
        const allFg3m_std:number = std(allFg3m, allFg3m_mean);
        const allFg3a_std:number = std(allFg3a, allFg3a_mean);
        const allFg3pct_std:number = std(allFg3pct, allFg3pct_mean);
        const allPts_std:number = std(allPts, allPts_mean);
        const allOreb_std:number = std(allOreb, allOreb_mean);
        const allDreb_std:number = std(allDreb, allDreb_mean);
        const allReb_std:number = std(allReb, allReb_mean);
        const allAst_std:number = std(allAst, allAst_mean);
        const allStl_std:number = std(allStl, allStl_mean);
        const allBlk_std:number = std(allBlk, allBlk_mean);
        const allTov_std:number = std(allTov, allTov_mean);
        const allPf_std:number = std(allPf, allPf_mean);
        const allP_m_std:number = std(allP_m, allP_m_mean);
        const allFpts_std:number = std(allFpts, allFpts_mean);
        const allMinTotals_std:number = std(allMinTotals, allMinTotals_mean);
        const allFgmTotals_std:number = std(allFgmTotals, allFgmTotals_mean);
        const allFgaTotals_std:number = std(allFgaTotals, allFgaTotals_mean);
        const allFtmTotals_std:number = std(allFtmTotals, allFtmTotals_mean);
        const allFtaTotals_std:number = std(allFtaTotals, allFtaTotals_mean);
        const allFg3mTotals_std:number = std(allFg3mTotals, allFg3mTotals_mean);
        const allFg3aTotals_std:number = std(allFg3aTotals, allFg3aTotals_mean);
        const allPtsTotals_std:number = std(allPtsTotals, allPtsTotals_mean);
        const allOrebTotals_std:number = std(allOrebTotals, allOrebTotals_mean);
        const allDrebTotals_std:number = std(allDrebTotals, allDrebTotals_mean);
        const allRebTotals_std:number = std(allRebTotals, allRebTotals_mean);
        const allAstTotals_std:number = std(allAstTotals, allAstTotals_mean);
        const allStlTotals_std:number = std(allStlTotals, allStlTotals_mean);
        const allBlkTotals_std:number = std(allBlkTotals, allBlkTotals_mean);
        const allTovTotals_std:number = std(allTovTotals, allTovTotals_mean);
        const allPfTotals_std:number = std(allPfTotals, allPfTotals_mean);
        const allP_mTotals_std:number = std(allP_mTotals, allP_mTotals_mean);
        const allFptsTotals_std:number = std(allFptsTotals, allFptsTotals_mean);

        let p_z:playerObj[] = [];
        p.forEach(player => {
            let fgPctZ:number|null;
            if (player.totals.fgPct === null) {
                fgPctZ = null;
            } else {
                fgPctZ = z_score(player.totals.fgPct, allFgpct_mean, allFgpct_std);
            }
            let ftPctZ:number|null;
            if (player.totals.ftPct === null) {
                ftPctZ = null;
            } else {
                ftPctZ = z_score(player.totals.ftPct, allFtpct_mean, allFtpct_std);
            }
            let fg3PctZ:number|null;
            if (player.totals.fg3Pct === null) {
                fg3PctZ = null;
            } else {
                fg3PctZ = z_score(player.totals.fg3Pct, allFg3pct_mean, allFg3pct_std);
            }

            const zTotals:boxscore = {
                games: z_score(player.totals.games, allGP_mean, allGP_std),
                minutes: z_score(player.totals.minutes, allMinTotals_mean, allMinTotals_std),
                fgm: z_score(player.totals.fgm, allFgmTotals_mean, allFgmTotals_std),
                fga: z_score(player.totals.fga, allFgaTotals_mean, allFgaTotals_std),
                fgPct: fgPctZ,
                ftm: z_score(player.totals.ftm, allFtmTotals_mean, allFtmTotals_std),
                fta: z_score(player.totals.fta, allFtaTotals_mean, allFtaTotals_std),
                ftPct: ftPctZ,
                fg3m: z_score(player.totals.fg3m, allFg3mTotals_mean, allFg3mTotals_std),
                fg3a: z_score(player.totals.fg3a, allFg3aTotals_mean, allFg3aTotals_std),
                fg3Pct: fg3PctZ,
                pts: z_score(player.totals.pts, allPtsTotals_mean, allPtsTotals_std),
                oreb: z_score(player.totals.oreb, allOrebTotals_mean, allOrebTotals_std),
                dreb: z_score(player.totals.dreb, allDrebTotals_mean, allDrebTotals_std),
                reb: z_score(player.totals.reb, allRebTotals_mean, allRebTotals_std),
                ast: z_score(player.totals.ast, allAstTotals_mean, allAstTotals_std),
                stl: z_score(player.totals.stl, allStlTotals_mean, allStlTotals_std),
                blk: z_score(player.totals.blk, allBlkTotals_mean, allBlkTotals_std),
                tov: z_score(player.totals.tov, allTovTotals_mean, allTovTotals_std) * -1,
                pf: z_score(player.totals.pf, allPfTotals_mean, allPfTotals_std) * -1,
                plusMinus: z_score(player.totals.plusMinus, allP_mTotals_mean, allP_mTotals_std),
                fantasyPts: z_score(player.totals.fantasyPts, allFptsTotals_mean, allFptsTotals_std)
            }

            const zAvgs:boxscore = {
                games: z_score(player.avgs.games, allGP_mean, allGP_std),
                minutes: z_score(player.avgs.minutes, allMin_mean, allMin_std),
                fgm: z_score(player.avgs.fgm, allFgm_mean, allFgm_std),
                fga: z_score(player.avgs.fga, allFga_mean, allFga_std),
                fgPct: fgPctZ,
                ftm: z_score(player.avgs.ftm, allFtm_mean, allFtm_std),
                fta: z_score(player.avgs.fta, allFta_mean, allFta_std),
                ftPct: ftPctZ,
                fg3m: z_score(player.avgs.fg3m, allFg3m_mean, allFg3m_std),
                fg3a: z_score(player.avgs.fg3a, allFg3a_mean, allFg3a_std),
                fg3Pct: fg3PctZ,
                pts: z_score(player.avgs.pts, allPts_mean, allPts_std),
                oreb: z_score(player.avgs.oreb, allOreb_mean, allOreb_std),
                dreb: z_score(player.avgs.dreb, allDreb_mean, allDreb_std),
                reb: z_score(player.avgs.reb, allReb_mean, allReb_std),
                ast: z_score(player.avgs.ast, allAst_mean, allAst_std),
                stl: z_score(player.avgs.stl, allStl_mean, allStl_std),
                blk: z_score(player.avgs.blk, allBlk_mean, allBlk_std),
                tov: z_score(player.avgs.tov, allTov_mean, allTov_std) * -1,
                pf: z_score(player.avgs.pf, allPf_mean, allPf_std) * -1,
                plusMinus: z_score(player.avgs.plusMinus, allP_m_mean, allP_m_std),
                fantasyPts: z_score(player.avgs.fantasyPts, allFpts_mean, allFpts_std)
            };

            const playerObj:playerObj = {
                playerInfo: player,
                zAvgs: zAvgs,
                zTotals: zTotals
            }
            p_z.push(playerObj);
        });
        const info:object = {
            last_updated: new Date(),
            season: season
        };
        const json = {
            info: info,
            players: p_z
        }
        const jsonData = JSON.stringify(json, null, 2);
        fs.writeFile('../static-app/src/data.json', jsonData, (err:NodeJS.ErrnoException|null) => {
            if (err) {
                console.log(err);
            } else {
                console.log('data.json created!');
                const time2 = new Date();
                console.log(time2.getTime() - time1.getTime());
            }
        });
    });
});
