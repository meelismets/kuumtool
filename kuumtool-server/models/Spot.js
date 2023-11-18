// model.js
const mariadb = require('mariadb');
const dotenv = require('dotenv');

dotenv.config();

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 5,
});

// Function to get data from the database
async function getData() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM spot');
    return rows;
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
}

module.exports = { getData };
