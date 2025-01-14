function validateSignupForm(){
let errors =[];

const btn = document.querySelector('.btn').addEventListener('click', () => {
    console.log('hello')
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const firstName = document.getElementById('first-name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    
    if(firstName === ""){
        errors.push("First name is required.");
    }
    if (lastName === ""){
        errors.push("Last name is required");
    }
    const emailRegex =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email === ""){
        errors.push("Email is required");
    } else if (!emailRegex.test(email)){
        errors.push("Enter a valid email address.");
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if(password === ""){
        errors.push("password is required");
    } else if (!passwordRegex.test(password) ){
        errors.push("Password must be at least 9 characters long.");
    }
    
    if (errors.length > 0){
        let errorsMessagesHtml = "<ul>";
        errors.forEach(function(error){
            errorsMessagesHtml += "<li>" + error + "</li>";
        });
        errorsMessagesHtml += "</ul>";
        document.getElementById("errorMessages").innerHTML = errorsMessagesHtml;
        return false;
    }
    return true;
});

}
console.log(validateSignupForm()), '<< valid';