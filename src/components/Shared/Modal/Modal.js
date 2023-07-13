import React from "react";
import { Overlay } from "react-native-elements";
import { styles } from "./Modal.styles";

export function Modal({ show, close, children }) {
  return (
    <Overlay
      isVisible={show}
      overlayStyle={styles.overlay}
      onBackdropPress={close}
    >
      {children}
    </Overlay>
  );
}
