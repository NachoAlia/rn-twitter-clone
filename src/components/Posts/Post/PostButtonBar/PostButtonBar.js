import React from "react";
import { View } from "react-native";
import { Button, Image } from "react-native-elements";
import { styles } from "./PostButtonBar.style";
import { IconsButton } from "../../../../utils";

export function PostButtonBar() {
  return (
    <View style={styles.barPost}>
      <IconsButton name={"comment"} />
      <IconsButton name={"repost"} />
      <IconsButton name={"like_border"} />
      <IconsButton name={"share"} />
    </View>
  );
}
