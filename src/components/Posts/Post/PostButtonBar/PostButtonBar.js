import React, { useState } from "react";
import { View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PostButtonBar.style";
import { IconsButton, color, screen } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";

export function PostButtonBar({ dataPost, amount = true, size = 20 }) {
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const navigation = useNavigation();

  const thema = useThemaContext();

  const addComment = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.addComment,
      params: { dataPost },
    });
  };

  const giveLike = () => {
    setIsLike(true);
  };

  const removeLike = () => {
    setIsLike(false);
  };

  const giveBookmark = () => {
    setIsBookmark(true);
  };

  const removeBookmark = () => {
    setIsBookmark(false);
  };
  return (
    <View style={styles.barPost}>
      <View style={styles.barElement}>
        <IconsButton name={"comment"} size={size} onPress={addComment} />
        {amount ? (
          <Text
            style={[
              styles.text,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            {dataPost.comment.length}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"repost"} size={size} />
        {amount ? (
          <Text
            style={[
              styles.text,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            0
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.barElement}>
        {isLike ? (
          <IconsButton name={"like"} size={size} onPress={removeLike} />
        ) : (
          <IconsButton name={"like_border"} size={size} onPress={giveLike} />
        )}
        {amount ? (
          <Text
            style={[
              styles.text,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            0
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.barElement}>
        {isBookmark ? (
          <IconsButton name={"bookmark"} size={size} onPress={removeBookmark} />
        ) : (
          <IconsButton
            name={"bookmark_border"}
            size={size}
            onPress={giveBookmark}
          />
        )}
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"share"} size={size} />
      </View>
    </View>
  );
}
