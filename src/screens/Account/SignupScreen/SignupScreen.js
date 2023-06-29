import React from "react";
import { View } from "react-native";
import { Image, Text } from "react-native-elements";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SignupForm } from "../../../components/Auth";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { styles } from "./SignupScreen.styles";

export function SignupScreen() {
  const theme = useThemaContext();
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={[
        styles.contentContainer,
        {
          backgroundColor: theme
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <Image
        source={require("../../../../assets/icons/logo_only_owl.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            {
              color: theme ? color.light.text : color.dark.text,
            },
          ]}
        >
          Sign Up
        </Text>
        <SignupForm />
      </View>
    </KeyboardAwareScrollView>
  );
}
