import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { signUpUser } from "../../API/api";
import "./Signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  // const handleMouseUpPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => signUpUser(user),
    onSuccess: (response) => {
      console.log("Signup successful - onSuccess triggered", response);
      setUser({ fullName: "", email: "", password: "" });
      toast.success("Signup successful", {
        position: "top-center",
      });
    },
    onError: (error) => {
      console.error("Error signing up:", error.message);
      toast.error("Signup failed. Please try again.", {
        position: "top-center",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.fullName || !user.email || !user.password) {
      toast.warn("Please fill out all fields!", { position: "top-center" });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(user.email)) {
      toast.warn("Invalid email format", { position: "top-center" });
      return;
    }
    if (user.password.length < 6) {
      toast.warn("Password must be at least 6 characters long", {
        position: "top-center",
      });
      return;
    }
    // console.log(user);
    mutate(user);
  };

  return (
    <div className="ca-signup-container" style={{ backgroundColor: "#ffdaaa" }}>
      <div className=" signup-card mt-5">
        <div
          className="card-content"
          style={{ backgroundColor: "#fff", borderRadius: "24px" }}
        >
          <ToastContainer />
          <h1 className="heading-text epilogue">SignUp To View Our Services</h1>
          <div className="signup-content has-text-centered">
            <form
              onSubmit={handleSubmit}
              className="signup-content has-text-centered"
            >
              <div className="field input-field">
                <input
                  className="input is-medium"
                  type="text"
                  id="username"
                  value={user.fullName}
                  name="fullName"
                  placeholder="Full Name"
                  onChange={handleOnChange}
                />
              </div>
              <div className="field input-field" style={{ marginTop: "2rem" }}>
                <input
                  className="input is-medium"
                  type="email"
                  id="email"
                  value={user.email}
                  name="email"
                  placeholder="Email ID"
                  onChange={handleOnChange}
                />
              </div>
              <div
                className="field input-field"
                style={{ marginTop: "2rem", marginBottom: "3rem" }}
              >
                <input
                  className="input is-medium"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  name="password"
                  placeholder="Password"
                  onChange={handleOnChange}
                />
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  // onMouseDown={handleMouseDownPassword}
                  // onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </div>
              <button
                className="button signup-btn-border is-large is-responsive mt-5"
                id="submitButton"
                style={{ borderRadius: "8px", color: "#000" }}
                disabled={isLoading}
              >
                {isLoading ? "Signing Up..." : "SIGNUP →"}
              </button>
              <div className="divider-wrapper mt-4 mb-4">
                <span>OR</span>
              </div>
              <button className="button signup-btn-border" type="button">
                <i className="icon icon-google"></i>
                Sign up with Google →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
