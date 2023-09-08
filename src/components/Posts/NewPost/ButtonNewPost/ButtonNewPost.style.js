import { StyleSheet } from "react-native";
import { color } from "../../../../utils";

export const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    padding: 10,
    backgroundColor: color.light.corporate,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  imagenIcon: { height: 30, width: 30 },
});
