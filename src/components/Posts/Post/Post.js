import React from "react";
import { View, Text } from "react-native";
import { Avatar, Button, Image } from "react-native-elements";
import { styles } from "./Post.style";

export function Post({ dataPost }) {
  return (
    <View style={styles.container}>
      <View style={styles.photoUser}>
        <Avatar
          source={require("../../../../assets/icons/default_user_photo.png")}
          size="large"
          rounded
        />
      </View>
      <View style={styles.containerData}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.nicknameUser}>{dataPost.nicknameUser}</Text>
          <Text style={styles.nameUser}>@{dataPost.nameUser}</Text>
        </View>

        <View style={styles.containerInfo}>
          <Text style={styles.text}>{dataPost.postContent}</Text>
          {dataPost.image ? <Image source={{ uri: dataPost.image }} /> : <></>}
          <View style={{ flexDirection: "row" }}>
            <Button />
            <Button />
            <Button />
            <Button />
          </View>
        </View>
      </View>
    </View>
  );
}
