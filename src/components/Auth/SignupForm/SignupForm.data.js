import * as Yup from "yup";
export function initialValues() {
  return {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("The email entered is not valid")
      .required("Email is required"),
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must have at least 3 characters")
      .max(15, "Username must have a maximum of 15 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Passwords don't match"),
  });
}
