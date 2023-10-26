import React, { useState } from "react";
import {
  View,
  Text,
  VirtualizedList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SearchInput } from "../SearchInput";
import {
  useHasMorePostsContext,
  useMorePostsContext,
  usePostsContext,
  useReloadPostContext,
  useReloadingContext,
  useSetToSearch,
} from "../../../context";
import { useThemaContext } from "../../ThemeProvider";
import { Post } from "../../Posts";
import { color } from "../../../utils";

export function SearchPosts() {
  const [refreshing, setRefreshing] = useState(false);

  const dataPosts = usePostsContext();
  const morePosts = useMorePostsContext();
  const reloading = useReloadingContext();
  const reloadPost = useReloadPostContext();
  const hasMorePosts = useHasMorePostsContext();

  const thema = useThemaContext();

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
    <>
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
      )}
    </>
  );
}
