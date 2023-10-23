import React, { useContext, useState, useEffect } from "react";
import { View, Button, ActivityIndicator } from "react-native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { NotificationsContext, UserContext } from "../../../context";

import { Item } from "../../../components/Notifications";
import { ScrollView } from "react-native-gesture-handler";
import * as Notifications from "expo-notifications";

export function NotificationsScreen() {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const { notifications, newNotifications, mark_all_as_read_notification } =
    useContext(NotificationsContext);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  useEffect(() => {
    const triggerNotifications = async () => {
      const getNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.warn("Permiso de notificación no concedido");
        }
      };

      await getNotificationPermission();

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Owl",
          body: "Tienes notificaciones sin leer en la aplicacion",
          color: color.light.corporate,
          sticky: false,
        },
        trigger: {
          seconds: 3,
        },
      });
    };

    if (newNotifications) {
      triggerNotifications();
    }
  }, [newNotifications]);

  const hasUnread = () => {
    return notifications.some((notification) => notification.status === 0);
  };
  const handle_mark_all_as_read_notification = () => {
    setLoading(true);
    mark_all_as_read_notification().then(() => {
      setLoading(false);
    });
  };
  return (
    <>
      {hasUnread() && !loading && (
        <Button
          title="Marcar como leidas"
          color={color.light.corporate}
          onPress={handle_mark_all_as_read_notification}
        />
      )}
      {loading && (
        <ActivityIndicator
          size="large"
          color={thema ? color.light.corporate : color.dark.corporate}
        />
      )}
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
          {notifications?.map((notification) => (
            <Item notification={notification} key={notification?.id} />
          ))}
        </View>
      </ScrollView>
    </>
  );
}
