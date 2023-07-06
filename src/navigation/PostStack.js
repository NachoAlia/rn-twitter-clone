import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddCommentScreen, NewPostScreen, PostScreen } from "../screens/Post";
import { screen } from "../utils";
import { ImageScreen } from "../screens/Post/ImageScreen";
const Stack = createNativeStackNavigator();

export function PostStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: true }}
    >
      <Stack.Screen
        name={screen.post.post}
        component={PostScreen}
        options={{
          title: "Publicación",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name={screen.post.image}
        component={ImageScreen}
        options={{
          title: "Imagen",
        }}
      />
      <Stack.Screen
        name={screen.post.newPost}
        component={NewPostScreen}
        options={{
          title: "Nueva Publicación",
        }}
      />
      <Stack.Screen
        name={screen.post.addComment}
        component={AddCommentScreen}
        options={{
          title: "Nueva Comentario",
        }}
      />
    </Stack.Navigator>
  );
}
