import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { NotificationsContext, UserContext } from "../../../context";
import { Avatar, Button } from "react-native-elements";
import { Item } from "../../../components/Notifications";
import { ScrollView } from "react-native-gesture-handler";
export function NotificationsScreen() {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const { notifications_from_user, shouldUpdateNotifications } =
    useContext(NotificationsContext);
  const [notifications, setNotifications] = useState(null);
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    notifications_from_user(currentUser.id)
      .then((result) => {
        setNotifications(result);
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [shouldUpdateNotifications, refresh]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",

        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      <View
        style={{
          paddingVertical: 10,
          paddingHorizontal: 10,
          alignSelf: "flex-end",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "500",
            textDecorationLine: "underline",
            color: color.light.corporate,
          }}
          onPress={() => setRefresh(true)}
        >
          Marcar como leidas
        </Text>
      </View>
      {notifications?.map((notification) => (
        <Item notification={notification} />
      ))}
    </View>
  );
}
