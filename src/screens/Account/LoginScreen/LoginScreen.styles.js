import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  contentContainer: {},
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    marginTop: "12%",
  },
  title: {
    fontSize: 80,
    // color: color.light.text,
    // color: color.light.contrast,
    textAlign: "center",
  },
  content: {
    // marginHorizontal: 24,
  },
  textRegister: {
    marginTop: 15,
    marginHorizontal: 10,
    textAlign: "center",
    paddingBottom: 50,
  },
  btnRegister: {
    color: color.light.corporate,
    fontWeight: "bold",
  },
});
