import React, { useEffect, useState } from "react";
import { View, FlatList, VirtualizedList } from "react-native";
import {
  ButtonNewPost,
  HeaderNewPosts,
  SearchInput,
  SearchPosts,
  UserCard,
} from "../../../components";

import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

import { domainUrl } from "../../../config/host";
import { useSetToSearch } from "../../../context";

export function SearchScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [toSearchUsers, setToSearchUsers] = useState(null);
  const [toSearchPost, setToSearchPost] = useState(null);
  const [modeSearch, setModeSearch] = useState(true);
  const [listUsers, setListUsers] = useState(null);

  const thema = useThemaContext();

  useEffect(() => {
    fetchDataUser();
  }, [toSearchUsers]);

  const fetchDataUser = async () => {
    setRefreshing(true);

    await fetch(
      toSearchUsers
        ? `${domainUrl}/users/search_user?search=${toSearchUsers}`
        : `${domainUrl}/users/search_user`
    )
      .then((response) => response.json())
      .then((data) => {
        setListUsers(data);
      })
      .catch((error) => console.error(error));
    setRefreshing(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      {modeSearch ? (
        <>
          <SearchInput
            search={setToSearchPost}
            mode={modeSearch}
            changeMode={setModeSearch}
          />
          <SearchPosts search={toSearchPost} />
        </>
      ) : (
        <>
          <SearchInput
            search={setToSearchUsers}
            mode={modeSearch}
            changeMode={setModeSearch}
          />
          {listUsers && (
            <VirtualizedList
              data={listUsers}
              keyExtractor={(item) => item.id}
              getItemCount={() => listUsers.length}
              getItem={(data, index) => data[index]}
              renderItem={({ item }) => <UserCard data={item} />}
            />
          )}
        </>
      )}
      <ButtonNewPost />
      <HeaderNewPosts />
    </View>
  );
}
