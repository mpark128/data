"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gamelog = exports.Game = exports.Player = exports.Team = void 0;
var Team = /** @class */ (function () {
    function Team(id, name, city, abbreviation, conference, division, slug) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.abbreviation = abbreviation;
        this.conference = conference;
        this.division = division;
        this.slug = slug;
    }
    return Team;
}());
exports.Team = Team;
;
var Player = /** @class */ (function () {
    function Player(id, first_name, last_name, team_id, jsy_number, position, height_inches, weight_lbs, last_attended, country, draft_year, draft_round, draft_number, from_year, to_year, slug) {
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
    }
    return Player;
}());
exports.Player = Player;
;
var Game = /** @class */ (function () {
    function Game(id, season, date, home_id, away_id, home_score, away_score) {
        this.id = id;
        this.season = season;
        this.date = date;
        this.home_id = home_id;
        this.away_id = away_id;
        this.home_score = home_score;
        this.away_score = away_score;
    }
    return Game;
}());
exports.Game = Game;
var Gamelog = /** @class */ (function () {
    function Gamelog(game_id, player_id, team_id, stats) {
        this.game_id = game_id;
        this.player_id = player_id;
        this.team_id = team_id;
        this.stats = stats;
    }
    return Gamelog;
}());
exports.Gamelog = Gamelog;
