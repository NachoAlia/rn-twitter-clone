import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ButtonNewPost } from "../../../components";
import { Post } from "../../../components/Posts";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { ListPosts } from "../../../config/api/Post/ListPosts";
import { domainUrl } from "../../../config/host";
import { FlatList } from "react-native-gesture-handler";
import { usePostsContext } from "../../../context";

export function HomeScreen() {
  const thema = useThemaContext();
  const dataPosts = usePostsContext();

  if (dataPosts) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <ScrollView>
          <FlatList
            data={dataPosts}
            renderItem={({ item }) => <Post dataPost={item} />}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        <ButtonNewPost />
      </View>
    );
  }
}
