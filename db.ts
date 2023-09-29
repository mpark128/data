import {Pool} from 'pg';

export const pool = new Pool({
    user: 'postgres',
    password: 'welcome35',
    host: 'localhost',
    port: 5432,
    database: 'nba_db'
});
