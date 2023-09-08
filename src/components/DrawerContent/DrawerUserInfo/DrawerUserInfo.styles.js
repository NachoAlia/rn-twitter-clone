import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    marginTop: 0,
    marginBottom: 30,
    // width: "80%",
    // alignItems: "center",
  },
  avatar: {
    width: 65,
    height: 65,
  },
  avatarOverlay: {
    borderRadius: 40,
  },
  userName: {
    marginTop: 10,
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
