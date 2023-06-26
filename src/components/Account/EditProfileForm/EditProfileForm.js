import React from "react";
import { View } from "react-native";
import { EditInfoForm } from "./EditInfoForm";
import { EditImagesForm } from "./EditImagesForm";
import { styles } from "./EditProfileForm.styles";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function EditProfileForm(props) {
  const { formik } = props;
  const thema = useThemaContext();
  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        height: "100%",
      }}
    >
      <EditImagesForm formik={formik} />
      <EditInfoForm formik={formik} />
    </View>
  );
}
