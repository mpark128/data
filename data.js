"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var functions_1 = require("./functions");
var fs = require('fs');
var time1 = new Date();
var season = '2022-23';
// headers for nba api
var headerData = {
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
var url = new URL('https://stats.nba.com/stats/playerindex');
var params = new URLSearchParams({
    LeagueId: '00',
    Season: season
});
url.search = params.toString();
fetch(url, { headers: headerData })
    .then(function (res) { return res.json(); })
    .then(function (data) {
    (0, functions_1.read)(data, 'playerindex.txt');
    var players = [];
    var teams = [];
    var headers = data.resultSets[0].headers;
    var rows = data.resultSets[0].rowSet;
    rows.forEach(function (row) {
        var name = "".concat(row[headers.indexOf('PLAYER_FIRST_NAME')], " ").concat(row[headers.indexOf('PLAYER_LAST_NAME')]);
        var team;
        var jsyNumber;
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
        }
        else {
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
        var in_teams = teams.some(function (t) { return t.id === team.id; });
        if (!in_teams) {
            teams.push(team);
        }
        // get positions
        var pos = row[headers.indexOf('POSITION')];
        var positions = [];
        if (pos.includes('-')) {
            positions = pos.split('-');
        }
        else {
            positions.push(pos);
        }
        var heightString = row[headers.indexOf('HEIGHT')];
        var heightArray = heightString.split('-');
        var height = (parseInt(heightArray[0]) * 12) + parseInt(heightArray[1]);
        var player = {
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
    fetch(url, { headers: headerData })
        .then(function (res) { return res.json(); })
        .then(function (data) {
        (0, functions_1.read)(data, 'leaguegamelog.txt');
        headers = data.resultSets[0].headers;
        rows = data.resultSets[0].rowSet;
        // array of all individual games stats
        var allGP = [];
        var allMin = [];
        var allFgm = [];
        var allFga = [];
        var allFgpct = [];
        var allFtm = [];
        var allFta = [];
        var allFtpct = [];
        var allFg3m = [];
        var allFg3a = [];
        var allFg3pct = [];
        var allPts = [];
        var allOreb = [];
        var allDreb = [];
        var allReb = [];
        var allAst = [];
        var allStl = [];
        var allBlk = [];
        var allTov = [];
        var allPf = [];
        var allP_m = [];
        var allFpts = [];
        // array of all totals
        var allMinTotals = [];
        var allFgmTotals = [];
        var allFgaTotals = [];
        var allFgpctTotals = [];
        var allFtmTotals = [];
        var allFtaTotals = [];
        var allFtpctTotals = [];
        var allFg3mTotals = [];
        var allFg3aTotals = [];
        var allFg3pctTotals = [];
        var allPtsTotals = [];
        var allOrebTotals = [];
        var allDrebTotals = [];
        var allRebTotals = [];
        var allAstTotals = [];
        var allStlTotals = [];
        var allBlkTotals = [];
        var allTovTotals = [];
        var allPfTotals = [];
        var allP_mTotals = [];
        var allFptsTotals = [];
        var p = [];
        players.forEach(function (player) {
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
            var p_m = [];
            var fpts = [];
            var gamelogs = [];
            rows.forEach(function (row) {
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
                    var stats = {
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
                    var t = teams.filter(function (t) { return t.id === row[headers.indexOf('TEAM_ID')]; });
                    var team = t[0];
                    var gamelog = {
                        season: season,
                        player: player,
                        team: team,
                        gameId: parseInt(row[headers.indexOf('GAME_ID')]),
                        date: row[headers.indexOf('GAME_DATE')],
                        matchup: row[headers.indexOf('MATCHUP')],
                        WL: row[headers.indexOf('WL')],
                        stats: stats
                    };
                    gamelogs.push(gamelog);
                }
            });
            allGP.push(games_played);
            // console.log(gamelogs);
            var fg_pct;
            if ((0, functions_1.sum)(fga) > 0) {
                fg_pct = (0, functions_1.sum)(fgm) / (0, functions_1.sum)(fga);
            }
            else {
                fg_pct = null;
            }
            var ft_pct;
            if ((0, functions_1.sum)(fta) > 0) {
                ft_pct = (0, functions_1.sum)(ftm) / (0, functions_1.sum)(fta);
            }
            else {
                ft_pct = null;
            }
            var fg3_pct;
            if ((0, functions_1.sum)(fg3a) > 0) {
                fg3_pct = (0, functions_1.sum)(fg3m) / (0, functions_1.sum)(fg3a);
            }
            else {
                fg3_pct = null;
            }
            var totals = {
                games: games_played,
                minutes: (0, functions_1.sum)(min),
                fgm: (0, functions_1.sum)(fgm),
                fga: (0, functions_1.sum)(fga),
                fgPct: fg_pct,
                ftm: (0, functions_1.sum)(ftm),
                fta: (0, functions_1.sum)(fta),
                ftPct: ft_pct,
                fg3m: (0, functions_1.sum)(fg3m),
                fg3a: (0, functions_1.sum)(fg3a),
                fg3Pct: fg3_pct,
                pts: (0, functions_1.sum)(pts),
                oreb: (0, functions_1.sum)(oreb),
                dreb: (0, functions_1.sum)(dreb),
                reb: (0, functions_1.sum)(reb),
                ast: (0, functions_1.sum)(ast),
                stl: (0, functions_1.sum)(stl),
                blk: (0, functions_1.sum)(blk),
                tov: (0, functions_1.sum)(tov),
                pf: (0, functions_1.sum)(pf),
                plusMinus: (0, functions_1.sum)(p_m),
                fantasyPts: (0, functions_1.sum)(fpts)
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
            allFptsTotals.push(totals.fantasyPts);
            var avgs;
            if (games_played > 0) {
                avgs = {
                    games: games_played,
                    minutes: (0, functions_1.mean)(min),
                    fgm: (0, functions_1.mean)(fgm),
                    fga: (0, functions_1.mean)(fga),
                    fgPct: fg_pct,
                    ftm: (0, functions_1.mean)(ftm),
                    fta: (0, functions_1.mean)(fta),
                    ftPct: ft_pct,
                    fg3m: (0, functions_1.mean)(fg3m),
                    fg3a: (0, functions_1.mean)(fg3a),
                    fg3Pct: fg3_pct,
                    pts: (0, functions_1.mean)(pts),
                    oreb: (0, functions_1.mean)(oreb),
                    dreb: (0, functions_1.mean)(dreb),
                    reb: (0, functions_1.mean)(reb),
                    ast: (0, functions_1.mean)(ast),
                    stl: (0, functions_1.mean)(stl),
                    blk: (0, functions_1.mean)(blk),
                    tov: (0, functions_1.mean)(tov),
                    pf: (0, functions_1.mean)(pf),
                    plusMinus: (0, functions_1.mean)(p_m),
                    fantasyPts: (0, functions_1.mean)(fpts)
                };
            }
            else {
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
            var playerInfo = {
                player: player,
                totals: totals,
                avgs: avgs,
                gamelogs: gamelogs
            };
            p.push(playerInfo);
        });
        // get z_scores
        // get league means
        var allGP_mean = (0, functions_1.mean)(allGP);
        var allMin_mean = (0, functions_1.mean)(allMin);
        var allFgm_mean = (0, functions_1.mean)(allFgm);
        var allFga_mean = (0, functions_1.mean)(allFga);
        var allFgpct_mean = (0, functions_1.mean)(allFgpct);
        var allFtm_mean = (0, functions_1.mean)(allFtm);
        var allFta_mean = (0, functions_1.mean)(allFta);
        var allFtpct_mean = (0, functions_1.mean)(allFtpct);
        var allFg3m_mean = (0, functions_1.mean)(allFg3m);
        var allFg3a_mean = (0, functions_1.mean)(allFg3a);
        var allFg3pct_mean = (0, functions_1.mean)(allFg3pct);
        var allPts_mean = (0, functions_1.mean)(allPts);
        var allOreb_mean = (0, functions_1.mean)(allOreb);
        var allDreb_mean = (0, functions_1.mean)(allDreb);
        var allReb_mean = (0, functions_1.mean)(allReb);
        var allAst_mean = (0, functions_1.mean)(allAst);
        var allStl_mean = (0, functions_1.mean)(allStl);
        var allBlk_mean = (0, functions_1.mean)(allBlk);
        var allTov_mean = (0, functions_1.mean)(allTov);
        var allPf_mean = (0, functions_1.mean)(allPf);
        var allP_m_mean = (0, functions_1.mean)(allP_m);
        var allFpts_mean = (0, functions_1.mean)(allFpts);
        var allMinTotals_mean = (0, functions_1.mean)(allMinTotals);
        var allFgmTotals_mean = (0, functions_1.mean)(allFgmTotals);
        var allFgaTotals_mean = (0, functions_1.mean)(allFgaTotals);
        var allFtmTotals_mean = (0, functions_1.mean)(allFtmTotals);
        var allFtaTotals_mean = (0, functions_1.mean)(allFtaTotals);
        var allFg3mTotals_mean = (0, functions_1.mean)(allFg3mTotals);
        var allFg3aTotals_mean = (0, functions_1.mean)(allFg3aTotals);
        var allPtsTotals_mean = (0, functions_1.mean)(allPtsTotals);
        var allOrebTotals_mean = (0, functions_1.mean)(allOrebTotals);
        var allDrebTotals_mean = (0, functions_1.mean)(allDrebTotals);
        var allRebTotals_mean = (0, functions_1.mean)(allRebTotals);
        var allAstTotals_mean = (0, functions_1.mean)(allAstTotals);
        var allStlTotals_mean = (0, functions_1.mean)(allStlTotals);
        var allBlkTotals_mean = (0, functions_1.mean)(allBlkTotals);
        var allTovTotals_mean = (0, functions_1.mean)(allTovTotals);
        var allPfTotals_mean = (0, functions_1.mean)(allPfTotals);
        var allP_mTotals_mean = (0, functions_1.mean)(allP_mTotals);
        var allFptsTotals_mean = (0, functions_1.mean)(allFptsTotals);
        // std
        var allGP_std = (0, functions_1.std)(allGP, allGP_mean);
        var allMin_std = (0, functions_1.std)(allMin, allMin_mean);
        var allFgm_std = (0, functions_1.std)(allFgm, allFgm_mean);
        var allFga_std = (0, functions_1.std)(allFga, allFga_mean);
        var allFgpct_std = (0, functions_1.std)(allFgpct, allFgpct_mean);
        var allFtm_std = (0, functions_1.std)(allFtm, allFtm_mean);
        var allFta_std = (0, functions_1.std)(allFta, allFta_mean);
        var allFtpct_std = (0, functions_1.std)(allFtpct, allFtpct_mean);
        var allFg3m_std = (0, functions_1.std)(allFg3m, allFg3m_mean);
        var allFg3a_std = (0, functions_1.std)(allFg3a, allFg3a_mean);
        var allFg3pct_std = (0, functions_1.std)(allFg3pct, allFg3pct_mean);
        var allPts_std = (0, functions_1.std)(allPts, allPts_mean);
        var allOreb_std = (0, functions_1.std)(allOreb, allOreb_mean);
        var allDreb_std = (0, functions_1.std)(allDreb, allDreb_mean);
        var allReb_std = (0, functions_1.std)(allReb, allReb_mean);
        var allAst_std = (0, functions_1.std)(allAst, allAst_mean);
        var allStl_std = (0, functions_1.std)(allStl, allStl_mean);
        var allBlk_std = (0, functions_1.std)(allBlk, allBlk_mean);
        var allTov_std = (0, functions_1.std)(allTov, allTov_mean);
        var allPf_std = (0, functions_1.std)(allPf, allPf_mean);
        var allP_m_std = (0, functions_1.std)(allP_m, allP_m_mean);
        var allFpts_std = (0, functions_1.std)(allFpts, allFpts_mean);
        var allMinTotals_std = (0, functions_1.std)(allMinTotals, allMinTotals_mean);
        var allFgmTotals_std = (0, functions_1.std)(allFgmTotals, allFgmTotals_mean);
        var allFgaTotals_std = (0, functions_1.std)(allFgaTotals, allFgaTotals_mean);
        var allFtmTotals_std = (0, functions_1.std)(allFtmTotals, allFtmTotals_mean);
        var allFtaTotals_std = (0, functions_1.std)(allFtaTotals, allFtaTotals_mean);
        var allFg3mTotals_std = (0, functions_1.std)(allFg3mTotals, allFg3mTotals_mean);
        var allFg3aTotals_std = (0, functions_1.std)(allFg3aTotals, allFg3aTotals_mean);
        var allPtsTotals_std = (0, functions_1.std)(allPtsTotals, allPtsTotals_mean);
        var allOrebTotals_std = (0, functions_1.std)(allOrebTotals, allOrebTotals_mean);
        var allDrebTotals_std = (0, functions_1.std)(allDrebTotals, allDrebTotals_mean);
        var allRebTotals_std = (0, functions_1.std)(allRebTotals, allRebTotals_mean);
        var allAstTotals_std = (0, functions_1.std)(allAstTotals, allAstTotals_mean);
        var allStlTotals_std = (0, functions_1.std)(allStlTotals, allStlTotals_mean);
        var allBlkTotals_std = (0, functions_1.std)(allBlkTotals, allBlkTotals_mean);
        var allTovTotals_std = (0, functions_1.std)(allTovTotals, allTovTotals_mean);
        var allPfTotals_std = (0, functions_1.std)(allPfTotals, allPfTotals_mean);
        var allP_mTotals_std = (0, functions_1.std)(allP_mTotals, allP_mTotals_mean);
        var allFptsTotals_std = (0, functions_1.std)(allFptsTotals, allFptsTotals_mean);
        var p_z = [];
        p.forEach(function (player) {
            var fgPctZ;
            if (player.totals.fgPct === null) {
                fgPctZ = null;
            }
            else {
                fgPctZ = (0, functions_1.z_score)(player.totals.fgPct, allFgpct_mean, allFgpct_std);
            }
            var ftPctZ;
            if (player.totals.ftPct === null) {
                ftPctZ = null;
            }
            else {
                ftPctZ = (0, functions_1.z_score)(player.totals.ftPct, allFtpct_mean, allFtpct_std);
            }
            var fg3PctZ;
            if (player.totals.fg3Pct === null) {
                fg3PctZ = null;
            }
            else {
                fg3PctZ = (0, functions_1.z_score)(player.totals.fg3Pct, allFg3pct_mean, allFg3pct_std);
            }
            var zTotals = {
                games: (0, functions_1.z_score)(player.totals.games, allGP_mean, allGP_std),
                minutes: (0, functions_1.z_score)(player.totals.minutes, allMinTotals_mean, allMinTotals_std),
                fgm: (0, functions_1.z_score)(player.totals.fgm, allFgmTotals_mean, allFgmTotals_std),
                fga: (0, functions_1.z_score)(player.totals.fga, allFgaTotals_mean, allFgaTotals_std),
                fgPct: fgPctZ,
                ftm: (0, functions_1.z_score)(player.totals.ftm, allFtmTotals_mean, allFtmTotals_std),
                fta: (0, functions_1.z_score)(player.totals.fta, allFtaTotals_mean, allFtaTotals_std),
                ftPct: ftPctZ,
                fg3m: (0, functions_1.z_score)(player.totals.fg3m, allFg3mTotals_mean, allFg3mTotals_std),
                fg3a: (0, functions_1.z_score)(player.totals.fg3a, allFg3aTotals_mean, allFg3aTotals_std),
                fg3Pct: fg3PctZ,
                pts: (0, functions_1.z_score)(player.totals.pts, allPtsTotals_mean, allPtsTotals_std),
                oreb: (0, functions_1.z_score)(player.totals.oreb, allOrebTotals_mean, allOrebTotals_std),
                dreb: (0, functions_1.z_score)(player.totals.dreb, allDrebTotals_mean, allDrebTotals_std),
                reb: (0, functions_1.z_score)(player.totals.reb, allRebTotals_mean, allRebTotals_std),
                ast: (0, functions_1.z_score)(player.totals.ast, allAstTotals_mean, allAstTotals_std),
                stl: (0, functions_1.z_score)(player.totals.stl, allStlTotals_mean, allStlTotals_std),
                blk: (0, functions_1.z_score)(player.totals.blk, allBlkTotals_mean, allBlkTotals_std),
                tov: (0, functions_1.z_score)(player.totals.tov, allTovTotals_mean, allTovTotals_std) * -1,
                pf: (0, functions_1.z_score)(player.totals.pf, allPfTotals_mean, allPfTotals_std) * -1,
                plusMinus: (0, functions_1.z_score)(player.totals.plusMinus, allP_mTotals_mean, allP_mTotals_std),
                fantasyPts: (0, functions_1.z_score)(player.totals.fantasyPts, allFptsTotals_mean, allFptsTotals_std)
            };
            var zAvgs = {
                games: (0, functions_1.z_score)(player.avgs.games, allGP_mean, allGP_std),
                minutes: (0, functions_1.z_score)(player.avgs.minutes, allMin_mean, allMin_std),
                fgm: (0, functions_1.z_score)(player.avgs.fgm, allFgm_mean, allFgm_std),
                fga: (0, functions_1.z_score)(player.avgs.fga, allFga_mean, allFga_std),
                fgPct: fgPctZ,
                ftm: (0, functions_1.z_score)(player.avgs.ftm, allFtm_mean, allFtm_std),
                fta: (0, functions_1.z_score)(player.avgs.fta, allFta_mean, allFta_std),
                ftPct: ftPctZ,
                fg3m: (0, functions_1.z_score)(player.avgs.fg3m, allFg3m_mean, allFg3m_std),
                fg3a: (0, functions_1.z_score)(player.avgs.fg3a, allFg3a_mean, allFg3a_std),
                fg3Pct: fg3PctZ,
                pts: (0, functions_1.z_score)(player.avgs.pts, allPts_mean, allPts_std),
                oreb: (0, functions_1.z_score)(player.avgs.oreb, allOreb_mean, allOreb_std),
                dreb: (0, functions_1.z_score)(player.avgs.dreb, allDreb_mean, allDreb_std),
                reb: (0, functions_1.z_score)(player.avgs.reb, allReb_mean, allReb_std),
                ast: (0, functions_1.z_score)(player.avgs.ast, allAst_mean, allAst_std),
                stl: (0, functions_1.z_score)(player.avgs.stl, allStl_mean, allStl_std),
                blk: (0, functions_1.z_score)(player.avgs.blk, allBlk_mean, allBlk_std),
                tov: (0, functions_1.z_score)(player.avgs.tov, allTov_mean, allTov_std) * -1,
                pf: (0, functions_1.z_score)(player.avgs.pf, allPf_mean, allPf_std) * -1,
                plusMinus: (0, functions_1.z_score)(player.avgs.plusMinus, allP_m_mean, allP_m_std),
                fantasyPts: (0, functions_1.z_score)(player.avgs.fantasyPts, allFpts_mean, allFpts_std)
            };
            var playerObj = {
                playerInfo: player,
                zAvgs: zAvgs,
                zTotals: zTotals
            };
            p_z.push(playerObj);
        });
        var info = {
            last_updated: new Date(),
            season: season
        };
        var json = {
            info: info,
            players: p_z
        };
        var jsonData = JSON.stringify(json, null, 2);
        fs.writeFile('../static-app/src/data.json', jsonData, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('data.json created!');
                var time2 = new Date();
                console.log(time2.getTime() - time1.getTime());
            }
        });
    });
});
