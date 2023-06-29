import React, { useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import { Signup } from "../../../config/api/Auth";
import { useNavigation } from "@react-navigation/native";
import { screen, IconsButton } from "../../../utils";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./SignupForm.data";
import { styles } from "./SignupForm.styles";

export function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await Signup(formValue.email, formValue.username, formValue.password);

        Toast.show({
          type: "success",
          text1: `"Acount Created!`,
          text2: `"Welcome 🤗`,
          position: "bottom",
        });

        navigation.navigate(screen.account.signin);
      } catch (error) {
        Toast.show({
          type: "error",
          text1: `Account was not created`,
          text2: `Email or username already in use`,
          position: "bottom",
        });
      }
    },
  });

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  return (
    <View style={styles.content}>
      <Input
        placeholder="Email"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        leftIcon={
          <IconsButton name="mail" size={30} active={true} touchable={false} />
        }
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Username"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        leftIcon={
          <IconsButton
            name="users"
            size={30}
            active={false}
            touchable={false}
          />
        }
        onChangeText={(text) => formik.setFieldValue("username", text)}
        errorMessage={formik.errors.username}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        secureTextEntry={showPassword ? false : true}
        leftIcon={<IconsButton name="lock" size={30} touchable={false} />}
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
      <Input
        placeholder="Confirm Password"
        containerStyle={styles.input}
        inputContainerStyle={styles.inputContainer}
        secureTextEntry={showPassword ? false : true}
        leftIcon={<IconsButton name="lock" size={30} touchable={false} />}
        rightIcon={
          <IconsButton
            name={showPassword ? "visibility_off" : "visibility"}
            size={30}
            active={false}
            onPress={showHiddenPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("confirmPassword", text)}
        errorMessage={formik.errors.confirmPassword}
      />

      <Button
        title="Create Account"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
