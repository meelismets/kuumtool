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

async function updateVolume(spotId, volume) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE spot SET volume = ? WHERE id = ?', [volume, spotId]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
}

async function updateMovement(spotId, movement) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE spot SET movement = ? WHERE id = ?', [movement, spotId]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
}

async function updateSimulation(spotId, simulated) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.query('UPDATE spot SET simulated = ? WHERE id = ?', [simulated, spotId]);
  } catch (err) {
    throw err;
  } finally {
    if (conn) await conn.end();
  }
}

module.exports = { getData, updateVolume, updateMovement, updateSimulation};
