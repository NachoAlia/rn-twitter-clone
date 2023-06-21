import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { styles } from "./DrawerUserInfo.styles";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { UserContext } from "../../../context";
export function DrawerUserInfo() {
  const { currentUser } = useContext(UserContext);
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
        {currentUser.username}
      </Text>
      <Text
        style={[
          styles.mentionUserName,
          {
            color: thema ? color.light.textSecondary : color.dark.textSecondary,
          },
        ]}
      >
        {currentUser.email}
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
