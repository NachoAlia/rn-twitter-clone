import { StyleSheet } from "react-native";
import { color } from "../../../utils";
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
    color: color.light.text,
  },
  mentionUserName: {
    fontSize: 16,
    color: color.light.textSecondary,
  },
  infoCount: {
    fontSize: 14,
    fontWeight: "bold",
  },
  infoTitle: {
    fontSize: 14,
    color: color.light.textSecondary,
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
