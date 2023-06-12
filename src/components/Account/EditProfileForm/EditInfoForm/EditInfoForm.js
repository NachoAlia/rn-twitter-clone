import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./EditInfoForm.styles";

import { Icon, Text, Button, Input } from "react-native-elements";

export function EditInfoForm(props) {
  const { formik } = props;
  return (
    <View>
      <View style={styles.infoProfileEditContainer}>
        <Input
          placeholder="Name"
          label="UserName"
          containerStyle={styles.input}
          onChangeText={(text) => formik.setFieldValue("userName", text)}
          errorMessage={formik.errors.userName}
        />
        <Input
          placeholder={"Biography"}
          label="Biography"
          numberOfLines={4}
          multiline={true}
          style={styles.biographyInputContainer}
          onChangeText={(text) => formik.setFieldValue("biography", text)}
          errorMessage={formik.errors.biography}
        />
        <Input
          placeholder="Localization"
          label="Localization"
          containerStyle={styles.input}
          onChangeText={(text) => formik.setFieldValue("localization", text)}
          errorMessage={formik.errors.localization}
        />
        <Input
          placeholder="WebSite"
          label={"WebSite"}
          containerStyle={styles.input}
          onChangeText={(text) => formik.setFieldValue("website", text)}
          errorMessage={formik.errors.website}
        />
      </View>
    </View>
  );
}
