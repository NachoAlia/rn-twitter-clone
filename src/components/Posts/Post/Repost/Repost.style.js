import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: color.light.alternative,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
  postTitle: { flexDirection: "row", justifyContent: "space-between" },
  titleDate: {
    fontSize: 12,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  nicknameUser: { fontWeight: "bold", fontSize: 17 },
  containerInfo: { paddingTop: 10 },
  text: { textAlign: "justify", fontSize: 13 },
  image: { alignItems: "center", paddingTop: 10 },
});
