import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { ButtonNewPost } from "../../../components";
import { Post } from "../../../components/Posts";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { ListPosts } from "../../../config/api/Post/ListPosts";
import { domainUrl } from "../../../config/host";
import { FlatList } from "react-native-gesture-handler";
import { usePostsContext, usereloadPostContext } from "../../../context";

export function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const thema = useThemaContext();
  const dataPosts = usePostsContext();
  const reloadpost = usereloadPostContext();

  const onRefresh = () => {
    setRefreshing(true);
    reloadpost();
    setRefreshing(false);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      {dataPosts && (
        <FlatList
          data={dataPosts}
          renderItem={({ item }) => <Post idPost={item.id} />}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <ButtonNewPost />
    </View>
  );
}
