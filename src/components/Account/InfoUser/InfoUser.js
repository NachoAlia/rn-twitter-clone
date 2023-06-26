import React from "react";
import { View } from "react-native";
import { Avatar, Button, Text, Image, Icon } from "react-native-elements";
import { styles } from "./InfoUser.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function InfoUser() {
  const navigation = useNavigation();
  const thema = useThemaContext();

  const goToEditProfile = () => {
    navigation.navigate(screen.account.editProfile);
  };
  return (
    <View style={styles.content}>
      <View style={styles.containerUserInfo}>
        <View style={styles.containerProfileCover}></View>
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
          <Avatar
            size="large"
            rounded
            containerStyle={styles.containerProfileAvatar}
            source={require("../../../../assets/icons/default_user_photo.png")}
          />
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
            UserName
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
            @UserName
          </Text>
          <Text
            style={[
              styles.userBiography,
              {
                color: thema ? color.light.text : color.dark.text,
              },
            ]}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            varius faucibus libero, at euismod tortor scelerisque non. Ut
            accumsan blandit mauris, sit amet efficitur nisl tempus vitae.
          </Text>
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
              <Text style={styles.userLocation}>Location</Text>
            </View>
            <View style={styles.userWebSiteContainer}>
              <Icon
                type="material-community"
                name="link"
                iconStyle={styles.userWebSiteIcon}
              />
              <Text style={styles.userWebsite}>link/website</Text>
            </View>
            <View style={styles.userDateContainer}>
              <Icon
                type="material-community"
                name="calendar-blank-outline"
                iconStyle={styles.userDateIcon}
              />
              <Text style={styles.userDate}>Joined 08/2022</Text>
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
