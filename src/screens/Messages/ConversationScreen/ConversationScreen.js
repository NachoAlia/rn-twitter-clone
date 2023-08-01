import React, { useContext, useEffect, useState } from "react";
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
  const { drawerScreenOptions, setDrawerScreenOptions } =
    useContext(DrawerContext);
  const { tabBarScreenOptions, setTabBarScreenOptions } =
    useContext(TabBarContext);

  useEffect(() => {
    // const updatedDrawerOptions = {
    //   ...drawerScreenOptions,
    //   headerShown: true,
    //   headerLeft: () => (
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         alignItems: "center",
    //       }}
    //     >
    //       <TouchableOpacity
    //         style={{ marginLeft: 20 }}
    //         onPress={() => navigation.navigate(screen.messages.newConversation)}
    //       >
    //         <Icon
    //           type="material-community"
    //           name="arrow-left"
    //           size={25}
    //           color={thema ? color.light.text : color.dark.text}
    //         />
    //       </TouchableOpacity>
    //       <Avatar
    //         source={
    //           item.photoProfile_url
    //             ? { uri: item.photoProfile_url }
    //             : require("../../../../assets/icons/default_user_photo.png")
    //         }
    //         rounded
    //         size={"small"}
    //         containerStyle={{ marginLeft: 15 }}
    //       />
    //     </View>
    //   ),
    //   title: item.username,
    //   headerTitleAlign: "left",
    //   headerTitleStyle: { marginLeft: -5 },
    //   headerTintColor: thema ? color.light.text : color.dark.text,
    //   swipeEnabled: false,
    // };
    //if (drawerScreenOptions) {
    setDrawerScreenOptions({ headerShown: false });
    //}

    //const updatedTabBarOptions = {
    //  tabBarStyle: { display: "none" },
    // };

    return () => {
      navigation.setOptions(null);
    };
  }, [thema]);
  navigation.setOptions({
    title: item.username,
    headerLeft: () => <Icon name="at" type="material-community" />,
    tabBarStyle: { display: "none" },
  });
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
