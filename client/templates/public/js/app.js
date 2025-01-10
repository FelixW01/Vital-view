// frontend JS
// Function to manage the navigation menu on small screens
function toggleMenu() {
  const navLinks = document.querySelector(".nav-links");
  navLinks.classList.toggle("active");
}
// Initialize data for the graph
let bloodSugarLevels = [];
let timeLabels = [];
let lastTimestamp = 0; // to keep track of time for x-axis

// Create a chart
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

// Function to add data to the graph
function updateChart() {
  const bloodSugarInput = document.getElementById("bloodSugar").value;

  // Validate input
  if (
    !bloodSugarInput ||
    isNaN(bloodSugarInput) ||
    bloodSugarInput < 50 ||
    bloodSugarInput > 500
  ) {
    alert("Please enter a valid blood sugar level between 50 and 500 mg/dL.");
    return;
  }

  const currentTime = lastTimestamp + 1; // Increment time by 1 second (or any increment you prefer)
  lastTimestamp = currentTime;

  // Push the blood sugar level and time
  bloodSugarLevels.push(parseInt(bloodSugarInput));
  timeLabels.push(currentTime);

  // Update the chart with new data
  bloodSugarChart.update();

  // Show food recommendations
  showFoodRecommendations(parseInt(bloodSugarInput));

  // Clear the input field after submission
  document.getElementById("bloodSugar").value = "";
}

// Function to show food recommendations based on blood sugar level
function showFoodRecommendations(bloodSugar) {
  const recommendationsDiv = document.getElementById("foodRecommendations");
  recommendationsDiv.innerHTML = ""; // Clear previous recommendations

  let recommendations = "";

  // Provide food recommendations based on the blood sugar level
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

async function fetchUserData() {
const authToken = localStorage.getItem('authtoken');

if (authToken) {
  try {
    const response = await fetch('/api/me', {
      method: 'GET',
      headers: { 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
       },
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data, '<<<< data');
      } else {
      console.log('User could not be fetched')
    }
  } catch (err) {
    console.log(err, 'Error')
  }
 }
}

fetchUserData()