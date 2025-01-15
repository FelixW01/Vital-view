// If you're dynamically fetching recipes on the client side
document.addEventListener("DOMContentLoaded", () => {
    getSavedRecipes();
  });
  
  const getSavedRecipes = async () => {
    const authToken = localStorage.getItem("authtoken");
  
    if (authToken) {
      try {
        const response = await fetch("/api/getRecipe", {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          renderRecipes(data);
        } else {
          console.log("Could not get recipes.");
        }
      } catch (err) {
        console.log(err, "Error");
      }
    }
  };
  

  const renderRecipes = (recipes) => {
    console.log(recipes.recipeData);
    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.innerHTML = ""; // Clear previous content
    
    if (recipes.recipeData.length === 0 || recipes.recipeData.length === undefined) {
      recipesContainer.innerHTML = "<p>No saved recipes found.</p>";
      return;
    }

    let recipeData = recipes.recipeData;

    recipeData.forEach((recipe) => {
      const recipeCard = `
        <div class="recipe-card">
          <img src="${recipe.image}" alt="${recipe.label}" class="recipe-image" />
          <h3>${recipe.label}</h3>
          <p>Source: ${recipe.source}</p>
          <p>Calories: ${Math.round(recipe.calories)}</p>
          <a href="${recipe.url}" target="_blank">View Recipe</a>
          <button class="delete-recipe" value=${recipe.foodId}>Delete Recipe</button>
        </div>
      `;
      recipesContainer.innerHTML += recipeCard;
    });
  };
  
