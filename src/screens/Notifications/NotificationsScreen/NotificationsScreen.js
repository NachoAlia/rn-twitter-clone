import React, { useContext, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import {
  NotificationsContext,
  TabBarContext,
  UserContext,
} from "../../../context";
import { Avatar, Button } from "react-native-elements";
import { Item } from "../../../components/Notifications";
import { ScrollView } from "react-native-gesture-handler";
import { useFocusEffect } from "@react-navigation/native";
export function NotificationsScreen() {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const { notifications_from_user, shouldUpdateNotifications } =
    useContext(NotificationsContext);
  const { newNotifications, setNewNotifications } = useContext(TabBarContext);
  const [notifications, setNotifications] = useState(null);

  useFocusEffect(() => {
    setNewNotifications(false);
  });

  useEffect(() => {
    notifications_from_user(currentUser.id)
      .then((result) => {
        setNotifications(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [shouldUpdateNotifications]);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",

          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
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
          <Item notification={notification} key={notification.id} />
        ))}
      </View>
    </ScrollView>
  );
}
