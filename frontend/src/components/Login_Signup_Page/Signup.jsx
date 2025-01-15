// import {
//   googleSignup,
//   submitSignupData,
//   togglePassword,
// } from "../../../public/js/signup";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="ca-signup-container" style={{ backgroundColor: "#ffdaaa" }}>
      <div className="card signup-card mt-5">
        <div
          className="card-content"
          style={{ backgroundColor: "#fff", borderRadius: "24px" }}
        >
          <h1 className="heading-text epilogue">
            SignUp For Free To View Our Services
          </h1>
          <div className="signup-content has-text-centered">
            {/* <!-- USERNAME --> */}
            <div className="field input-field">
              <div className="control show-error-message-above" data-err-msg="">
                <input
                  className="input is-medium"
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Full Name"
                />
              </div>
            </div>
            {/* <!-- EMAIL ID --> */}
            <div className="field input-field" style={{ marginTop: "2rem" }}>
              <div className="control show-error-message-below" data-err-msg="">
                <input
                  className="input is-medium"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email ID"
                />
              </div>
            </div>
            {/* <!-- PASSWORD --> */}
            <div
              className="field input-field"
              style={{ marginTop: "2rem", marginBottom: "3rem" }}
            >
              <div className="control show-error-message-below" data-err-msg="">
                <input
                  className="input is-medium"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Phone No"
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
              // onClick={submitSignupData}
            >
              SIGNUP →
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
