import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginTop: 30,
    marginBottom: 30,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  avatarOverlay: {
    borderRadius: 40,
  },
  userName: {
    marginTop: 5,
    fontSize: 20,
  },
  mentionUserName: {
    fontSize: 16,
  },
  infoCount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: 14,
    marginLeft: 5,
  },
  containerInfo: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  containerFollowers: { flexDirection: "row" },
  containerFollowing: { flexDirection: "row", marginLeft: 10 },
});
