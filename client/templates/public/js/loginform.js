function validateLoginForm(){
    let errors = []; 


    const btn = document.querySelector('.btn').addEventListener('click', () => {
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
    
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email === ""){
            errors.push("Email is required for Login");
        } else if(!emailRegex.test(email)){
            errors.push("Enter a valid email address");
        }
    
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (password === ""){
            errors.push("Password required.")
        } else if (passwordRegex.test(password)){
            errors.push("Incorrect Password.")
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


console.log(validateLoginForm()), '<< valid';