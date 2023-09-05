import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Image, Overlay } from "react-native-elements";
import { styles } from "./RepostsModal.style";
import { useThemaContext } from "../../../ThemeProvider";
import { color, screen } from "../../../../utils";
import { useNavigation } from "@react-navigation/native";
import { domainUrl } from "../../../../config/host";
import { UserContext, useReloadPostContext } from "../../../../context";

export function RepostsModal({ visible, onBackdropPress, dataPost, citeCase }) {
  const { currentUser } = useContext(UserContext);
  const thema = useThemaContext();
  const reloadpost = useReloadPostContext();
  const navigation = useNavigation();

  const repost = async () => {
    const route = `/tweets/${dataPost.id}/retweets?user_id=${currentUser.id}`;
    const apiUrl = `${domainUrl}${route}`;

    const formData = new FormData();
    formData.append("retweet[body]", "");

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });

    if (response.ok) {
      reloadpost();
      onBackdropPress();
    }
  };

  const goToRepost = () => {
    onBackdropPress();
    citeCase();
  };

  return (
    <Overlay
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      overlayStyle={[
        styles.container,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={repost}>
        <Image
          source={require("../../../../../assets/icons/ui/repost.png")}
          style={styles.icon}
        />
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          Repostear
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goToRepost}>
        <Image
          source={require("../../../../../assets/icons/ui/cite.png")}
          style={styles.icon}
        />
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          Citar Post
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonCabcel} onPress={onBackdropPress}>
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          Cancelar
        </Text>
      </TouchableOpacity>
    </Overlay>
  );
}
