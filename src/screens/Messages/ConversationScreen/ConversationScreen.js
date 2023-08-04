import React, { useContext, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Icon, Input } from "react-native-elements";
import { DrawerContext, TabBarContext } from "../../../context";
import { useThemaContext } from "../../../components/ThemeProvider";
import { IconsButton, color, screen } from "../../../utils";
import { Button } from "react-native-elements";
import { MessagesList } from "../../../components/Messages/MessagesList/MessagesList";
import { SendMessageForm } from "../../../components/Messages";

export function ConversationScreen() {
  const { conversation } = useRoute().params;
  const item = conversation.user_receiver;
  const navigation = useNavigation();
  const thema = useThemaContext();
  const { setDrawerScreenOptions } = useContext(DrawerContext);

  const [shoulHideDrawerHeader, setShoulHideDrawerHeader] = useState(false);
  const headerLeftComponent = () => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate(screen.messages.messages)}
      >
        <Icon
          type="material-community"
          name="arrow-left"
          size={25}
          color={thema ? color.light.text : color.dark.text}
        />
      </TouchableOpacity>
      <Avatar
        source={
          item.photo_profile_url
            ? { uri: item.photo_profile_url }
            : require("../../../../assets/icons/default_user_photo.png")
        }
        rounded
        size={"small"}
        containerStyle={{ marginHorizontal: 15 }}
      />
    </View>
  );
  useLayoutEffect(() => {
    if (!shoulHideDrawerHeader) {
      setDrawerScreenOptions({ headerShown: false });
      navigation.setOptions({
        title: item.username,
        headerLeft: headerLeftComponent,
        title: item.username,
        headerTitleAlign: "left",
        headerTitleStyle: { marginLeft: 15, fontSize: 14 },
        headerTintColor: thema ? color.light.text : color.dark.text,
        swipeEnabled: false,

        tabBarStyle: { display: "none" },
      });
      setShoulHideDrawerHeader(true);
    }

    return () => {
      setDrawerScreenOptions({ headerShown: false });
      setShoulHideDrawerHeader(true);
      navigation.setOptions({
        title: item.username,
        headerLeft: headerLeftComponent,
        title: item.username,
        headerTitleAlign: "left",
        headerTitleStyle: { fontSize: 18 },
        headerTintColor: thema ? color.light.text : color.dark.text,
        swipeEnabled: false,
        headerStyle: {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
        tabBarStyle: { display: "none" },
      });
    };
  }, [thema, shoulHideDrawerHeader]);

  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        flex: 1,
      }}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <MessagesList userReceiver={item} conversation={conversation} />
      </View>

      <SendMessageForm userReceiver={item} conversation={conversation} />
    </View>
  );
}
