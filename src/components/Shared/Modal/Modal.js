import React from "react";
import { Overlay } from "react-native-elements";
import { styles } from "./Modal.styles";

export function Modal({ show, close, children, style, fullScreen = false }) {
  return (
    <Overlay
      isVisible={show}
      fullScreen={fullScreen}
      overlayStyle={[styles.overlay, style && style]}
      onBackdropPress={close}
      backdropStyle={styles.backdrop}
    >
      {children}
    </Overlay>
  );
}
