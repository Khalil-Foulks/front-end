import React from "react";

export default function LoginForm(props) {
  const { values, onSubmit, onInputChange, disabled, formErrors } = props;

  return (
    <div>
      <div className="form">
        <form onSubmit={onSubmit}>
          <div className="formDiv">
            <input
              name="username"
              type="name"
              placeholder="Username"
              onChange={onInputChange}
              value={values.username}
            />
            <div className="formErrors">{formErrors.username}</div>
          </div>

          <div className="formDiv">
            <input
              name="loginPassword"
              type="password"
              placeholder="Password"
              value={values.password}
              onChange={onInputChange}
            />
            <div className="formErrors">{formErrors.loginPassword}</div>
          </div>
          <div className="formDiv">
            <button disabled={disabled}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
