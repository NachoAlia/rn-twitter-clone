import React from "react";
import { EditInfoForm } from "./EditInfoForm";
import { EditImagesForm } from "./EditImagesForm";
import { styles } from "./EditProfileForm.styles";

export function EditProfileForm(props) {
  const { formik } = props;
  return (
    <>
      <EditImagesForm formik={formik} />
      <EditInfoForm formik={formik} />
    </>
  );
}
