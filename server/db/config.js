const mysql = require('mysql2');
require('dotenv').config();

// Pool is a collection of connections, regular createConnection closes after each query
// While pool will be able to remain open and can be reused, making the application more
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
}).promise();
// .promise() here enables async await when dealing with the pool

// pool.getConnection((err, connection) => {
//     if (err) {
//       console.log('Could not connect to DB', err)
//     }
//     console.log('Connected to MySQL server.');
  
//     const sql = 'CREATE DATABASE IF NOT EXISTS vital_db';
//     connection.query(sql, (err, result) => {
//       connection.release()

//       if (err) {
//         console.log('Could not connect to DB', err)
//       }
//       console.log('Database created');
//     });
// });

module.exports = pool;
