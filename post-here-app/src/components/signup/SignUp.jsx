import React, { useState, useEffect } from "react";
import SignUpForm from "./SignUpForm";
import signUpSchema from "./signUpSchema";
import { Link } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

const initialSignUpFormValues = {
  signUpUsername: "",
  signUpPassword: "",
  confirmPassword: "",
};
const initialSignUpFormErrors = {
  signUpUsername: "",
  signUpPassword: "",
  confirmPassword: "",
};

const initialDisabled = true;

function SignUp() {
  const [signUpFormValues, setSignUpFormValues] = useState(
    initialSignUpFormValues
  );
  const [signUpFormErrors, setSignUpFormErrors] = useState(
    initialSignUpFormErrors
  );

  let history = useHistory();
  const [disabled, setDisabled] = useState(initialDisabled);

  const signUpOnInputChange = (evt) => {
    const { name, value } = evt.target;
    Yup.reach(signUpSchema, name)
      .validate(value)
      .then(() => {
        setSignUpFormErrors({
          ...signUpFormErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setSignUpFormErrors({
          ...signUpFormErrors,
          [name]: err.errors,
        });
      });
    setSignUpFormValues({
      ...signUpFormValues,
      [name]: value,
    });
  };

  const signUpOnSubmit = (evt) => {
    evt.preventDefault();

    const signUpUser = {
      username: signUpFormValues.signUpUsername.trim(),
      password: signUpFormValues.signUpPassword.trim(),
    };
    axios
      .post(
        "https://posthere-backend.herokuapp.com/api/auth/register",
        signUpUser
      )
      .then((res) => {
        console.log("SignUp", res);
        history.push("/login");
      })
      .catch((err) => {
        console.log("SignUp", err);
      });
  };
  useEffect(() => {
    signUpSchema.isValid(signUpFormValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [signUpFormValues]);

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
      <h1>Signup</h1>

      <SignUpForm
        values={signUpFormValues}
        onSubmit={signUpOnSubmit}
        onInputChange={signUpOnInputChange}
        disabled={disabled}
        formErrors={signUpFormErrors}
      />
    </div>
  );
}

export default SignUp;
