import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../../API/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { mutate } = useMutation({
    mutationFn: (user) => loginUser(user),
    onSuccess: () => {
      toast.success("Login Successfully");
      setUser({
        email: "",
        password: "",
      });

      navigate("/");
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again.",
        { position: "top-center" }
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.warn("Please fill out all fields!", { position: "top-center" });
      return;
    }
    mutate(user);
  };

  return (
    <div className="unique-login-wrapper">
      <ToastContainer style={{ zIndex: "10000000" }} />
      <div className="unique-login-container">
        <h1>Login</h1>
        <h2>One Aim. More Organic Traffic to you, effortlessly.</h2>

        <div className="unique-login-card">
          <form action="" onSubmit={handleSubmit}>
            <div className="unique-login-content">
              {/* Email Input */}

              <div>
                <input
                  id="unique-email"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleOnChange}
                  placeholder="Email ID"
                />
              </div>
              {/* Password Input */}
              <div>
                <input
                  id="unique-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleOnChange}
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
            <div className="user-login">
              <NavLink
                to="/auth/signup"
                className="has-text-black is-underlined"
                id="createAccountLink"
              >
                Create New Account
              </NavLink>
              <span className="has-text-black">
                <span className="unique-divider">|</span>
              </span>
              <NavLink
                href="#"
                className="has-text-black is-underlined"
                id="forgotPasswordLink"
              >
                Forgot Password?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
