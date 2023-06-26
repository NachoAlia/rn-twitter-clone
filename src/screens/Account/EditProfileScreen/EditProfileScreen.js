import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { EditProfileForm } from "../../../components/Account";
import { useNavigation } from "@react-navigation/native";

import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../../../components/Account/EditProfileForm/EditProfileForm.data";

import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

import { styles } from "./EditProfileScreen.styles";

export function EditProfileScreen() {
  const thema = useThemaContext();
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      console.log(formValue);
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit profile",
      headerTintColor: thema ? color.light.text : color.dark.text,
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
      headerRight: () => (
        <TouchableOpacity
          containerStyle={styles.buttonSave}
          onPress={formik.handleSubmit}
        >
          <Text
            style={[
              styles.buttonSaveText,
              { color: thema ? color.light.text : color.dark.text },
            ]}
          >
            Guardar
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [thema]);

  return (
    <ScrollView
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      <EditProfileForm formik={formik} />
    </ScrollView>
  );
}
