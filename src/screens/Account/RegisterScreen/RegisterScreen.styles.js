import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    marginTop: "12%",
  },
  content: {
    marginHorizontal: 40,
  },
  title: {
    fontSize: 80,
    color: color.light.text,
    // color: color.light.contrast,
    textAlign: "center",
  },
});
