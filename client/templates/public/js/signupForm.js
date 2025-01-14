function validateSignupForm(){
const errorsMessagesDiv = document.getElementById("errorMessages");

const btn = document.querySelector('.btn').addEventListener('click', () => {
    let errors =[];
    errorsMessagesDiv.innerHTML = '';

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    

    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === ""){
        errors.push("Email is required");
    } else if (!emailRegex.test(email)){
        errors.push("Enter a Valid Email Address.");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if(password === ""){
        errors.push("Password is required");
    } else if (!passwordRegex.test(password) ){
        errors.push("Password must be at least 9 characters long.");
    }
    if(firstName === ""){
        errors.push("First name is required.");
    }
    if (lastName === ""){
        errors.push("Last name is required");
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
validateSignupForm();