import React from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./EditInfoForm.styles";

import { Icon, Text, Button, Input } from "react-native-elements";
import { useThemaContext } from "../../../ThemeProvider";
import { color } from "../../../../utils";

export function EditInfoForm(props) {
  const { formik } = props;
  const thema = useThemaContext();
  return (
    <View>
      <View
        style={[
          styles.infoProfileEditContainer,
          {
            backgroundColor: thema
              ? color.light.background
              : color.dark.background,
          },
        ]}
      >
        <Input
          placeholder="Name"
          label="UserName"
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("userName", text)}
          errorMessage={formik.errors.userName}
        />
        <Input
          placeholder={"Biography"}
          label="Biography"
          numberOfLines={4}
          multiline={true}
          style={styles.biographyInputContainer}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("biography", text)}
          errorMessage={formik.errors.biography}
        />
        <Input
          placeholder="Localization"
          label="Localization"
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("localization", text)}
          errorMessage={formik.errors.localization}
        />
        <Input
          placeholder="WebSite"
          label={"WebSite"}
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("website", text)}
          errorMessage={formik.errors.website}
        />
      </View>
    </View>
  );
}
