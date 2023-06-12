import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";

import { useFormik } from "formik";
import { Signin } from "../../../config/api/Auth";
import { useNavigation } from "@react-navigation/native";
import { screen, IconsButton } from "../../../utils";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./SigninForm.data";

import { styles } from "./SigninForm.styles";

export function SiginForm() {
  const navigation = useNavigation();

  const [showPassword, setShowPassword] = useState(false);

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await Signin(formValue.email, formValue.password);

        Toast.show({
          type: "success",
          position: "bottom",
          text1: "Welcome!!",
          text2: "Signed in successfully",
        });

        navigation.navigate(screen.account.index);
      } catch (error) {
        console.log(error);

        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Email or password are incorrect",
        });
      }
    },
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        rightIcon={<IconsButton name="mail" size={30} active={false} />}
        leftIcon={<IconsButton name="users" size={30} active={false} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        secureTextEntry={showPassword ? false : true}
        leftIcon={<IconsButton name="lock" size={30} active={false} />}
        rightIcon={
          <IconsButton
            name={showPassword ? "visibility_off" : "visibility"}
            size={30}
            active={false}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />
      <Button
        title="Sign In"
        containerStyle={styles.btnContainer}
        titleStyle={styles.btntitleContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}