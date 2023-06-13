import React from "react";
import { View, Text, ScrollView } from "react-native";
import { ButtonNewPost } from "../../../components";
import { Post } from "../../../components/Posts";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

export function HomeScreen() {
  const thema = useThemaContext();

  const dataPost = [
    {
      nicknameUser: "nameUser",
      nameUser: "nameUser",
      postBody:
        "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "https://loganstore.com.mx/wp-content/uploads/2022/11/EXIA-4.jpg",
      thread: true,
      createdAt: "2023-05-30T01:58:47.525Z",
      repost: {},
      comment: [
        {
          nicknameUser: "nameUser",
          commentBody:
            "lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          nicknameUser: "nameUser",
          commentBody:
            "lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          nicknameUser: "nameUser",
          commentBody:
            "lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
      ],
    },
    {
      nicknameUser: "nameUser",
      nameUser: "nameUser",
      postBody:
        "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image:
        "https://cdn.akamai.steamstatic.com/steam/apps/1816670/ss_8b402582ed8110387d04e0b7f8260c985d108dd0.1920x1080.jpg?t=1681367471",
      thread: false,
      createdAt: "2023-05-30T01:58:47.525Z",
      repost: {
        nicknameUser: "nameUser",
        postBody:
          "lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        image: "",
        createdAt: "2023-05-30T01:58:47.525Z",
      },
      comment: [],
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      <ScrollView>
        <Post dataPost={dataPost[0]} />
        <Post dataPost={dataPost[1]} />
      </ScrollView>
      <ButtonNewPost />
    </View>
  );
}
