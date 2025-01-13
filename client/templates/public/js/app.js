// ****************************************** Hamburger ********************
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
// *********************************************  Chart  ************************
let bloodSugarLevels = [];
let timeLabels = [];
let lastTimestamp = 0;

const ctx = document.getElementById("bloodSugarChart").getContext("2d");
const bloodSugarChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: timeLabels,
    datasets: [
      {
        label: "Blood Sugar Level (mg/dL)",
        data: bloodSugarLevels,
        borderColor: "#003B5C",
        backgroundColor: "#D9534F",
        fill: true,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      x: {
        type: "linear",
        position: "bottom",
        title: {
          display: true,
          text: "Time (s)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Blood Sugar Level (mg/dL)",
        },
      },
    },
  },
});

function updateChart() {
  const bloodSugarInput = document.getElementById("bloodSugar").value;

  if (
    !bloodSugarInput ||
    isNaN(bloodSugarInput) ||
    bloodSugarInput < 50 ||
    bloodSugarInput > 500
  ) {
    alert("Please enter a valid blood sugar level between 50 and 500 mg/dL.");
    return;
  }

  const currentTime = lastTimestamp + 1;
  lastTimestamp = currentTime;

  bloodSugarLevels.push(parseInt(bloodSugarInput));
  timeLabels.push(currentTime);
  
  bloodSugarChart.update();
  recordSugar(bloodSugarInput)
  fetchSugarData();
  showFoodRecommendations(parseInt(bloodSugarInput));
  
  document.getElementById("bloodSugar").value = "";
}

function showFoodRecommendations(bloodSugar) {
  const recommendationsDiv = document.getElementById("foodRecommendations");
  recommendationsDiv.innerHTML = "";

  let recommendations = "";

  if (bloodSugar < 70) {
    recommendations =
      "Your blood sugar is low. Try eating a small snack with 15g of carbohydrates (ex: a glass of juice, a piece of fruit).";
  } else if (bloodSugar >= 70 && bloodSugar <= 130) {
    recommendations =
      "Your blood sugar is within the normal range. Consider eating balanced meals with whole grains, vegetables, and lean proteins.";
  } else if (bloodSugar > 130 && bloodSugar <= 180) {
    recommendations =
      "Your blood sugar is higher than normal. Consider eating more fiber-rich foods like non-starchy vegetables, whole grains, and lean proteins.";
  } else {
    recommendations =
      "Your blood sugar is high. Try to reduce high-carb foods and focus on lean protein, healthy fats, and non-starchy vegetables.";
  }

  recommendationsDiv.innerHTML = recommendations;
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

  if (authToken) {
    document.getElementById("loginLink").style.display = "none";
    document.getElementById("signupLink").style.display = "none";
    document.getElementById("signoutLink").style.display = "block";
  } else {
    document.getElementById("loginLink").style.display = "block";
    document.getElementById("signupLink").style.display = "block";
    document.getElementById("signoutLink").style.display = "none";
  }
}

// window.addEventListener("DOMContentLoaded", updateChart);

function signOut() {
  localStorage.removeItem("authtoken");

  updateNavLinks();
}

function simulateLogin() {
  localStorgae.removeItem("authtoken", "user-auth-token");

  updateNavLinks();
}

function simulateLogout() {
  localStorage.removeItem("authtoken");

  updateNavLinks();
}

// Store sugar to current user
async function recordSugar(sugar) {
  const authToken = localStorage.getItem("authtoken");

  try {
    const response = await fetch('/api/sugar', {
      method: 'POST',
      headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      body: JSON.stringify({ sugar }),
    });

    const data = await response.json();

    
    if (await data) {
      console.log(await data, '<<<< data')
    }

    if (response.ok) {
      console.log('Sugar recorded')
    } else {
      console.log('Sugar unable to be recorded')
    }

  } catch (err) {
    console.log(err, 'Error')
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
        console.log(data, "<<<< data");
      } else {
        console.log("sugar data could not be fetched");
      }
    } catch (err) {
      console.log(err, "Error");
    }
  }
}


const addRecipeBtns = document.querySelectorAll('.saveFood');
// Add event listener to buttons and trigger saveRecipe
addRecipeBtns.addEventListener('click', async function(event) {
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
    console.log(foodData, '<<<< foodData')
    console.log('Recipe added successfully!');
    } catch (err) {
      console.log('Error adding recipe:', err);
    } 
})

// Function for saving recipes
async function saveRecipe(foodData) {
  const authToken = localStorage.getItem("authtoken");

  try {
    const response = await fetch('/api/recipe', {
      method: 'POST',
      headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      body: JSON.stringify(foodData),
    });

    const data = await response.json();

    
    if (await data) {
      console.log(await data, '<<<< data')
    }

    if (response.ok) {
      console.log('Recipe recorded')
    } else {
      console.log('Recipe unable to be recorded')
    }

  } catch (err) {
    console.log(err, 'Error')
  }
}