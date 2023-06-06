import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./Repost.style";
import { ImageAuto, timePost } from "../../../../utils";

export function Repost({ dataPost }) {
  return (
    <View style={styles.container}>
      <View style={styles.postTitle}>
        <Text style={styles.nicknameUser}>{dataPost.nicknameUser}</Text>
        <Text style={styles.titleDate}>{timePost(dataPost.createdAt)}</Text>
      </View>
      <View style={styles.containerInfo}>
        <Text styles={styles.text}>{dataPost.postBody}</Text>
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
