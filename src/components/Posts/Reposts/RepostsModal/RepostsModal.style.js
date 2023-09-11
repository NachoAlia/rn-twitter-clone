import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "25%",
    position: "absolute",
    bottom: 0,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    width: "100%",

    paddingVertical: 10,
    alignItems: "center",
  },
  icon: { height: 25, width: 25, marginHorizontal: 15 },
  text: { fontSize: 20 },
  buttonCabcel: {
    width: "98%",
    marginVertical: 15,
    marginHorizontal: "2%",
    borderColor: color.light.corporate,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    paddingVertical: 5,
  },
});
