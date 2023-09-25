"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gamelog = exports.Player = exports.Team = void 0;
var Team = /** @class */ (function () {
    function Team(id, name, city, abbreviation, slug) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.abbreviation = abbreviation;
        this.slug = slug;
    }
    Team.prototype.format = function () {
        return "".concat(this.city, " ").concat(this.name, " (id:").concat(this.id, ")");
    };
    return Team;
}());
exports.Team = Team;
var Player = /** @class */ (function () {
    function Player(id, name, slug, team, jsyNumber, position, heightInches, weightLbs, lastPlayed, country, draftYear, draftRound, draftNumber, fromYear, toYear) {
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
    Player.prototype.format = function () {
        return "".concat(this.name, " (id:").concat(this.id, ")");
    };
    return Player;
}());
exports.Player = Player;
var Gamelog = /** @class */ (function () {
    function Gamelog(season, player, team, gameId, date, matchup, WL, stats) {
        this.season = season;
        this.player = player;
        this.team = team;
        this.gameId = gameId;
        this.date = date;
        this.matchup = matchup;
        this.WL = WL;
        this.stats = stats;
    }
    Gamelog.prototype.format = function () {
        return "".concat(this.matchup, ": ").concat(this.player);
    };
    return Gamelog;
}());
exports.Gamelog = Gamelog;
