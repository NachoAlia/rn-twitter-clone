import { StyleSheet, Dimensions } from "react-native";
import { color } from "../../../utils/color";

const WIDTH = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  content: {
    backgroundColor: color.light.background,
    marginTop: "40%",
  },
  containerStyle: {
    height: 40,
    borderWidth: 0,
    borderBottomWidth: 1,
    backgroundColor: "transparent",
    width: "100%",
    alignSelf: "center",
  },
  innerBorderStyle: { width: 0 },
  selectedButtonStyle: {
    borderBottomWidth: 2,
    marginHorizontal: 12,
    borderBottomColor: color.light.corporate,
    backgroundColor: "transparent",
  },
  selectedTextStyle: { color: color.light.corporate, fontWeight: "bold" },
  disabledSelectedStyle: {
    backgroundColor: "transparent",
  },
});
