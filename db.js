"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
var pg_1 = require("pg");
exports.pool = new pg_1.Pool({
    user: 'postgres',
    password: 'welcome35',
    host: 'localhost',
    port: 5432,
    database: 'nba_db'
});
