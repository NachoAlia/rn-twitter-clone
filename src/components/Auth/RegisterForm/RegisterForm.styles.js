import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#D22222",
    marginVertical: 20,
    paddingBottom: 30,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    // marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: color.light.corporate,
  },
});
