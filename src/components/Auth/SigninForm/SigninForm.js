import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";

import { useFormik } from "formik";
import { Signin } from "../../../config/api/Auth";
import { useNavigation } from "@react-navigation/native";
import { screen, IconsButton } from "../../../utils";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./SigninForm.data";

import { UserContext } from "../../../context";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { styles } from "./SigninForm.styles";

export function SigninForm() {
  const navigation = useNavigation();
  const theme = useThemaContext();
  const { onLoginSuccess } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);

  const showHiddenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await Signin(formValue.email, formValue.password).then((response) => {
          onLoginSuccess(response);
        });

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
        inputStyle={{ color: theme ? color.light.text : color.dark.text }}
        inputContainerStyle={styles.inputContainer}
        rightIcon={<IconsButton name="mail" size={30} active={false} />}
        leftIcon={<IconsButton name="users" size={30} active={false} />}
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
      />
      <Input
        placeholder="Password"
        containerStyle={styles.input}
        inputStyle={{ color: theme ? color.light.text : color.dark.text }}
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
