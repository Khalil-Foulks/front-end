import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import LoginForm from "./LoginForm.jsx";
import loginSchema from "./loginSchema.js";
import { Link } from "react-router-dom";
import axiosWithAuth from "../../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialLoginFormValues = {
  username: "",
  loginPassword: "",
};
const initialLoginFormErrors = {
  username: "",
  loginPassword: "",
};

const initialDisabled = true;

export default function Login() {
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const [loginFormErrors, setLoginFormErrors] = useState(
    initialLoginFormErrors
  );

  let history = useHistory();

  const [disabled, setDisabled] = useState(initialDisabled);

  const loginOnInputChange = (evt) => {
    const { name, value } = evt.target;
    Yup.reach(loginSchema, name)
      .validate(value)
      .then(() => {
        setLoginFormErrors({
          ...loginFormErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setLoginFormErrors({
          ...loginFormErrors,
          [name]: err.errors[0],
        });
      });
    setLoginFormValues({
      ...loginFormValues,
      [name]: value,
    });
  };

  useEffect(() => {
    loginSchema.isValid(loginFormValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [loginFormValues]);

  const loginOnSubmit = (evt) => {
    evt.preventDefault();

    const loginUser = {
      username: loginFormValues.username.trim(),
      password: loginFormValues.loginPassword.trim(),
    };
    // console.log(loginUser);

    axiosWithAuth()
      .post("/api/auth/login", loginUser)
      .then((res) => {
        // console.log("Login Post", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("id", res.data.data.id);
        history.push("/dashboard");
      })
      .catch((err) => {
        // debugger;
        console.log(err);
      });
  };

  return (
    <div>
      <nav>
        <a target="_blank" rel="noopener noreferrer" id="logo" href="/">
          Post Here
        </a>
        <a target="_blank" rel="noopener noreferrer" href="https://loving-yalow-27dd9e.netlify.app/">Home</a>
        <Link to="/">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Dashboard</Link>
        <a target="_blank" rel="noopener noreferrer" href="https://loving-yalow-27dd9e.netlify.app/about.html">
          About Us
        </a>
      </nav>
      <h1>Login</h1>

      <LoginForm
        values={loginFormValues}
        onSubmit={loginOnSubmit}
        onInputChange={loginOnInputChange}
        disabled={disabled}
        formErrors={loginFormErrors}
      />
    </div>
  );
}
