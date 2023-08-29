import React, { useState } from "react";
import {
  View,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ButtonNewPost } from "../../../components";
import { Post } from "../../../components/Posts";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

import {
  useMorePostsContext,
  usePostsContext,
  usereloadPostContext,
} from "../../../context";

export function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const thema = useThemaContext();
  const dataPosts = usePostsContext();
  const morePosts = useMorePostsContext();
  const reloadpost = usereloadPostContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadpost();
    setRefreshing(false);
  };

  const loadMorePosts = async () => {
    setLoading(true);
    await morePosts().then(setLoading(false));
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
          onEndReached={loadMorePosts}
          ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
        />
      )}
      <ButtonNewPost />
    </View>
  );
}
