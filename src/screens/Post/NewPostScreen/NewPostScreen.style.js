import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 20,
    flex: 1,
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
  containerButtonImage: {
    backgroundColor: "#fff00",
    alignSelf: "flex-start",
  },
  barPost: { flexDirection: "row", justifyContent: "space-between" },
  valuesAmount: {
    alignSelf: "center",
  },
});
