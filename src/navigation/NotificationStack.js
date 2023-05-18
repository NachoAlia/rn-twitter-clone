import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NotificationsScreen } from "../screens/Notifications";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function NotificationStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.notifications.notifications}
        component={NotificationsScreen}
        options={{
          title: "Notificaciones",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
