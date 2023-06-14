import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { SigninForm } from "../../../components/Auth";
import { screen, color } from "../../../utils";
import { styles } from "./SigninScreen.styles";
import { useThemaContext } from "../../../components/ThemeProvider";

export function SigninScreen() {
  const navigation = useNavigation();
  const theme = useThemaContext();
  // console.log(theme);

  return (
    <ScrollView
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
        source={require("../../../../assets/icons/logo.png")}
        style={styles.image}
        onPress={() => {
          navigation.navigate(screen.account.index);
        }}
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
          Sign in
        </Text>
        <SigninForm />

        <Text
          style={[
            styles.textRegister,
            {
              color: theme ? color.light.text : color.dark.text,
            },
          ]}
        >
          ¿New to Owl?{" "}
          <Text
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate(screen.account.signup);
            }}
          >
            Sign up here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
