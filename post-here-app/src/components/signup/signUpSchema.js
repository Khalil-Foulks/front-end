import * as Yup from "yup";

const signUpSchema = Yup.object().shape({
  signUpUsername: Yup.string()
    .min(3, "Name must be at least 3 characters long.")
    .required("Name is Required"),
  signUpPassword: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .required("Password is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("signUpPassword"), null], "Passwords must match")
    .required("Confirm Password is Required"),
});

export default signUpSchema;
