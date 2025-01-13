const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    console.log("Form validation failed.");
    return;
  }

  console.log("Attempting to log in with", email, password);

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (await data) {
      console.log(await data, "<<<< data");
      console.log(data.token);
      if (!data === undefined) {
        localStorage.setItem("authtoken", data.token);
      }
    }

    if (response.ok) {
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }
  } catch (err) {
    console.log(err, "Error");
  }
});
