function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    var eyeIcon = document.querySelector('.eye-icon');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.add('eye-visible');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('eye-visible');
    }
}

document.getElementById('loginButton').addEventListener('click', function () {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMessageElement = document.getElementById('errorMessage');

    if (!email || !password) {
        errorMessageElement.classList.remove('is-hidden');
        errorMessageElement.textContent = 'Please enter a valid email id and password';
        return;
    }

    // Here you would make an API request to log in the user
    // Example:
    /*
    fetch('/api/frontend/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        if (response.ok) {
            window.location.href = '/dashboard'; // Redirect to dashboard after successful login
        } else {
            errorMessageElement.classList.remove('is-hidden');
            errorMessageElement.textContent = 'Invalid credentials. Please try again.';
        }
    });
    */
});

document.getElementById('googleLoginButton').addEventListener('click', function () {
    // Implement Google login redirect here
});

document.getElementById('createAccountLink').addEventListener('click', function () {
    // Redirect to create account page
});

document.getElementById('forgotPasswordLink').addEventListener('click', function () {
    // Redirect to forgot password page
});

export default togglePasswordVisibility;