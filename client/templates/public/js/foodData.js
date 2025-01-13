const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const APP_ID = process.env.APP_ID;


const callApi = async (query) => {
    try {
      const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${API_KEY}`;
      // console.log('API URL:', url); // Log the URL for debugging
      const response = await axios.get(url);
  
      if (response.data.hits && response.data.hits.length > 0) {
        console.log(response.data.hits[0], '<<<< hits here')
        return response.data.hits.map(hit => ({
          label: hit.recipe.label,
          source: hit.recipe.source,
          url: hit.recipe.url,
          image: hit.recipe.image,
          calories: hit.recipe.totalNutrients.ENERC_KCAL 
            ? Math.round(hit.recipe.totalNutrients.ENERC_KCAL.quantity) 
            : 'N/A', // Round calories!!
          sugar: hit.recipe.totalNutrients.SUGAR 
            ? Math.round(hit.recipe.totalNutrients.SUGAR.quantity) 
            : 'N/A', // Round sugar!!!
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  

  module.exports = callApi;

  
