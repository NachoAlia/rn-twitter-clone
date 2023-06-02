import React from "react";
import { View, Dimensions } from "react-native";
import { Avatar, Button, Image, Text } from "react-native-elements";
import { styles } from "./Post.style";
import { color, ImageAuto, timePost } from "../../../utils";
import { PostButtonBar } from "./PostButtonBar";
import { Repost } from "./Repost";

export function Post({ dataPost }) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.photoUser}>
          <Avatar
            source={require("../../../../assets/icons/default_user_photo.png")}
            size="medium"
            rounded
          />
        </View>
        <View style={styles.containerData}>
          {dataPost.thread ? <View style={styles.threadBar} /> : <></>}
          <View style={styles.title}>
            <View style={styles.postTitle}>
              <Text style={styles.nicknameUser}>{dataPost.nicknameUser}</Text>
              <Text style={styles.nameUser}>@{dataPost.nameUser}</Text>
            </View>
            <Text style={styles.titleDate}>{timePost(dataPost.createdAt)}</Text>
          </View>

          <View style={styles.containerInfo}>
            <Text style={styles.text}>{dataPost.postBody}</Text>
            {dataPost.image ? (
              <View style={styles.imagePost}>
                <ImageAuto
                  uri={dataPost.image}
                  desiredWidth={Dimensions.get("window").width * 0.75}
                />
              </View>
            ) : (
              <></>
            )}
            {dataPost.repost ? <Repost dataPost={dataPost.repost} /> : <></>}

            <PostButtonBar />
          </View>
        </View>
      </View>
      {dataPost.thread ? (
        <View style={styles.threadStyle}>
          <View style={styles.threadUser}>
            <Avatar
              source={require("../../../../assets/icons/default_user_photo.png")}
              size="small"
              rounded
            />
          </View>
          <Text style={styles.threadText}>Mostrar este hilo</Text>
        </View>
      ) : (
        <></>
      )}
      <View style={styles.spreaderBar} />
    </>
  );
}
