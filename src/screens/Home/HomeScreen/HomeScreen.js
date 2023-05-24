import React from "react";
import { View, Text } from "react-native";
import { ButtonNewPost } from "../../../components";
import { Post } from "../../../components/Posts";

export function HomeScreen() {
  const dataPost = {
    nicknameUser: "nameUser",
    nameUser: "nameUser",
    postContent:
      "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    image: "",
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>HomeScreen</Text>
      <Post dataPost={dataPost} />
      <ButtonNewPost />
    </View>
  );
}
