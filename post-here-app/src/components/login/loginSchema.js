import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  username: Yup.string(),

  loginPassword: Yup.string(),
});

export default loginSchema;
