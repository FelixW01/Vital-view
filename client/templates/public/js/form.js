const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const submitBtn = document.querySelector(".btn");
const allInputs = document.querySelectorAll("#register-form input")

//patterns for validation
const namePattern = /^[a-zA-Z\s'-]+$/;
const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const addError = (input, label) => {
    input.classList.add("error");
    label.classList.add("error--message");
};

const removeError = (input, label) => {
    input.classList.remove("error");
    label.classList.remove("error--message");
};

allInputs.forEach((input) => {
    const labelElement = input.parentElement.childNodes[1];

    input.addEventListener("input", () => {
        checkInput(input, labelElement);
    });
});

function checkInput(input, label) {
    switch(input.id){
        case "email":
            if (emailPattern.test(input.value)){
                removeError(input, label);
                handleSubmit();
            } else {
                addError(input, label);
                handleSubmit();
            }
            break;
            case "password":
                if (input.value.length >= 8){
                    removeError(input, label);
                } else {
                    addError(input, label);
                }
                break;
        case "first-name":
        case "last-name":
            if (namePattern.test(input.value)){
                removeError(input, label);
            } else {
                addError(input, label);
            }
            break;
    }
    handleSubmit();
}

function handleSubmit(){
    if (
        emailInput.value === "" ||
        firstNameInput.value === "" ||
        lastNameInput.value === ""
    ) {
        submitBtn.classList.add("disabled");
        return;
    }
    submitBtn.classList.remove("disabled");
}