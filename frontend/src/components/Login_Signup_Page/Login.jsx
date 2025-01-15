import "./Login.css";

const Login = () => {
  return (
    <div className="unique-login-wrapper">
      <div className="unique-login-container">
        <h1>Login</h1>
        <h2>One Aim. More Organic Traffic to you, effortlessly.</h2>

        <div className="unique-login-card">
          <div className="unique-login-content">
            {/* Email Input */}
            <div>
              <input
                id="unique-email"
                type="email"
                name="email"
                placeholder="Email ID"
              />
            </div>
            {/* Password Input */}
            <div>
              <input
                id="unique-password"
                type="password"
                name="password"
                placeholder="Phone No"
              />
              <span className="unique-eye-icon">
                <i className="unique-eye-icon"></i>
              </span>
            </div>
            <button id="unique-loginButton" className="unique-login-btn">
              LOGIN →
            </button>
            <div className="unique-divider">
              <span>OR</span>
            </div>
            <button
              id="unique-googleLoginButton"
              className="unique-google-login-btn"
            >
              <i className="unique-google-icon"></i> Sign in with Google →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
