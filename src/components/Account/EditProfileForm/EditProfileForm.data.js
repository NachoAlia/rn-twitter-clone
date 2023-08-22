import * as Yup from "yup";

export function initialValues() {
  return {
    userName: "",
    nickName: "",
    biography: "",
    localization: "",
    website: "",
    photoCover: "",
    photoProfile: "",
  };
}

export function validationSchema() {
  return Yup.object({
    userName: Yup.string()
      .trim("El nombre de usuario no puede tener espacios en blanco")
      .strict()
      .nullable(true)
      .matches(
        /^\w+$/,
        "El nombre de usuario no puede tener espacios en blanco"
      ),
    biography: Yup.string().max(500, "La biografia es demasiado larga"),
    localization: Yup.string().max(50, "La Localizacion es demasiado larga"),
    website: Yup.string().max(50, "El website es demasiado largo"),
    // photoCover: Yup.object().required("El campo es obligatorio"),
    // photoProfile: Yup.object().required("El campo es obligatorio"),
  });
}
