const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error('MySQL connection pool error:', err);
  } else {
    console.log('MySQL pool is connected');
    connection.release();
  }
});

module.exports = pool;
