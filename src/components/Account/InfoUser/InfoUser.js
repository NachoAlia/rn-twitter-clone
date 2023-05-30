import React from "react";
import { View } from "react-native";
import { Avatar, Button, Text, Image, Icon } from "react-native-elements";
import { styles } from "./InfoUser.styles";

export function InfoUser() {
  return (
    <View style={styles.content}>
      <View style={styles.containerUserInfo}>
        <View style={styles.containerProfileCover}></View>
        <View style={styles.profileUserInfo}></View>
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
          />
          <Text style={styles.userName}>UserName</Text>
          <Text style={styles.mentionUserName}>@UserName</Text>
          <Text style={styles.userBiography}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            varius faucibus libero, at euismod tortor scelerisque non. Ut
            accumsan blandit mauris, sit amet efficitur nisl tempus vitae.
          </Text>
          <View style={styles.infoUser}>
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
          <View style={styles.infoUser}>
            <View style={styles.userTweetCountContainer}>
              <Text style={styles.userTweetCountNumber}>1M</Text>
              <Text style={styles.userTweetCount}>Posts</Text>
            </View>
            <View style={styles.userFollowersContainer}>
              <Text style={styles.userFollowersNumber}>822</Text>
              <Text style={styles.userFollowers}>Followers</Text>
            </View>
            <View style={styles.userFollowingContainer}>
              <Text style={styles.userFollowingNumber}>1.2K</Text>
              <Text style={styles.userFollowing}>Following</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
