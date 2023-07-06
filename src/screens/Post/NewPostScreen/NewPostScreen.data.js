import * as Yup from "yup";

export function initialValues() {
  return {
    content: "",
    image: "",
  };
}

export function validationSchema() {
  return Yup.object({
    content: Yup.string(),
    image: Yup.object(),
  });
}
