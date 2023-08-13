import React, { useEffect, useState } from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import { styles } from "./AddConversationButton.styles";
import { Image } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

import { screen } from "../../../utils";

export function AddConversationButton() {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TouchableOpacity
      style={styles.addConversationButton}
      onPress={() => {
        setIsLoading(true);
        navigation.setOptions({
          tabBarStyle: { display: "none" },
        });
        setTimeout(() => {
          setIsLoading(false);
          navigation.navigate(screen.messages.newConversation);
        }, 200);
      }}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={"#ffff"} />
      ) : (
        <Image
          source={require("../../../../assets/icons/ui/add_conversation.png")}
          style={styles.imageAddConversationButton}
        />
      )}
    </TouchableOpacity>
  );
}
