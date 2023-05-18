import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessagesScreen } from "../screens/Messages";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function MessagesStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.messages.messages}
        component={MessagesScreen}
        options={{
          title: "Mensajes",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
