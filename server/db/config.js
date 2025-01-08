const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});


connection.connect((err) => {
    if (err) {
        console.error('Unable to connect to the database', err);
    } else {
        console.log('Connected to Vital_db');
    }
});

connection
  .promise()
  .query('SELECT * FROM users')
  .then(([rows, fields]) => {
      console.log(rows);
});

module.exports = connection;