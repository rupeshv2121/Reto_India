import axios from 'axios';

// Password toggle logic
export function togglePassword() {
    var passwordField = document.getElementById("password");
    var icon = document.querySelector(".eye-icon i");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        icon.className = "icon icon-eye";  // change to eye icon
    } else {
        passwordField.type = "password";
        icon.className = "icon icon-eye-off";  // change back to eye-off icon
    }
}

// Validation and submission logic
export function submitSignupData() {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Perform validations
    if (!usernameIsValid(username)) {
        markBadInput("username", "Full Name should only contain alphanumeric characters & spaces");
        return;
    }

    if (!emailIsValid(email)) {
        markBadInput("email", "Please enter a valid email address");
        return;
    }

    if (!passwordIsValid(password)) {
        markBadInput("password", "Password should have a minimum of 6 characters");
        return;
    }

    // Submit data to the server
    axios.post("https://api.example.com/signup", {
        username: username,
        email: email,
        password: password
    }).then(response => {
        if (response.status === 200) {
            window.location.href = "/signup-plan-selection";
        } else {
            alert("Signup failed, please try again.");
        }
    }).catch(error => {
        alert("Error: " + error.message);
    });
}

function usernameIsValid(value) {
    return /^[a-zA-Z0-9\s]+$/.test(value) && value.length <= 35;
}

function emailIsValid(value) {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
}

function passwordIsValid(value) {
    return value.length >= 6;
}

function markBadInput(input, errorMsg) {
    var inputElement = document.getElementById(input);
    inputElement.classList.add('is-danger');
    inputElement.parentElement.dataset.errMsg = errorMsg;
}

export function googleSignup() {
    // Logic for Google signup
    window.location.href = "https://accounts.google.com/signin";
}

