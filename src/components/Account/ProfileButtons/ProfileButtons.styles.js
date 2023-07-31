import { StyleSheet } from "react-native";
import { color } from '../../../utils/color'

export const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  editButton: {
    backgroundColor: color.light.corporate,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  followButton: {
    backgroundColor: color.light.corporate,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 15
  },
  followButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  notificationsButton: {
    backgroundColor: color.light.corporate,
    borderRadius: 50,
    padding: 12,
  },
});
