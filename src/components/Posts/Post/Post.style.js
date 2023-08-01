import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15, flexDirection: "row" },
  containerData: { flex: 1, paddingLeft: 15 },
  postTitle: { flexDirection: "row" },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nicknameUser: { fontWeight: "bold", fontSize: 16 },
  nameUser: {
    fontSize: 15,
    paddingLeft: 5,
  },
  titleDate: {
    fontSize: 12,
    alignSelf: "center",
  },
  containerInfo: { marginVertical: 15 },
  body: { marginBottom: 15 },
  text: { textAlign: "justify", fontSize: 15 },
  imagePost: { alignItems: "center" },

  postStyle: { flexDirection: "row" },
  threadStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  threadUser: { paddingHorizontal: 20 },
  threadText: { color: color.light.corporate, fontWeight: "bold" },
  spreaderBar: { marginHorizontal: 15, height: 1 },
  postButton: { height: "90%", width: "107%", position: "absolute" },
  threadBar: {
    marginTop: 55,
    height: "95%",
    position: "absolute",
    left: -35,
    width: 1,
  },
});
