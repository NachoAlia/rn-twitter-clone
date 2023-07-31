import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    marginTop: "25%",
    // marginVertical: "15%",
    marginBottom: "6%",
  },
  content: {
    // marginHorizontal: 24,
  },
  textRegister: {
    fontSize: 17,
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
