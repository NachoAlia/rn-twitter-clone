import React from "react";
import { View, ActivityIndicator } from "react-native";
import { Overlay, Text } from "react-native-elements";
import { styles } from "./LoadingModal.styles";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function LoadingModal({ show = false, text, animation = "fade" }) {
  const theme = useThemaContext();
  return (
    <Overlay
      isVisible={show}
      backdropStyle={styles.backdrop}
      overlayStyle={[
        styles.overlay,
        {
          backgroundColor: theme
            ? color.light.background
            : color.dark.background,
        },
      ]}
      animationType={animation}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#C19659" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}
