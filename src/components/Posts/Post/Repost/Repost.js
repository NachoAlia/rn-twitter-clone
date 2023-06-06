import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./Repost.style";
import { ImageAuto, color, timePost } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";

export function Repost({ dataPost }) {
  const thema = useThemaContext();

  return (
    <View style={styles.container}>
      <View style={styles.postTitle}>
        <Text
          style={[
            styles.nicknameUser,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {dataPost.nicknameUser}
        </Text>
        <Text
          style={[
            styles.titleDate,
            {
              color: thema
                ? color.light.textSecondary
                : color.dark.textSecondary,
            },
          ]}
        >
          {timePost(dataPost.createdAt)}
        </Text>
      </View>
      <View style={styles.containerInfo}>
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {dataPost.postBody}
        </Text>
      </View>
      <View style={styles.image}>
        {dataPost.image ? (
          <ImageAuto
            uri={dataPost.image}
            desiredWidth={Dimensions.get("screen").width * 0.6}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
