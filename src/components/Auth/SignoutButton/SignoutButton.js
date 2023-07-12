import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Signout } from "../../../config/api/Auth";
import { styles } from "./SignoutButton.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import Toast from "react-native-toast-message";

export function SignoutButton() {
  const navigation = useNavigation();

  const handleSignout = async () => {
    try {
      await Signout();

      navigation.replace(screen.account.signin);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Logged out",
        text2: "Successfully signed out",
      });
    } catch (error) {
      console.log(error);

      Toast.show({
        type: "error",
        position: "bottom",
        text1: "Error",
        text2: "Failed to sign out",
      });
    }
  };

  return (
    <View style={styles.content}>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
