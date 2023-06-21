import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { flexDirection: "row", alignItems: "center" },
  containerPost: { paddingHorizontal: 15 },
  textTitle: { fontWeight: "bold", fontSize: 20 },
  textSubTitle: { fontSize: 20 },
  text: { fontSize: 18 },
  image: { marginTop: 15, alignItems: "center" },
  containerElement: { marginTop: 15 },
  horizontalBar: {
    width: "100%",
    height: 1,
    marginVertical: 15,
  },
});
