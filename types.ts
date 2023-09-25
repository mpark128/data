export type boxscore = {
    games: number,
    minutes: number,
    fgm: number,
    fga: number,
    fgPct: number|null,
    ftm: number,
    fta: number,
    ftPct: number|null,
    fg3m: number,
    fg3a: number,
    fg3Pct: number|null,
    pts: number,
    oreb: number,
    dreb: number,
    reb: number,
    ast: number,
    stl: number,
    blk: number,
    tov: number,
    pf: number,
    plusMinus: number,
    fantasyPts: number
};

export type teamType = {
    id: number;
    name: string;
    city: string;
    abbreviation: string;
    slug: string;
}

export type playerType = {
    id: number;
    name: string;
    slug: string;
    team: teamType;
    jsyNumber: number|null;
    position: string[];
    heightInches: number;
    weightLbs: number;
    lastPlayed: string;
    country: string;
    draftYear: number|null;
    draftRound: number|null;
    draftNumber: number|null;
    fromYear: number;
    toYear: number;
};

export type gamelogType = {
    season: string;
    player: playerType;
    team: teamType;
    gameId: number;
    date: string;
    matchup: string;
    WL: string;
    stats: boxscore;
};

export type playerInfo = {
    player: playerType,
    totals: boxscore,
    avgs: boxscore,
    gamelogs: gamelogType[]
};

export type playerObj = {
    playerInfo: playerInfo,
    zAvgs: boxscore,
    zTotals: boxscore
};

export class Team {
    id: number;
    name: string;
    city: string;
    abbreviation: string;
    slug: string;

    constructor(id: number, name: string, city: string, abbreviation: string, slug: string){
        this.id = id;
        this.name = name;
        this.city = city;
        this.abbreviation = abbreviation;
        this.slug = slug
    } 

    format() {
        return `${this.city} ${this.name} (id:${this.id})`;
    }
}

export class Player {
    id: number;
    name: string;
    slug: string;
    team: Team;
    jsyNumber: number|null;
    position: string[];
    heightInches: number;
    weightLbs: number;
    lastPlayed: string;
    country: string;
    draftYear: number|null;
    draftRound: number|null;
    draftNumber: number|null;
    fromYear: number;
    toYear: number;

    constructor(
        id: number,
        name: string,
        slug: string,
        team: Team,
        jsyNumber: number|null,
        position: string[],
        heightInches: number,
        weightLbs: number,
        lastPlayed: string,
        country: string,
        draftYear: number|null,
        draftRound: number|null,
        draftNumber: number|null,
        fromYear: number,
        toYear: number){
            this.id = id;
            this.name = name;
            this.slug = slug;
            this.team = team;
            this.jsyNumber = jsyNumber;
            this.position = position;
            this.heightInches = heightInches;
            this.weightLbs = weightLbs;
            this.lastPlayed = lastPlayed;
            this.country = country;
            this.draftYear = draftYear;
            this.draftRound = draftRound;
            this.draftNumber = draftNumber;
            this.fromYear = fromYear;
            this.toYear = toYear;
        }
    
    format() {
        return `${this.name} (id:${this.id})`;
    }
}

export class Gamelog {
    season: string;
    player: Player;
    team: Team;
    gameId: number;
    date: Date;
    matchup: string;
    WL: string;
    stats: boxscore;

    constructor(season: string, player: Player, team: Team, gameId: number, date: Date, matchup: string, WL: string, stats: boxscore){
        this.season = season;
        this.player = player;
        this.team = team;
        this.gameId = gameId;
        this.date = date;
        this.matchup = matchup;
        this.WL = WL;
        this.stats = stats;
    }

    format() {
        return `${this.matchup}: ${this.player}`;
    }
}