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
  },
  titleDate: {
    fontSize: 12,
    paddingHorizontal: 5,
    alignSelf: "center",
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
    height: 1,
  },
  postButton: { height: "90%", width: "107%", position: "absolute" },
  threadBar: {
    marginTop: 55,
    height: "95%",
    position: "absolute",
    left: -35,
    width: 1,
  },
});
