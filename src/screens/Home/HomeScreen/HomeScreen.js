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
  useHasMorePostsFriendsContext,
  useMorePostsFriendsContext,
  usePostsFriendsContext,
  useReloadPostFriendsContext,
  useReloadingFriendsContext,
} from "../../../context";

export function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const thema = useThemaContext();

  const dataPosts = usePostsFriendsContext();
  const morePosts = useMorePostsFriendsContext();
  const reloading = useReloadingFriendsContext();
  const reloadPost = useReloadPostFriendsContext();
  const hasMorePosts = useHasMorePostsFriendsContext();

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
      {dataPosts ? (
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
              <View style={{ marginVertical: 20 }}>
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 16,
                    color: thema ? color.light.contrast : color.dark.contrast,
                  }}
                >
                  No hay mas posts que mostrar
                </Text>
              </View>
            )
          }
        />
      ) : (
        <View style={{ padding: 20 }}>
          <Text>
            Todavía no tienes amigos, has amistad con otro usuario y sus
            publicaciones te apareceran aqui
          </Text>
        </View>
      )}

      <ButtonNewPost />
      <HeaderNewPosts />
    </View>
  );
}
