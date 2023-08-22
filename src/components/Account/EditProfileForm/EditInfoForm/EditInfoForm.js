import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./EditInfoForm.styles";

import { Icon, Text, Button, Input } from "react-native-elements";
import { useThemaContext } from "../../../ThemeProvider";
import { color } from "../../../../utils";

import { UserContext } from "../../../../context";

export function EditInfoForm(props) {
  const { formik } = props;
  const { currentUser } = useContext(UserContext);
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
            padding: 10,
          },
        ]}
      >
        <Input
          placeholder="Your NickName"
          label="NickName"
          defaultValue={currentUser?.nickname}
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("nickName", text)}
          errorMessage={formik.errors.userName}
        />
        <Input
          placeholder="Name"
          label="@UserName"
          defaultValue={currentUser?.username}
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("userName", text)}
          errorMessage={formik.errors.userName}
        />
        <Input
          placeholder={"Biography"}
          label="Biography"
          defaultValue={currentUser?.biography}
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
          defaultValue={currentUser?.localization}
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("localization", text)}
          errorMessage={formik.errors.localization}
        />
        <Input
          placeholder="WebSite"
          label={"WebSite"}
          defaultValue={currentUser?.website}
          containerStyle={styles.input}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          onChangeText={(text) => formik.setFieldValue("website", text)}
          errorMessage={formik.errors.website}
        />
      </View>
    </View>
  );
}
