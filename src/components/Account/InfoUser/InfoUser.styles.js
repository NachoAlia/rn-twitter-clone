import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../../utils/color";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  containerUserInfo: {
    width: "100%",
    height: 250,
  },
  containerProfileCover: {
    width: "100%",
    height: "50%",
    padding: 2,
    backgroundColor: color.light.corporate,
  },
  profileCover: {
    width: "100%",
    height: "50%",
  },
  containerMediumHeader: {
    width: "100%",
    position: "absolute",
    top: 90,
    left: 20,
  },
  containerProfileAvatar: {
    borderStyle: "solid",
    borderWidth: 3,
    borderColor: "#fff",
  },
  containerButtonEditProfile: {
    position: "absolute",
    width: 100,
    top: 50,
    right: 35,
    borderRadius: 20,
  },
  buttonEditProfile: {
    backgroundColor: color.light.alternative,
  },
  buttonEditProfileTitle: {
    color: "black",
    fontSize: 14,
  },
  profileUserInfo: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontWeight: "bold",
    fontSize: 20,
    color: color.light.text,
  },

  mentionUserName: {
    fontSize: 16,
    color: color.light.textSecondary,
  },
  userBiography: {
    alignSelf: "flex-start",
    marginTop: 10,
    marginRight: 20,
  },

  infoUser: {
    width: "100%",
    marginTop: 20,
    marginLeft: -10,
    flexDirection: "row",
  },
  userLocationContainer: {
    flexDirection: "row",
    width: WIDTH / 3 - 25,
  },
  userLocationIcon: {
    color: color.light.textSecondary,
  },
  userLocation: {
    fontSize: 15,
    color: color.light.textSecondary,
  },
  userWebSiteContainer: {
    flexDirection: "row",
    width: WIDTH / 3,
  },
  userWebSiteIcon: {
    color: color.light.textSecondary,
  },
  userWebsite: {
    fontSize: 15,
    color: color.light.textSecondary,
  },
  userDateContainer: {
    width: WIDTH / 3,
    flexDirection: "row",
  },
  userDateIcon: {
    color: color.light.textSecondary,
  },
  userDate: {
    fontSize: 15,
    color: color.light.textSecondary,
  },
  userTweetCountContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  userTweetCountNumber: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  userTweetCount: {
    color: color.light.textSecondary,
  },
  userFollowersContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  userFollowersNumber: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  userFollowers: {
    color: color.light.textSecondary,
  },
  userFollowingContainer: {
    flexDirection: "row",
    marginHorizontal: 5,
  },
  userFollowingNumber: {
    marginRight: 5,
    fontSize: 15,
    fontWeight: "bold",
  },
  userFollowing: {
    color: color.light.textSecondary,
  },
});
