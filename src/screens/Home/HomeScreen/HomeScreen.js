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
<<<<<<< HEAD
  const morePosts = useMorePostsContext();
  const reloadpost = usereloadPostContext();
=======
  const reloadPost = usereloadPostContext();
>>>>>>> abf6b4864f5879a6aec4c0e2fafc11aba7ec1e6c

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadPost();
    setRefreshing(false);
  };

<<<<<<< HEAD
  const loadMorePosts = async () => {
    setLoading(true);
    await morePosts().then(setLoading(false));
  };
=======
>>>>>>> abf6b4864f5879a6aec4c0e2fafc11aba7ec1e6c
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
