function validateLoginForm(){
    const errorsMessagesDiv = document.getElementById("errorMessages");

    const btn = document.querySelector('.btn').addEventListener('click', () => {
        let errors = []; 
    errorsMessagesDiv.innerHTML = '';

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
    
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email === ""){
            errors.push("Email is required for Login");
        } else if(!emailRegex.test(email)){
            errors.push("Enter a valid Email Address");
        }
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password === ""){
            errors = errors.concat("Password required.");
        } else if (!passwordRegex.test(password)){
            errors = errors.concat("Incorrect Password.");
        }
    
        
        if (errors.length > 0){
            let errorsMessagesHtml = "";
            errors.forEach(function(error){
                errorsMessagesHtml += "<p>" + error + "</p>";
            });
            document.getElementById("errorMessages").innerHTML = errorsMessagesHtml;
            return false;
        }
        return true;
    });

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    emailInput.addEventListener('input', ()=> {
        errorsMessagesDiv.innerHTML = '';
    });
    passwordInput.addEventListener('input', () => {
        errorsMessagesDiv.innerHTML = '';
    });
    }


validateLoginForm(), '<< valid';