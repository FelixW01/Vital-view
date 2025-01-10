const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, password, )

    try{
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({email, password })
        });

        const data = await response.json();

        if (await data){
            console.log(await data, '<<<< data')
            console.log(data.token)
            localStorage.setItem('authtoken',data.token)
        }

        if(response.ok){
            console.log('Login successful')
        } else{
            console.log('Login failed')
        }
    } catch (err){
        console.log(err,'Error')
    }
})