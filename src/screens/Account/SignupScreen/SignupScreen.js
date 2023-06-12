import React from "react";
import { View } from "react-native";
import { Image, Text } from "react-native-elements";
import { styles } from "./SignupScreen.styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupForm } from "../../../components/Auth";

export function SignupScreen() {
  return (
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../../assets/icons/logo_only_owl.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign Up</Text>
        <SignupForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
