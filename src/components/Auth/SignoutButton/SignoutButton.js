import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Signout } from "../../../config/api/Auth";
import { styles } from "./SignoutButton.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import Toast from "react-native-toast-message";
import { LoadingModal, Modal } from "../../Shared";

export function SignoutButton() {
  const navigation = useNavigation();
  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSignout = async () => {
    try {
      setShowModal(false);
      setShowLoading(true);
      await Signout();

      navigation.replace(screen.account.signin);

      setShowLoading(false);

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Logged out",
        text2: "Successfully signed out",
      });
    } catch (error) {
      console.log(error);

      setShowLoading(false);

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
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <View>
          <Text>Are you sure you want to sign out?</Text>
          <TouchableOpacity onPress={handleSignout}>
            <Text>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowModal(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <LoadingModal show={showLoading} text="Signing out..." />
    </View>
  );
}
