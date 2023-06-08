import React from "react";
import { View, ScrollView } from "react-native";
import { Text, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../../../components/Auth";
import { screen } from "../../../utils";
import { styles } from "./LoginScreen.styles";

export function LoginScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Image
        source={require("../../../../assets/icons/logo.png")}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>Sign in</Text>
        <LoginForm />

        <Text style={styles.textRegister}>
          ¿New to Owl?{" "}
          <Text
            style={styles.btnRegister}
            onPress={() => {
              navigation.navigate(screen.account.register);
            }}
          >
            Sign up here
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}
