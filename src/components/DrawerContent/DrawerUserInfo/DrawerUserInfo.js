import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { styles } from "./DrawerUserInfo.styles";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function DrawerUserInfo() {
  const thema = useThemaContext();

  return (
    <View style={styles.content}>
      <Avatar
        rounded
        source={require("../../../../assets/icons/default_user_photo.png")}
        containerStyle={styles.avatar}
        overlayContainerStyle={styles.avatarOverlay}
      />
      <Text
        style={[
          styles.userName,
          { color: thema ? color.light.text : color.dark.text },
        ]}
      >
        UserName
      </Text>
      <Text
        style={[
          styles.mentionUserName,
          {
            color: thema ? color.light.textSecondary : color.dark.textSecondary,
          },
        ]}
      >
        @UserName
      </Text>
      <View style={styles.containerInfo}>
        <View style={styles.containerFollowers}>
          <Text
            style={[
              styles.infoCount,
              { color: thema ? color.light.text : color.dark.text },
            ]}
          >
            852
          </Text>
          <Text
            style={[
              styles.infoTitle,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            Followers
          </Text>
        </View>
        <View style={styles.containerFollowing}>
          <Text
            style={[
              styles.infoCount,
              { color: thema ? color.light.text : color.dark.text },
            ]}
          >
            496
          </Text>
          <Text
            style={[
              styles.infoTitle,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            Following
          </Text>
        </View>
      </View>
    </View>
  );
}
