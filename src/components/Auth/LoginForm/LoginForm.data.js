import * as Yup from "yup";
export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("The email or username entered is not valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
}
