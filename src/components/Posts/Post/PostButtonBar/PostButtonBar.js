import React, { useState } from "react";
import { View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useNavigationBuilder } from "@react-navigation/native";
import { styles } from "./PostButtonBar.style";
import { IconsButton } from "../../../../utils";

export function PostButtonBar({ id, comment }) {
  const [isLike, setIsLike] = useState(false);

  return (
    <View style={styles.barPost}>
      <View style={styles.barElement}>
        <IconsButton name={"comment"} />
        <Text style={styles.text}>{comment.length}</Text>
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"repost"} />
        <Text style={styles.text}>0</Text>
      </View>
      <View style={styles.barElement}>
        {isLike ? (
          <IconsButton name={"like"} />
        ) : (
          <IconsButton name={"like_border"} />
        )}

        <Text style={styles.text}>0</Text>
      </View>
      <View style={styles.barElement}>
        <IconsButton name={"share"} />
      </View>
    </View>
  );
}
