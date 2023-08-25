import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15, flexDirection: "row" },
  containerTight: { paddingHorizontal: 15, flexDirection: "row" },
  containerData: { flex: 1, paddingLeft: 15 },
  postTitle: { flexDirection: "row" },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nicknameUser: { fontSize: 16 },
  nameUser: {
    fontSize: 16,
  },
  titleDate: {
    fontSize: 12,
    alignSelf: "center",
  },
  containerInfo: { marginVertical: 20 },
  body: { marginBottom: 20 },
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
  spreaderBar: { marginHorizontal: 20, height: 1 },
  postButton: {
    height: "95%",
    width: "107%",
    position: "absolute",
    top: -40,
  },
  threadBar: {
    marginTop: 55,
    height: "95%",
    position: "absolute",
    left: -35,
    width: 1,
  },
});
