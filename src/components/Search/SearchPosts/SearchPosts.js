import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  VirtualizedList,
  ActivityIndicator,
  RefreshControl,
  FlatList,
} from "react-native";

import { useThemaContext } from "../../ThemeProvider";
import { Post } from "../../Posts";
import { color } from "../../../utils";
import { domainUrl } from "../../../config/host";

export function SearchPosts({ search = null }) {
  const [reload, setReload] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [reloading, setReloading] = useState(true);
  const [dataPosts, setDataPosts] = useState(null);
  const [lastPostId, setLastPostId] = useState(null);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const thema = useThemaContext();

  useEffect(() => {
    setHasMorePosts(true);
    fetchData();
  }, [search, reload]);

  const fetchData = async () => {
    setReloading(true);

    await fetch(
      search ? `${domainUrl}/tweets?search=${search}` : `${domainUrl}/tweets`
    )
      .then((response) => response.json())
      .then((data) => {
        setDataPosts(data);
        setLastPostId(data[data.length - 1].id);
      })
      .then(setReloading(false))
      .catch((error) => console.error(error));
  };

  const fetchMorePots = async () => {
    await fetch(
      search
        ? `${domainUrl}/tweets?search=${search}&last_tweet_id=${lastPostId}`
        : `${domainUrl}/tweets?last_tweet_id=${lastPostId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 1) {
          setHasMorePosts(false);
        } else {
          setDataPosts((prevData) => [...prevData, ...data]);
          setLastPostId(data[data.length - 1].id);
        }
      })
      .then(setReloading(false))
      .catch((error) => console.error(error));
  };

  const loadMorePosts = () => {
    if (!reloading)
      if (hasMorePosts)
        if (lastPostId != 0) {
          setReloading(true);
          fetchMorePots();
        }
  };

  const onReloadPosts = () => {
    setRefreshing(true);
    setReload((prevState) => !prevState);
    setRefreshing(false);
  };

  return (
    <>
      {reloading ? (
        <ActivityIndicator size="large" color={color.light.corporate} />
      ) : (
        <>
          {dataPosts && (
            <VirtualizedList
              data={dataPosts}
              renderItem={({ item }) => <Post idPost={item.id} />}
              keyExtractor={(item) => item.id}
              getItemCount={() => dataPosts.length}
              getItem={(data, index) => data[index]}
              onEndReached={loadMorePosts}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onReloadPosts}
                />
              }
              ListFooterComponent={() =>
                hasMorePosts ? (
                  <View style={{ marginVertical: 20 }}>
                    <ActivityIndicator
                      size="large"
                      color={color.light.corporate}
                    />
                  </View>
                ) : (
                  <View style={{ marginVertical: 20 }}>
                    <Text
                      style={{
                        alignSelf: "center",
                        fontSize: 16,
                        color: thema
                          ? color.light.contrast
                          : color.dark.contrast,
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
      )}
    </>
  );
}
