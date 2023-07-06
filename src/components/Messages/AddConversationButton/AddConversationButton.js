import React from "react";
import { TouchableOpacity } from "react-native";
import { styles } from "./AddConversationButton.styles";
import { Image } from "react-native-elements";

export function AddConversationButton() {
  return (
    <TouchableOpacity
      style={styles.addConversationButton}
      onPress={() => {
        console.log("abrir lista de chats");
      }}
      activeOpacity={0.7}
    >
      <Image
        source={require("../../../../assets/icons/ui/add_conversation.png")}
        style={styles.imageAddConversationButton}
      />
    </TouchableOpacity>
  );
}
