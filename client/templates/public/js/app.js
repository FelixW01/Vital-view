// ****************************************** Hamburger ********************
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
// *********************************************  Chart  ************************
let bloodSugarChart;
let bloodSugarLevels = [];
let timeLabels = [];
let lastTimestamp = 0;

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("bloodSugarChart").getContext("2d");
  bloodSugarChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: timeLabels,
      datasets: [
        {
          label: "Blood Glucose Level (mg/dL)",
          data: bloodSugarLevels,
          borderColor: "#003B5C",
          backgroundColor: "#FFCCCB",
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "MM/dd/yy",
            displayFormats: {
              minute: "MM/dd/yy",
            },
          },
          position: "bottom",
          title: {
            display: true,
            text: "Time (Date)",
          },
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          title: {
            display: true,
            text: "Blood Glucose Level (mg/dL)",
          },
        },
      },
    },
  });
});

// Function to update chart
function updateChart() {
  const bloodSugarInput = document.getElementById("bloodSugar").value;

  if (
    !bloodSugarInput ||
    isNaN(bloodSugarInput) ||
    bloodSugarInput < 50 ||
    bloodSugarInput > 500
  ) {
    alert("Please enter a valid blood glucose level between 50 and 500 mg/dL.");
    return;
  }

  const currentTime = new Date();
  lastTimestamp = currentTime;

  bloodSugarLevels.push(parseInt(bloodSugarInput));
  timeLabels.push(currentTime);

  bloodSugarChart.update();
  recordSugar(bloodSugarInput);
  fetchSugarData();

  document.getElementById("bloodSugar").value = "";
}

// **********************
// Grab data of current user
async function fetchUserData() {
  const authToken = localStorage.getItem("authtoken");

  if (authToken) {
    try {
      const response = await fetch("/api/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "<<<< data");

        localStorage.setItem("user", JSON.stringify(data));
        updateNavLinks();
      } else {
        console.log("User could not be fetched");
      }
    } catch (err) {
      console.log(err, "Error");
    }
  }
  fetchSugarData();
}
fetchUserData();

// ********************************************************************************************************************
function updateNavLinks() {
  const authToken = localStorage.getItem("authtoken");
  const user = localStorage.getItem("user");

  if (authToken) {
    const parsedUser = JSON.parse(user);
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("signupLink").style.display = "none";
    document.getElementById("signoutLink").style.display = "block";

    if (user) {
      document.getElementById(
        "userGreeting"
      ).textContent = `Hello, ${parsedUser.firstName} ${parsedUser.lastName}`;
      document.getElementById("userGreeting").style.display = "block";
    } else {
      document.getElementById("userGreeting").textContent = "Hello, Guest";
      document.getElementById("userGreeting").style.display = "block";
    }
  } else {
    document.getElementById("loginLink").style.display = "block";
    document.getElementById("signupLink").style.display = "block";
    document.getElementById("signoutLink").style.display = "none";
    document.getElementById("userGreeting").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateNavLinks();
});

function signOut() {
  localStorage.removeItem("authtoken");

  updateNavLinks();
}

// Store sugar to current user
async function recordSugar(sugar) {
  const authToken = localStorage.getItem("authtoken");

  try {
    const response = await fetch("/api/sugar", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ sugar }),
    });

    const data = await response.json();

    if (await data) {
      console.log(await data, "<<<< data");
    }

    if (response.ok) {
      console.log("Sugar recorded");
    } else {
      console.log("Sugar unable to be recorded");
    }
  } catch (err) {
    console.log(err, "Error");
  }
}

// Fetching sugar data based on user
async function fetchSugarData() {
  const authToken = localStorage.getItem("authtoken");

  if (authToken) {
    try {
      const response = await fetch("/api/getSugar", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data, "<< data");
        if (data.bloodSugarData.length > 0) {
          bloodSugarLevels.length = 0;
          timeLabels.length = 0;

          // Populate sugar data per user
          data.bloodSugarData.forEach((entry) => {
            const formattedTime = new Date(entry.measurement_date);
            if (!isNaN(formattedTime)) {
              bloodSugarLevels.push(entry.level);
              timeLabels.push(formattedTime);
            } else {
              console.error("Invalid date format:", entry.created_at);
            }
          });
          bloodSugarChart.update();
        }
      }
    } catch (err) {
      console.log(err, "Error");
    }
  }
}

const addRecipeBtns = document.querySelectorAll(".saveFood");
// Add event listener to buttons and trigger saveRecipe
addRecipeBtns.forEach((button) => {
  button.addEventListener("click", async function (event) {
    const foodData = {
      label: event.target.dataset.label,
      source: event.target.dataset.source,
      image: event.target.dataset.image,
      url: event.target.dataset.url,
      calories: parseInt(event.target.dataset.calories),
      sugar: parseFloat(event.target.dataset.sugar),
    };
    try {
      await saveRecipe(foodData);
      console.log(foodData, "<<<< foodData");
      console.log("Recipe added successfully!");
    } catch (err) {
      console.log("Error adding recipe:", err);
    }
  });
});

// Function for saving recipes
async function saveRecipe(foodData) {
  const authToken = localStorage.getItem("authtoken");

  try {
    const response = await fetch("/api/recipe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(foodData),
    });

    const data = await response.json();

    if (await data) {
      console.log(await data, "<<<< data");
    }

    if (response.ok) {
      console.log("Recipe recorded");
    } else {
      console.log("Recipe unable to be recorded");
    }
  } catch (err) {
    console.log(err, "Error");
  }
}

function validateRecipeSearchForm(event) {
  const input = document.getElementById("searchInput");
  const validationMessage = document.getElementById("validationRecipe");
  const query = input.value.trim();

  validationMessage.textContent = "";
  validationMessage.style.color = "red";

  if (!query) {
    validationMessage.textContent = "Please enter a search term.";
    event.preventDefault();
    return false;
  }

  if (query.length < 3) {
    validationMessage.textContent =
      "Search term must be at least 3 characters long.";
    event.preventDefault();
    return false;
  }

  if (!/^[a-zA-Z0-9\s]+$/.test(query)) {
    validationMessage.textContent =
      "Search term can only contain letters, numbers, and spaces.";
    event.preventDefault();
    return false;
  }

  return true;
}




//Delete Button
// Add event listener to delete buttons and trigger deleteRecipe
document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("delete-recipe")) {
    const foodId = event.target.value;
  
    try {
      await deleteRecipe(foodId);
      console.log(`Recipe with ID: ${foodId} deleted successfully!`);

      // remove the recipe card from the DOM
      const recipeCard = event.target.closest(".recipe-card");
      recipeCard.remove();
    } catch (err) {
      console.log("Error deleting recipe:", err);
    }
  }
});

// Function for deleting recipes
async function deleteRecipe(foodId) {
  const authToken = localStorage.getItem("authtoken");
  try {
    const response = await fetch(`/api/deleteRecipe`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({foodId}),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Recipe deleted successfully:", data);
    } else {
      console.log("Failed to delete the recipe:", data);
    }
  } catch (err) {
    console.log(err, "Error during deletion");
  }
}

// Attach the validation function to the form's submit event
document
  .getElementById("recipeSearchForm")
  .addEventListener("submit", validateRecipeSearchForm);