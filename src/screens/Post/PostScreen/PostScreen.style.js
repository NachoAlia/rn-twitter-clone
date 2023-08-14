import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: { padding: 15 },
  row: { flexDirection: "row" },
  title: { flexDirection: "row", alignItems: "center" },
  containerPost: { paddingHorizontal: 15 },
  textTitle: { fontWeight: "bold", fontSize: 20 },
  textSubTitle: { fontSize: 20 },
  text: { fontSize: 18 },
  containerUnity: { flexDirection: "row", marginRight: 20 },
  textUnity: { fontSize: 18, marginRight: 5, fontWeight: "bold" },
  image: { marginTop: 15, alignItems: "center" },
  containerElement: { marginTop: 15 },
  horizontalBar: {
    marginHorizontal: 20,
    height: 1,
    marginVertical: 15,
  },
});
