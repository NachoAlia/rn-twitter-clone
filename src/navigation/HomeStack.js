import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/Home";
import { AddCommentScreen, NewPostScreen, PostScreen } from "../screens/Post";
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
        name={screen.home.post}
        component={PostScreen}
        options={{
          title: "Publicación",
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
      <Stack.Screen
        name={screen.home.addComment}
        component={AddCommentScreen}
        options={{
          title: "Nueva Comentario",
          headerTitleAlign: "center",
        }}
      />
    </Stack.Navigator>
  );
}
