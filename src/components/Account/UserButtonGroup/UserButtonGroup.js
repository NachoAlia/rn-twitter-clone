import React, { useState } from "react";
import { View } from "react-native";
import { ButtonGroup, Text } from "react-native-elements";
import { styles } from "./UserButtonGroup.styles";

import { UserPosts } from "../UserPosts";
import { UserLikes } from "../UserLikes/UserLikes";
import { UserMedia } from "../UserMedia/UserMedia";
import { UserReplies } from "../UserReplies/UserReplies";

import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function UserButtonGroup() {
  const thema = useThemaContext();

  const [index, setIndex] = useState(0);
  const buttons = ["Post", "Replies", "Media", "Likes"];

  const updateIndex = (index) => {
    setIndex(index);
  };

  return (
    <View
      style={[
        styles.content,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={index}
        buttons={buttons}
        containerStyle={[
          styles.containerStyle,
          {
            borderBottomColor: thema
              ? color.light.background
              : color.dark.background,
          },
        ]}
        innerBorderStyle={styles.innerBorderStyle}
        selectedButtonStyle={styles.selectedButtonStyle}
        selectedTextStyle={styles.selectedTextStyle}
        disabledSelectedStyle={styles.disabledSelectedStyle}
      />
      {index == 0 && <UserPosts />}
      {index == 1 && <UserReplies />}
      {index == 2 && <UserMedia />}
      {index == 3 && <UserLikes />}
    </View>
  );
}
