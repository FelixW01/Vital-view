const express = require('express');
const path = require('path')
const hbs = require('hbs')
const dotenv = require('dotenv')
const mysql = require('mysql2');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../client/templates/public')
const viewsPath = path.join(__dirname, '../client/templates/views')
const partialsPath = path.join(__dirname, '../client/templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index')
})

console.log('Database Host:', process.env.DB_HOST);
console.log('Database User:', process.env.DB_USER);
console.log('Database Name:', process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection
  .promise()
  .query('SELECT * FROM users')
  .then(([rows, fields]) => {
      console.log(rows);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})