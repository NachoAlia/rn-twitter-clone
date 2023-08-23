import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../../utils/color";

const WIDTH = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  content: {
    width: "100%",
  },
  containerUserInfo: {
    width: "100%",
    maxHeight: 400,
  },
  containerProfileCover: {
    width: "100%",
    height: 135,
    padding: 0,
    backgroundColor: color.light.corporate,
    borderStyle: "solid",
    borderBottomWidth: 3,
    borderBottomColor: "#fff",
    justifyContent: "center",
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
  containerNameAndBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "baseline",
    width: "90%",
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
    marginBottom: 5,
  },
  userBiography: {
    alignSelf: "flex-start",
    marginRight: 20,
    marginBottom: 5,
  },

  infoUser: {
    width: "100%",
    marginBottom: 15,
    marginLeft: -50,
    alignSelf: "center",
    flexDirection: "row",
    paddingHorizontal: 15,
  },
  userLocationContainer: {
    flexDirection: "row",
    width: WIDTH / 3 - 25,
    paddingHorizontal: 15,
    marginLeft: -15,
  },
  userLocationIcon: {
    //color: color.light.textSecondary,
  },
  userLocation: {
    fontSize: 15,
    color: color.light.textSecondary,
  },
  userWebSiteContainer: {
    flexDirection: "row",
    width: WIDTH / 3,
    marginHorizontal: 5,
    paddingHorizontal: 5,
  },
  userWebSiteIcon: {
    //color: color.light.textSecondary,
  },
  userWebsite: {
    fontSize: 15,
    color: color.light.textSecondary,
  },
  userDateContainer: {
    width: WIDTH / 3,
    flexDirection: "row",
    marginLeft: 10,
  },
  userDateIcon: {
    //color: color.light.textSecondary,
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
  },
  userFollowing: {
    color: color.light.textSecondary,
  },
});
