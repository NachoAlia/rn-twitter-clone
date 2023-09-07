import React, { useState } from "react";
import {
  View,
  RefreshControl,
  ActivityIndicator,
  Text,
  VirtualizedList,
} from "react-native";
import { ButtonNewPost, HeaderNewPosts } from "../../../components";
import { Post } from "../../../components/Posts";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

import {
  useHasMorePostsContext,
  useMorePostsContext,
  usePostsContext,
  useReloadPostContext,
  useReloadingContext,
} from "../../../context";

export function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const thema = useThemaContext();

  const dataPosts = usePostsContext();
  const morePosts = useMorePostsContext();
  const reloading = useReloadingContext();
  const reloadPost = useReloadPostContext();
  const hasMorePosts = useHasMorePostsContext();

  const onRefresh = async () => {
    setRefreshing(true);
    await reloadPost();
    setRefreshing(false);
  };

  const loadMorePosts = async () => {
    if (!reloading)
      if (hasMorePosts) {
        await morePosts();
      }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      {dataPosts && (
        <VirtualizedList
          data={dataPosts}
          renderItem={({ item }) => <Post idPost={item.id} />}
          keyExtractor={(item) => item.id}
          getItemCount={() => dataPosts.length}
          getItem={(data, index) => data[index]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onEndReached={loadMorePosts}
          ListFooterComponent={() =>
            hasMorePosts ? (
              <View style={{ marginVertical: 20 }}>
                <ActivityIndicator size="large" color={color.light.corporate} />
              </View>
            ) : (
              <View>
                <Text>No hay mas Posts que mostar</Text>
              </View>
            )
          }
        />
      )}

      <ButtonNewPost />
      <HeaderNewPosts />
    </View>
  );
}
