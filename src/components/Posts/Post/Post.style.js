import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { paddingVertical: 15, flexDirection: "row" },
  photoUser: { paddingHorizontal: 10 },
  containerData: { width: "80%" },
  postTitle: { flexDirection: "row" },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  nicknameUser: { fontWeight: "bold", fontSize: 17 },
  nameUser: {
    fontSize: 17,
    paddingHorizontal: 5,
    color: color.light.textSecondary,
  },
  titleDate: {
    fontSize: 15,
    color: color.light.textSecondary,
    paddingHorizontal: 5,
  },
  containerInfo: { padding: 10 },
  text: { textAlign: "justify" },
  imagePost: { marginVertical: 10, alignItems: "center" },

  postStyle: { flexDirection: "row" },
  threadStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  threadUser: { paddingHorizontal: 20 },
  threadText: { color: color.light.corporate, fontWeight: "bold" },
  spreaderBar: {
    height: 2,
    width: "auto",
    backgroundColor: color.light.contrast,
  },
  threadBar: {
    marginTop: 55,
    height: "95%",
    position: "absolute",
    left: -35,
    width: 2,
    backgroundColor: color.light.contrast,
  },
});
