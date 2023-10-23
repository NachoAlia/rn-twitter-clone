import React, { useContext } from "react";
import { View, Text } from "react-native";
import { UserContext } from "../../../context";
import { Post } from "../../Posts";
import { ScrollView } from "react-native-gesture-handler";

import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function BookmarkList() {
  const thema = useThemaContext();
  const { user_bookmark } = useContext(UserContext);

  return (
    <View>
      {user_bookmark.bookmarks.length > 0 ? (
        user_bookmark.bookmarks?.map((post) => (
          <Post idPost={post?.tweet_id} key={post?.tweet_id} />
        ))
      ) : (
        <Text
          style={{
            marginTop: 300,
            alignSelf: "center",
            color: thema ? color.light.text : color.dark.text,
          }}
        >
          No hay posts disponibles
        </Text>
      )}
    </View>
  );
}
