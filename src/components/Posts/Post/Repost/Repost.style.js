import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: color.light.alternative,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
  postTitle: { flexDirection: "row", alignItems: "center" },
  titleDate: {
    fontSize: 15,
    justifyContent: "flex-end",
    alignSelf: "center",
  },
  nicknameUser: { fontWeight: "bold", fontSize: 17 },
  containerInfo: { paddingTop: 10 },
  text: { textAlign: "justify", fontSize: 13 },
  image: { alignItems: "center", paddingTop: 10 },
});
