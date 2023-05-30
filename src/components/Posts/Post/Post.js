import React from "react";
import { View, Dimensions } from "react-native";
import { Avatar, Button, Image, Text } from "react-native-elements";
import { styles } from "./Post.style";
import { color, ImageAuto } from "../../../utils";
import { PostButtonBar } from "./PostButtonBar";
import { Repost } from "./Repost";

export function Post({ dataPost }) {
  const timePost = () => {
    const months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    const createPost = new Date(dataPost.createdAt);
    const now = Date.now();
    const difference = (now - createPost.getTime()) / 1000;

    if (difference < 60)
      return (
        <Text style={styles.titleDate}>- {Math.floor(difference)} seg</Text>
      );
    if (difference >= 60 && difference < 3600)
      return (
        <Text style={{ color: color.light.textSecondary }}>
          - {Math.floor(difference / 60)} min
        </Text>
      );
    if (difference >= 3600 && difference < 86400)
      return (
        <Text style={styles.titleDate}>
          - {Math.floor(difference / 3600)} h
        </Text>
      );
    if (difference >= 86400)
      return (
        <Text style={styles.titleDate}>
          - {createPost.getDate()} {months[createPost.getMonth()]}
          {createPost.getFullYear()}
        </Text>
      );
  };
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
          <View style={styles.postTitle}>
            <Text style={styles.nicknameUser}>{dataPost.nicknameUser}</Text>
            <Text style={styles.nameUser}>@{dataPost.nameUser}</Text>
            {timePost()}
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
