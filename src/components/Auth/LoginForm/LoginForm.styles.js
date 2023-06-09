import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  input: {
    width: "90%",
    // marginTop: 20,
  },
  icon: {
    color: "#c1c1c1",
  },
  btnContainer: {
    marginTop: 20,
    width: "30%",
    borderRadius: 10,
  },
  btn: {
    backgroundColor: color.light.corporate,
  },
  btntitleContainer: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
