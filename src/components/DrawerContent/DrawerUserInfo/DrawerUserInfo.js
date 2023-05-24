import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { styles } from "./DrawerUserInfo.styles";

export function DrawerUserInfo() {
  return (
    <View style={styles.content}>
      <Avatar
        rounded
        source={require("../../../../assets/icons/default_user_photo.png")}
        containerStyle={styles.avatar}
        overlayContainerStyle={styles.avatarOverlay}
      />
      <Text style={styles.userName}>UserName</Text>
      <Text style={styles.mentionUserName}>@UserName</Text>
      <View style={styles.containerInfo}>
        <View style={styles.containerFollowers}>
          <Text style={styles.infoCount}>852</Text>
          <Text style={styles.infoTitle}>Followers</Text>
        </View>
        <View style={styles.containerFollowing}>
          <Text style={styles.infoCount}>496</Text>
          <Text style={styles.infoTitle}>Following</Text>
        </View>
      </View>
    </View>
  );
}
