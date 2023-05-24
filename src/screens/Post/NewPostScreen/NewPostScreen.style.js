import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: color.light.background,
  },
  containerButtonPostDisabled: { backgroundColor: color.light.alternative },
  containerButtonPost: {
    borderRadius: 20,
    alignSelf: "flex-end",
    backgroundColor: color.light.corporate,
    paddingHorizontal: 15,
  },
  textArea: { padding: 0, margin: 0, borderBottomWidth: 0 },
  imagePost: {
    width: "94%",
    height: 200,
    resizeMode: "contain",
    marginHorizontal: "3%",
  },
  imageButton: { height: 30, width: 30 },
  containerButtonImage: {
    backgroundColor: "#fff00",
    alignSelf: "flex-start",
  },
  barPost: { flexDirection: "row", justifyContent: "space-between" },
  valuesAmount: {
    color: color.light.textSecondary,
    alignSelf: "center",
  },
});
