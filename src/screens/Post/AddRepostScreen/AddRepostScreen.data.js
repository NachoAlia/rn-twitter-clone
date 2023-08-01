import * as Yup from "yup";

export function initialValues() {
  return {
    repost: "",
    image: "",
  };
}

export function validationSchema() {
  return Yup.object({
    repost: Yup.string(),
    image: Yup.string(),
  });
}
