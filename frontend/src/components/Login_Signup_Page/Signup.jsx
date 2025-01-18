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

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: (user) => signUpUser(user),
    onSuccess: () => {
      // console.log("Signup successful:", user);
      toast("Signup successfully, Welcome " + user.fullName);
      setUser({ fullName: "", email: "", password: "" });
    },
    onError: (error) => {
      console.error("Error signing up:", error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.fullName || !user.email || !user.password) {
      toast.warn("Please fill out all fields!", { position: "top-center" });
      return;
    }
    mutate(user);
    // console.log("HandleSubmit");
  };
  return (
    <div className="ca-signup-container" style={{ backgroundColor: "#ffdaaa" }}>
      <div className="card signup-card mt-5">
        <div
          className="card-content"
          style={{ backgroundColor: "#fff", borderRadius: "24px" }}
        >
          <ToastContainer style={{ zIndex: 1000000 }} />
          <h1 className="heading-text epilogue">
            SignUp For Free To View Our Services
          </h1>
          <div className="signup-content has-text-centered">
            <form
              onSubmit={handleSubmit}
              className="signup-content has-text-centered"
            >
              {/* <!-- USERNAME --> */}
              <div className="field input-field">
                <div
                  className="control show-error-message-above"
                  data-err-msg=""
                >
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
              </div>
              {/* <!-- EMAIL ID --> */}
              <div className="field input-field" style={{ marginTop: "2rem" }}>
                <div
                  className="control show-error-message-below"
                  data-err-msg=""
                >
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
              </div>
              {/* <!-- PASSWORD --> */}
              <div
                className="field input-field"
                style={{ marginTop: "2rem", marginBottom: "3rem" }}
              >
                <div
                  className="control show-error-message-below"
                  data-err-msg=""
                >
                  <input
                    className="input is-medium"
                    type="password"
                    id="password"
                    value={user.password}
                    name="password"
                    placeholder="password"
                    onChange={handleOnChange}
                  />
                  {/* <span className="eye-icon" onClick={togglePassword}> */}
                  <i
                    className="icon icon-eye-off"
                    style={{ color: "grey-dark" }}
                  ></i>
                  {/* </span> */}
                </div>
              </div>
              <p className="is-size-7 mt-5" style={{ color: "#5D5E98" }}>
                By signing up you agree to our{" "}
                <a
                  href="https://abun.com/terms-conditions/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>
                and{" "}
                <a
                  href="https://abun.com/privacy-policy/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </p>
              <button
                className="button signup-btn-border is-large is-responsive mt-5"
                id="submitButton"
                style={{ borderRadius: "8px", color: "#000" }}
              >
                {isLoading ? "Signing Up..." : "SIGNUP →"}
              </button>
              <div className="divider-wrapper mt-4 mb-4">
                <span className="divider">OR</span>
              </div>
              <div className="connect-account">
                <button
                  className="button signup-btn-border"
                  // onClick={googleSignup}
                >
                  <i className="icon icon-google"></i>
                  Sign up with Google →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
