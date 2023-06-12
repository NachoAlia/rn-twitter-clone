import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { EditProfileForm } from "../../../components/Account";
import { EditInfoForm } from "../../../components/Account/EditProfileForm/EditInfoForm";
import { screen } from "../../../utils/screenName";

import { useFormik } from "formik";
import {
  initialValues,
  validationSchema,
} from "../../../components/Account/EditProfileForm/EditProfileForm.data";

import { styles } from "./EditProfileScreen.styles";

export function EditProfileScreen() {
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
      headerRight: () => (
        <TouchableOpacity
          containerStyle={styles.buttonSave}
          onPress={formik.handleSubmit}
        >
          <Text style={styles.buttonSaveText}>Guardar</Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  return <EditProfileForm formik={formik} />;
}
