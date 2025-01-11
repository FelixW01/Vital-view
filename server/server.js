const express = require('express');
const path = require('path')
const hbs = require('hbs')
const dotenv = require('dotenv')
const routes = require('./routes');
const { savedFoodSchema } = require('./models/consumedfoods');
const { bloodSugarSchema } = require('./models/bloodsugar');
const { userSchema } = require('./models/user');
require('./db/config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000

// Make sure user table is present
userSchema();
savedFoodSchema();
bloodSugarSchema();

const publicDirectoryPath = path.join(__dirname, '../client/templates/public')
const viewsPath = path.join(__dirname, '../client/templates/views')
const partialsPath = path.join(__dirname, '../client/templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.json());
app.use(express.static(publicDirectoryPath))
// Setup routes
app.use(routes);

// Uses express router to make server.js less cluttered
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`)
})