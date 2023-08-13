import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { color, screen } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";
import { DrawerContext, TabBarContext, UserContext } from "../../../context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Modal } from "../../Shared/Modal/Modal";

export function Conversation(props) {
  const thema = useThemaContext();
  const { tabBarScreenOptions, setTabBarScreenOptions } =
    useContext(TabBarContext);
  const { drawerScreenOptions, setDrawerScreenOptions } =
    useContext(DrawerContext);
  const { chatbox, setShowOptions, setConversationIdOption } = props;
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();

  const conversationTimestamp = chatbox?.last_message_date
    ? new Date(chatbox?.last_message_date).toLocaleDateString("en-ES", {
        day: "2-digit",
        month: "short",
      })
    : null;

  const getUserConversation = () =>
    chatbox.user_receiver.id == currentUser.id
      ? chatbox.user_sender
      : chatbox.user_receiver;

  return (
    <TouchableOpacity
      onPress={() => {
        setDrawerScreenOptions({ ...drawerScreenOptions, headerShown: false });
        setTabBarScreenOptions({ tabBarStyle: { display: "none" } });
        navigation.navigate(screen.messages.tab, {
          screen: screen.messages.concreteConversation,
          params: { conversation: chatbox },
        });
      }}
      onLongPress={() => {
        setConversationIdOption(chatbox.id);
        setShowOptions(true);
      }}
      style={{
        flex: 1,
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "gray",
          padding: 10,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10, width: "90%" }}>
          <Avatar
            rounded
            size={"medium"}
            source={
              getUserConversation().photo_profile_url
                ? {
                    uri: getUserConversation().photo_profile_url,
                  }
                : require("../../../../assets/icons/default_user_photo.png")
            }
            avatarStyle={{
              borderWidth: 1.5,
              borderColor: color.light.corporate,
            }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: thema ? color.light.text : color.dark.text,
                  fontSize: 14,
                }}
              >
                {getUserConversation().username}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: thema
                    ? color.light.textSecondary
                    : color.dark.textSecondary,
                }}
              >
                {"@" + getUserConversation().username.slice(0, 10) + "..."}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 5, alignSelf: "flex-end" }}>
                  <Text
                    style={{
                      color: thema
                        ? color.light.textSecondary
                        : color.dark.textSecondary,
                      fontSize: 13,
                    }}
                  >
                    {conversationTimestamp}
                  </Text>
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
                fontSize: 15,
              }}
            >
              {chatbox.last_message?.length > 40
                ? chatbox.last_message.slice(0, 40) + "..."
                : chatbox.last_message}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
