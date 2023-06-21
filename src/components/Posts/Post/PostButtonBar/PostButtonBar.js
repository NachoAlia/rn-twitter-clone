import React, { useState } from "react";
import { View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PostButtonBar.style";
import { IconsButton, color, screen } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";

export function PostButtonBar({ dataPost }) {
  const [isLike, setIsLike] = useState(false);

  const navigation = useNavigation();

  const thema = useThemaContext();

  const addComment = () => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.addComment,
      params: { dataPost },
    });
  };

  const giveLike = () => {
    setIsLike(true);
  };

  const removeLike = () => {
    setIsLike(false);
  };

  return (
    <View style={styles.barPost}>
      <View style={styles.barElement}>
        <IconsButton name={"comment"} onPress={addComment} />
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
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"repost"} />
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
      </View>
      <View style={styles.barElement}>
        {isLike ? (
          <IconsButton name={"like"} onPress={removeLike} />
        ) : (
          <IconsButton name={"like_border"} onPress={giveLike} />
        )}

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
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"share"} />
      </View>
    </View>
  );
}
