import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Avatar, Icon } from "react-native-elements";
import { styles } from "./DrawerUserInfo.styles";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { UserContext } from "../../../context";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";

export function DrawerUserInfo() {
  const { currentUser } = useContext(UserContext);
  const thema = useThemaContext();
  const navigation = useNavigation();
  return (
    <View style={styles.content}>
      {currentUser.photoProfile_url ? (
        <Avatar
          rounded
          source={{ uri: currentUser.photoProfile_url }}
          containerStyle={styles.avatar}
          overlayContainerStyle={styles.avatarOverlay}
        />
      ) : (
        <View style={{ marginTop: 30 }}>
          <Icon
            type="material-community"
            name="pencil-box"
            color={color.light.corporate}
            containerStyle={{
              position: "absolute",
              alignSelf: "flex-end",
              paddingHorizontal: 10,
            }}
            onPress={() =>
              navigation.navigate(screen.account.account, {
                screen: screen.account.editProfile,
                params: { user_id: currentUser?.id },
              })
            }
            size={28}
          />
          <Avatar
            rounded
            source={require("../../../../assets/icons/default_user_photo.png")}
            containerStyle={styles.avatar}
            overlayContainerStyle={styles.avatarOverlay}
          />
        </View>
      )}
      <Text
        style={[
          styles.userName,
          { color: thema ? color.light.text : color.dark.text },
        ]}
      >
        {currentUser?.nickname ? currentUser.nickname : currentUser.username}
      </Text>
      <Text
        style={[
          styles.mentionUserName,
          {
            color: thema ? color.light.textSecondary : color.dark.textSecondary,
          },
        ]}
      >
        {currentUser ? "@" + currentUser.username : "@userName"}
      </Text>
      {/* <View style={styles.containerInfo}>
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
      </View> */}
    </View>
  );
}
