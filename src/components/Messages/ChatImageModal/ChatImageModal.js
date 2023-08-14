import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./ChatImageModal.styles";

import { Modal } from "../../Shared/Modal/Modal";

export function ChatImageModal(props) {
  const { chatImageUri, showImage, setShowImage } = props;
  return (
    <Modal
      show={showImage}
      close={setShowImage}
      style={{
        backgroundColor: "transparent",
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
      }}
    >
      <Image
        source={{ uri: chatImageUri }}
        style={{
          width: "80%",
          height: 250,
          alignSelf: "center",
        }}
      />
    </Modal>
  );
}
