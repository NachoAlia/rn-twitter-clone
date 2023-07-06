import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import {
  Avatar,
  Button,
  Text,
  Image,
  Icon,
  Tooltip,
} from "react-native-elements";
import { styles } from "./InfoUser.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

import { useThemaContext } from "../../ThemeProvider";
import { UserContext } from "../../../context/UserProvider";
import { color } from "../../../utils";
import { ScrollView } from "react-native-gesture-handler";

export function InfoUser() {
  const thema = useThemaContext();
  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);
  const createdAt = new Date(currentUser.created_at);
  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };
  return (
    <View style={styles.content}>
      <View style={styles.containerUserInfo}>
        <View style={styles.containerProfileCover}>
          {currentUser.photoCover_url ? (
            <Image
              source={{ uri: currentUser.photoCover_url }}
              style={{ width: "100%", height: 135, resizeMode: "cover" }}
            />
          ) : (
            <Image
              source={require("../../../../assets/icons/picture_not_found.png")}
              style={{ width: "100%", height: 135, resizeMode: "cover" }}
            />
          )}
        </View>
        <View
          style={[
            styles.profileUserInfo,
            {
              backgroundColor: thema
                ? color.light.background
                : color.dark.background,
            },
          ]}
        ></View>
      </View>
      <View style={styles.containerMediumHeader}>
        <View>
          {currentUser.photoProfile_url ? (
            <Avatar
              size="large"
              rounded
              containerStyle={styles.containerProfileAvatar}
              source={{ uri: currentUser.photoProfile_url }}
            />
          ) : (
            <Avatar
              size="large"
              rounded
              containerStyle={styles.containerProfileAvatar}
              source={require("../../../../assets/icons/default_user_photo.png")}
            />
          )}
          <Button
            title="edit profile"
            buttonStyle={styles.buttonEditProfile}
            containerStyle={styles.containerButtonEditProfile}
            titleStyle={styles.buttonEditProfileTitle}
            onPress={goToEditProfile}
          />
          <Text
            style={[
              styles.userName,
              {
                color: thema ? color.light.text : color.dark.text,
              },
            ]}
          >
            {currentUser ? currentUser.username : "UserName"}
          </Text>
          <Text
            style={[
              styles.mentionUserName,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            {currentUser ? `@${currentUser.username}` : "@UserName"}
          </Text>
          <ScrollView style={{ maxHeight: 70, marginBottom: 30 }}>
            <Text
              style={[
                styles.userBiography,
                {
                  color: thema ? color.light.text : color.dark.text,
                },
              ]}
            >
              {currentUser.biography ? currentUser.biography : ""}
            </Text>
          </ScrollView>

          <View
            style={[
              styles.infoUser,
              ,
              {
                backgroundColor: thema
                  ? color.light.background
                  : color.dark.background,
              },
            ]}
          >
            <View style={styles.userLocationContainer}>
              <Icon
                type="material-community"
                name="map-marker-outline"
                iconStyle={styles.userLocationIcon}
              />
              {currentUser.localization ? (
                <Tooltip
                  withOverlay={false}
                  popover={
                    <Text style={{ color: "#fff" }}>
                      {currentUser.localization}
                    </Text>
                  }
                  backgroundColor={color.light.corporate}
                >
                  <Text style={styles.userLocation}>Location</Text>
                </Tooltip>
              ) : (
                <Text style={styles.userLocation}>Location</Text>
              )}
            </View>
            <View style={styles.userWebSiteContainer}>
              <Icon
                type="material-community"
                name="link"
                iconStyle={styles.userWebSiteIcon}
              />

              {currentUser.website ? (
                <Tooltip
                  withOverlay={false}
                  popover={
                    <Text style={{ color: "#fff" }}>{currentUser.website}</Text>
                  }
                  backgroundColor={color.light.corporate}
                >
                  <Text style={styles.userWebsite}>Link/Website</Text>
                </Tooltip>
              ) : (
                <Text style={styles.userWebsite}>Link/Website</Text>
              )}
            </View>
            <View style={styles.userDateContainer}>
              <Icon
                type="material-community"
                name="calendar-blank-outline"
                iconStyle={styles.userDateIcon}
              />
              {createdAt && (
                <Tooltip
                  withOverlay={false}
                  popover={
                    <Text style={{ color: "#fff" }}>
                      {createdAt.toUTCString()}
                    </Text>
                  }
                  backgroundColor={color.light.corporate}
                >
                  <Text style={styles.userWebsite}>
                    Joined {createdAt.getMonth()}/{createdAt.getFullYear()}
                  </Text>
                </Tooltip>
              )}
            </View>
          </View>
          <View
            style={[
              styles.infoUser,
              ,
              {
                backgroundColor: thema
                  ? color.light.background
                  : color.dark.background,
              },
            ]}
          >
            <View style={styles.userTweetCountContainer}>
              <Text
                style={[
                  styles.userTweetCountNumber,
                  {
                    color: thema ? color.light.text : color.dark.text,
                  },
                ]}
              >
                1M
              </Text>
              <Text style={styles.userTweetCount}>Posts</Text>
            </View>
            <View style={styles.userFollowersContainer}>
              <Text
                style={[
                  styles.userFollowersNumber,
                  {
                    color: thema ? color.light.text : color.dark.text,
                  },
                ]}
              >
                822
              </Text>
              <Text style={styles.userFollowers}>Followers</Text>
            </View>
            <View style={styles.userFollowingContainer}>
              <Text
                style={[
                  styles.userFollowingNumber,
                  {
                    color: thema ? color.light.text : color.dark.text,
                  },
                ]}
              >
                1.2K
              </Text>
              <Text style={styles.userFollowing}>Following</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
