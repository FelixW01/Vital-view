const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const APP_ID = process.env.APP_ID;

const callApi = async () => {
    try {
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`;
        const response = await axios.get(url);

        if (response.data.hits && response.data.hits.length > 0) {
            // Map the response data to only include relevant fields
            return response.data.hits.map(hit => ({
                label: hit.recipe.label,
                source: hit.recipe.source,
                url: hit.recipe.url,
                image: hit.recipe.image,
                ingredients: hit.recipe.ingredientLines,
            }));
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Propagate the error
    }
};

module.exports = callApi;
