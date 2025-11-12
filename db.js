const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cafeteriaLuasPlace',
  password: 'ornelas2611',
  port: 5432,
});

module.exports = pool;