import * as Yup from "yup";

export function initialValues() {
  return {
    userName: "",
    biography: "",
    localization: "",
    website: "",
    photoCover: "",
    photoProfile: "",
  };
}

export function validationSchema() {
  return Yup.object({
    userName: Yup.string().required("El campo es obligatorio"),
    biography: Yup.string().required("El campo es obligatorio"),
    localization: Yup.string().required("El campo es obligatorio"),
    website: Yup.string().required("El campo es obligatorio"),
  });
}
