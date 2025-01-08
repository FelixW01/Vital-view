const axios = require('axios')
require('dotenv').config();


const API_KEY = process.env.APP_ID
const APP_ID = process.env.API_KEY

const callApi = () => {
    let url = `https://api.edamam.com/api/recipes/v2&type=public&app_id=${APP_ID}&app_key=${API_KEY}`;


}

module.exports = callApi;