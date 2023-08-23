import React, { useState } from "react";
import { View } from "react-native";
import {
  Avatar,
  Text,
  Image,
  Icon,
  Tooltip,
  colors,
} from "react-native-elements";
import { styles } from "./InfoUser.styles";

import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { ScrollView } from "react-native-gesture-handler";
import { ProfileButtons } from "../ProfileButtons";

export function InfoUser({ userData, isCurrent, postCounter }) {
  const thema = useThemaContext();
  const createdAt = new Date(userData.created_at);
  return (
    <View style={styles.content}>
      <View style={styles.containerUserInfo}>
        <View style={styles.containerProfileCover}>
          {userData.photoCover_url ? (
            <Image
              source={{ uri: userData.photoCover_url }}
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
          {userData.photoProfile_url ? (
            <Avatar
              size="large"
              rounded
              containerStyle={styles.containerProfileAvatar}
              source={{ uri: userData.photoProfile_url }}
            />
          ) : (
            <Avatar
              size="large"
              rounded
              containerStyle={styles.containerProfileAvatar}
              source={require("../../../../assets/icons/default_user_photo.png")}
            />
          )}

          <View style={styles.containerNameAndBtns}>
            <View style={styles.containerName}>
              <Text
                style={[
                  styles.userName,
                  {
                    color: thema ? color.light.text : color.dark.text,
                  },
                ]}
              >
                {userData?.nickname ? userData.nickname : userData.username}
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
                {userData?.username ? `@${userData.username}` : "@UserName"}
              </Text>
            </View>

            <ProfileButtons
              isCurrentUser={isCurrent}
              isFollowing={false}
              onFollow={() => {
                console.log("follow");
              }}
              onNotifications={() => {
                console.log("notifications");
              }}
            />
          </View>
          <ScrollView style={{ maxHeight: 70, marginBottom: 30 }}>
            <Text
              style={[
                styles.userBiography,
                {
                  color: thema ? color.light.text : color.dark.text,
                },
              ]}
            >
              {userData.biography ? userData.biography : ""}
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
                color={
                  userData?.localization
                    ? color.light.corporate
                    : color.light.textSecondary
                }
                iconStyle={styles.userLocationIcon}
              />
              {userData.localization ? (
                <Tooltip
                  withOverlay={false}
                  popover={
                    <Text style={{ color: "#fff" }}>
                      {userData.localization}
                    </Text>
                  }
                  backgroundColor={color.light.corporate}
                >
                  <Text style={styles.userLocation}>
                    {userData.localization}
                  </Text>
                </Tooltip>
              ) : (
                <Text style={styles.userLocation}>Location</Text>
              )}
            </View>
            <View style={styles.userWebSiteContainer}>
              <Icon
                type="material-community"
                name="link"
                color={
                  userData.website
                    ? color.light.corporate
                    : color.light.textSecondary
                }
                iconStyle={styles.userWebSiteIcon}
              />

              {userData.website ? (
                <Tooltip
                  withOverlay={false}
                  popover={
                    <Text style={{ color: "#fff" }}>{userData.website}</Text>
                  }
                  backgroundColor={color.light.corporate}
                >
                  <Text style={styles.userWebsite}>{userData.website}</Text>
                </Tooltip>
              ) : (
                <Text style={styles.userWebsite}>Link/Website</Text>
              )}
            </View>
            <View style={styles.userDateContainer}>
              <Icon
                type="material-community"
                name="calendar-blank-outline"
                color={
                  createdAt ? color.light.corporate : color.light.textSecondary
                }
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
                    color: thema ? color.light.corporate : color.dark.corporate,
                  },
                ]}
              >
                {postCounter.countPosts}
              </Text>
              <Text style={styles.userTweetCount}>Posts</Text>
            </View>
            <View style={styles.userFollowersContainer}>
              <Text
                style={[
                  styles.userFollowersNumber,
                  {
                    color: thema ? color.light.corporate : color.dark.corporate,
                  },
                ]}
              >
                0
              </Text>
              <Text style={styles.userFollowers}>Followers</Text>
            </View>
            <View style={styles.userFollowingContainer}>
              <Text
                style={[
                  styles.userFollowingNumber,
                  {
                    color: thema ? color.light.corporate : color.dark.corporate,
                  },
                ]}
              >
                0
              </Text>
              <Text style={styles.userFollowing}>Following</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          borderBottomColor: color.light.corporate,
          borderBottomWidth: 1,
          marginBottom: 15,
          borderTopRadius: 10,
        }}
      />
    </View>
  );
}
