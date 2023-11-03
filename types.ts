export type boxscore = {
    games_played:number,
    minutes:number,
    fgm:number,
    fga:number,
    fg_pct:number|null,
    ftm:number,
    fta:number,
    ft_pct:number|null,
    fg3m:number,
    fg3a:number,
    fg3_pct:number|null,
    pts:number,
    oreb:number,
    dreb:number,
    reb:number,
    ast:number,
    stl:number,
    blk:number,
    tov:number,
    pf:number,
    plus_minus:number,
    fantasy_pts:number
};

export type stats = {
    id:number,
    counting_stats: {
        totals:boxscore,
        avgs:boxscore
    },
    z_score: {
        totals:boxscore,
        avgs:boxscore
    }
};

export type team = {
    id:number,
    name:string|null,
    city:string|null,
    abbreviation:string,
    conference:string|null,
    division:string|null,
    slug:string,
    player_ids:number[]
};

export type gamelog = {
    game_id:number,
    team_id:number,
    games_played:number,
    minutes:number,
    fgm:number,
    fga:number,
    fg_pct:number|null,
    ftm:number,
    fta:number,
    ft_pct:number|null,
    fg3m:number,
    fg3a:number,
    fg3_pct:number|null,
    pts:number,
    oreb:number,
    dreb:number,
    reb:number,
    ast:number,
    stl:number,
    blk:number,
    tov:number,
    pf:number,
    plus_minus:number,
    fantasy_pts:number
};

export type player = {
    id:number,
    first_name:string,
    last_name:string,
    slug:string,
    team_id:number,
    jsy_number:number|null,
    position:string[],
    height_inches:number,
    weight_lbs:number,
    last_attended:string,
    country: string,
    draft_year:number|null,
    draft_round:number|null,
    draft_number:number|null,
    from_year:number,
    to_year:number,
    is_active:boolean,
    gamelogs:gamelog[],
};

export type game = {
    id:number,
    season:string,
    date:string,
    home_id:number,
    away_id:number,
    home_score:number|null,
    away_score:number|null,
    matchup:string
};

export type data_obj = {
    players: player[],
    teams: team[],
    games: game[],
    meta: {
        seasons:string[],
        last_updated:string,
        to_date:string|null
    }
}

export class Team {
    id:number;
    name:string|null;
    city:string|null;
    abbreviation:string;
    conference:string|null;
    division:string|null;
    slug:string;

    constructor(
        id:number, 
        name:string|null, 
        city:string|null, 
        abbreviation:string, 
        conference:string|null,
        division:string|null,
        slug:string
    ) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.abbreviation = abbreviation;
        this.conference = conference;
        this.division = division;
        this.slug = slug;
    } 
};

export class Player {
    id:number;
    first_name:string;
    last_name:string;
    team_id:number;
    jsy_number:number|null;
    position:string[];
    height_inches:number;
    weight_lbs:number;
    last_attended:string;
    country: string;
    draft_year:number|null;
    draft_round:number|null;
    draft_number:number|null;
    from_year:number;
    to_year:number;
    slug:string;
    is_active:boolean;

    constructor(
        id:number,
        first_name:string,
        last_name:string,
        team_id:number,
        jsy_number:number|null,
        position:string[],
        height_inches:number,
        weight_lbs:number,
        last_attended:string,
        country: string,
        draft_year:number|null,
        draft_round:number|null,
        draft_number:number|null,
        from_year:number,
        to_year:number,
        slug:string,
        is_active:boolean
    ) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.team_id = team_id;
        this.jsy_number = jsy_number;
        this.position = position;
        this.height_inches = height_inches;
        this.weight_lbs = weight_lbs;
        this.last_attended = last_attended;
        this.country = country;
        this.draft_year = draft_year;
        this.draft_round = draft_round;
        this.draft_number = draft_number;
        this.from_year = from_year;
        this.to_year = to_year;
        this.slug = slug;
        this.is_active = is_active;
    }
};

export class Game {
    id:number;
    season:string;
    date:Date;
    home_id:number;
    away_id:number;
    home_score:number|null;
    away_score:number|null;

    constructor(
        id:number,
        season:string,
        date:Date,
        home_id:number,
        away_id:number,
        home_score:number|null,
        away_score:number|null,
    ) {
        this.id = id;
        this.season = season;
        this.date = date;
        this.home_id = home_id;
        this.away_id = away_id;
        this.home_score = home_score;
        this.away_score = away_score;
    }
}

export class Gamelog {
    game_id:number;
    player_id:number;
    team_id:number;
    stats:boxscore;

    constructor(
        game_id:number,
        player_id:number,
        team_id:number,
        stats:boxscore,
    ) {
        this.game_id = game_id;
        this.player_id = player_id;
        this.team_id = team_id;
        this.stats = stats;
    }
}
