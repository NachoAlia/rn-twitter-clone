import React from "react";
import { View, Text, Dimensions } from "react-native";
import { styles } from "./Repost.style";
import { ImageAuto, color, timePost } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";
import { Avatar } from "react-native-elements";

export function Repost({ dataPost }) {
  const thema = useThemaContext();

  return (
    <View style={styles.container}>
      <View style={styles.postTitle}>
        <Avatar
          source={
            dataPost.photoProfile_url
              ? { uri: dataPost.photoProfile_url }
              : require("../../../../../assets/icons/default_user_photo.png")
          }
          size="small"
          rounded
        />

        <Text
          style={[
            styles.nicknameUser,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {dataPost.nickname}
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
          {timePost(dataPost.created_at)}
        </Text>
      </View>
      <View style={styles.containerInfo}>
        {dataPost.body ? (
          <Text
            style={[
              styles.text,
              { color: thema ? color.light.text : color.dark.text },
            ]}
          >
            {dataPost.body}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.image}>
        {dataPost.photoTweet_url ? (
          <ImageAuto
            uri={dataPost.photoTweet_url}
            desiredWidth={Dimensions.get("screen").width * 0.6}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
}
