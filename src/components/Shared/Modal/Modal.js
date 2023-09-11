import React from "react";
import { Overlay } from "react-native-elements";
import { styles } from "./Modal.styles";

export function Modal({ show, close, children, style, animation = "slide" }) {
  return (
    <Overlay
      isVisible={show}
      overlayStyle={[styles.overlay, style && style]}
      onBackdropPress={close}
      backdropStyle={styles.backdrop}
      animationType={animation}
    >
      {children}
    </Overlay>
  );
}
