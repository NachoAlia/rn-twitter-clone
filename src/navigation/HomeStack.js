import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home";
import { NewPostScreen } from "../screens/Post";
import { screen } from "../utils";
const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: false }}
    >
      <Stack.Screen
        name={screen.home.home}
        component={HomeScreen}
        options={{
          title: "Inicio",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.home.newPost}
        component={NewPostScreen}
        options={{
          title: "Nueva Publicación",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
