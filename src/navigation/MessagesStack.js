import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MessagesScreen } from "../screens/Messages";
import { screen } from "../utils";
import { AddConversationScreen, ConversationScreen } from "../screens/Messages";
import { DirectMessagesProvider } from "../context";
const Stack = createNativeStackNavigator();

export function MessagesStack() {
  return (
    <DirectMessagesProvider>
      <Stack.Navigator
        screenOptions={{
          headerBackButtonMenuEnabled: false,
          headerShown: false,
        }}
      >
        <Stack.Screen
          name={screen.messages.messages}
          component={MessagesScreen}
          options={{
            title: "Mensajes",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name={screen.messages.newConversation}
          component={AddConversationScreen}
          options={{
            title: "Mensaje directo",
            headerTitleAlign: "left",
            headerShown: true,
          }}
        />
        <Stack.Screen
          name={screen.messages.concreteConversation}
          component={ConversationScreen}
          options={{
            title: "Chat",
            headerTitleAlign: "left",
            headerShown: true,
          }}
        />
      </Stack.Navigator>
    </DirectMessagesProvider>
  );
}
