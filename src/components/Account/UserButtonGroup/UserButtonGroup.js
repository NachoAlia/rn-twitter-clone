import React, { useState } from "react";
import { View } from "react-native";
import { ButtonGroup, Text } from "react-native-elements";
import { styles } from "./UserButtonGroup.styles";

import { UserPosts } from "../UserPosts";
import { UserLikes } from "../UserLikes/UserLikes";
import { UserMedia } from "../UserMedia/UserMedia";
import { UserReplies } from "../UserReplies/UserReplies";

export function UserButtonGroup() {
  const [index, setIndex] = useState(0);
  const buttons = ["Post", "Replies", "Media", "Likes"];

  const updateIndex = (index) => {
    setIndex(index);
  };

  return (
    <View style={styles.content}>
      <ButtonGroup
        onPress={updateIndex}
        selectedIndex={index}
        buttons={buttons}
        containerStyle={styles.containerStyle}
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
