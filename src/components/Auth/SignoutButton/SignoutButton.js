import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Signout } from "../../../config/api/Auth";
import { styles } from "./SignoutButton.styles";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { LoadingModal, Modal } from "../../Shared";
import { Icon } from "react-native-elements";
import { color, screen } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";

export function SignoutButton() {
  const navigation = useNavigation();
  const [showLoading, setShowLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useThemaContext();

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
    <View>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setShowModal(true)}
      >
        <Icon name="logout" type="material-community" size={32} color="#ccc" />
        <Text
          style={{
            fontSize: 22,
            paddingHorizontal: 10,
            color: theme ? color.light.text : color.dark.text,
          }}
        >
          SignOut
        </Text>
      </TouchableOpacity>
      <Modal show={showModal} close={() => setShowModal(false)}>
        <View
          style={[
            styles.containerModal,
            {
              backgroundColor: theme
                ? color.light.background
                : color.dark.background,
            },
          ]}
        >
          <View style={styles.containerTextAndClose}>
            <Text
              style={[
                styles.text,
                {
                  color: theme ? color.light.text : color.dark.text,
                },
              ]}
            >
              Are you sure you want to sign out?
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleSignout}
              style={styles.buttonAcceptContainer}
            >
              <Text
                style={[styles.text, styles.btnAcept, styles.btnAceptCancel]}
              >
                Accept
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.buttonCloseContainer}
            >
              <Text
                style={[styles.text, styles.btnCancel, styles.btnAceptCancel]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <LoadingModal show={showLoading} text="Signing out..." />
    </View>
  );
}
