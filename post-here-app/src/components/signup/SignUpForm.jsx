import React from "react";
import "../login/style/login.css";

export default function SignUpForm(props) {
  const { values, onSubmit, onInputChange, disabled, formErrors } = props;

  return (
    <div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="formDiv">
            <div className="formErrors">{formErrors.signUpUsername}</div>
            <input
              name="signUpUsername"
              type="name"
              placeholder="Username"
              onChange={onInputChange}
              value={values.username}
            />
          </div>

          <div className="formDiv">
            <div className="formErrors">{formErrors.signUpPassword}</div>
            <input
              name="signUpPassword"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={onInputChange}
            />
          </div>
          <div className="formDiv">
            <div className="formErrors">
              {values.confirmPassword === values.signUpPassword
                ? (formErrors.confirmPassword = "")
                : formErrors.confirmPassword}
            </div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={values.confirmPassword}
              onChange={onInputChange}
            />
          </div>
          <div>
            <button disabled={disabled}>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}
