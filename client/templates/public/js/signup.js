const registerForm = document.getElementById('register-form');

// Handle register
registerForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;

  console.log(email, password, firstName, lastName, '<<<<< User data')
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName })
    });

    const data = await response.json();

    
    if (await data) {
      console.log(await data, '<<<< data')
      console.log(data.token)
            localStorage.setItem('authtoken', data.token)
    }
    

    if (response.ok) {
      console.log('Registration Success')
      window.location.href = "/";
    } else {
      console.log('Registration Failed')
    }

  } catch (err) {
    console.log(err, 'Error')
  }
})

