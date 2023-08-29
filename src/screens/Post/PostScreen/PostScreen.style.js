import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15 },
  row: { flexDirection: "row" },
  title: { flexDirection: "row", alignItems: "center" },
  containerPost: { paddingHorizontal: 15 },
  textTitle: { fontWeight: "bold", fontSize: 25 },
  textSubTitle: { fontSize: 15 },
  text: { fontSize: 18 },
  containerUnity: { flexDirection: "row", marginRight: 20 },
  textUnity: { fontSize: 18, marginRight: 5, fontWeight: "bold" },
  image: { marginTop: 25, alignItems: "center" },
  containerElement: { marginTop: 25 },
  horizontalBar: {
    marginHorizontal: 5,
    height: 1,
    marginVertical: 20,
  },
});
