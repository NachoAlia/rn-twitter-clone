import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: color.light.alternative,
    borderStyle: "solid",
    borderWidth: 2,
    padding: 10,
  },
  postTitle: { flexDirection: "row", justifyContent: "space-between" },
  titleDate: {
    fontSize: 15,
    color: color.light.textSecondary,
    paddingHorizontal: 5,
  },
  nicknameUser: { fontWeight: "bold", fontSize: 17 },
  containerInfo: { paddingTop: 10 },
  text: { textAlign: "justify" },
  image: { alignItems: "center", paddingTop: 10 },
});
