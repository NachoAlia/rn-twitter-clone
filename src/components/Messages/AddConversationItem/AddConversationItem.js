import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

import { styles } from "./AddConversationItem.styles";
import { color, screen } from "../../../utils";

import { useThemaContext } from "../../ThemeProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { DrawerContext, TabBarContext, UserContext } from "../../../context";
import { domainUrl } from "../../../config/host";

export function AddConversationItem({ item }) {
  //item es user receiver
  const { setDrawerScreenOptions } = useContext(DrawerContext);
  const { setTabBarScreenOptions } = useContext(TabBarContext);
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderBottomColor: color.light.textSecondary },
      ]}
      onPress={async () => {
        setDrawerScreenOptions({ headerShown: false });
        setTabBarScreenOptions({ tabBarStyle: { display: "none" } });
        try {
          const response = await fetch(
            `${domainUrl}/users/${currentUser.id}/conversations/${item.id}/create`,
            {
              method: "POST",
            }
          );
          const conversation = await response.json();
          console.log(conversation);
          navigation.navigate(screen.messages.tab, {
            screen: screen.messages.concreteConversation,
            params: { conversation: conversation },
          });
        } catch (error) {
          console.error("Error al crear la conversación:", error);
        }
      }}
    >
      <Avatar
        size={"small"}
        source={
          item.photoProfile_url
            ? { uri: item.photoProfile_url }
            : require("../../../../assets/icons/default_user_photo.png")
        }
        rounded
        containerStyle={{ alignSelf: "center" }}
      />

      <View style={{ flexDirection: "column", marginLeft: 10 }}>
        <Text
          style={{
            color: thema ? color.light.text : color.dark.text,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {item.username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: color.light.textSecondary,
          }}
        >
          @{item.username + item.id}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
