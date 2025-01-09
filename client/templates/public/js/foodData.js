const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const APP_ID = process.env.APP_ID;

const callApi = () => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`;

    axios.get(url)
        .then((response) => {
            // Check if there are hits
            if (response.data.hits && response.data.hits.length > 0) {
                // Iterate over each hit and log the recipe details
                response.data.hits.forEach(hit => {
                    const recipe = hit.recipe;
                    console.log(`Recipe: ${recipe.label}`);
                    console.log(`Source: ${recipe.source}`);
                    console.log(`URL: ${recipe.url}`);
                    console.log(`Image: ${recipe.image}`);
                    console.log(`Ingredients: ${recipe.ingredientLines.join(', ')}`);
                    console.log('-----------------------------------');
                });
            } else {
                console.log('No recipes found.');
            }
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
};

module.exports = callApi;