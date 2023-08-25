import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PostScreen } from "../screens/Post";
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.post.post}
        component={PostScreen}
        options={{
          title: "Publicación",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
