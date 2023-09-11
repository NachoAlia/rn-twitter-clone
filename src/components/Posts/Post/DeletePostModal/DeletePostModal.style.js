import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "80%",
  },
  containerMessage: { marginBottom: 15 },
  titleText: { fontSize: 18, marginBottom: 10, alignSelf: "center" },
  text: { alignSelf: "center", marginBottom: 10 },
  button: {
    width: "80%",
    marginVertical: 5,
    marginHorizontal: "10%",
    borderColor: color.light.corporate,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 5,
  },
});
