import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15, flexDirection: "row" },
  photoUser: { flexDirection: "row" },
  containerData: { paddingHorizontal: 10 },
  nicknameUser: { fontWeight: "bold", fontSize: 20 },
  nameUser: {
    fontSize: 20,
    paddingHorizontal: 5,
    color: color.light.textSecondary,
  },
  containerInfo: { padding: 10 },
  text: { textAlign: "justify" },
});
