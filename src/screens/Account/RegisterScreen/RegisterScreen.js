import React from "react";
import { View } from "react-native";
import { Image, Text } from "react-native-elements";
import { styles } from "./RegisterScreen.styles";
import { ImageAuto } from "../../../utils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RegisterForm } from "../../../components/Auth";

export function RegisterScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/icons/logo_only_owl.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <RegisterForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
