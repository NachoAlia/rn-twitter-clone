import React, { useEffect, useContext } from "react";
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
import { UserContext } from "../../../context/UserProvider";
import { domainUrl } from "../../../config/host";

import { screen } from "../../../utils";
import Toast from "react-native-toast-message";

export function EditProfileScreen() {
  const thema = useThemaContext();
  const { currentUser, setUpdateInfo } = useContext(UserContext);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = new FormData();

        data.append("user[username]", formValue.userName || "");
        data.append("user[biography]", formValue.biography || "");
        data.append("user[localization]", formValue.localization || "");
        data.append("user[website]", formValue.website || "");

        data.append("user[photoCover]", formValue.photoCover || "");
        data.append("user[photoProfile]", formValue.photoProfile || "");

        await fetch(`${domainUrl}/users/${currentUser.id}`, {
          method: "PATCH",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(() => {
          setUpdateInfo(true);
          navigation.navigate(screen.account.accountProfile);
        });
      } catch (error) {
        console.log(error);
      }
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
