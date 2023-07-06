import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  addConversationButton: {
    width: 50,
    height: 50,
    right: 20,
    bottom: 20,
    borderRadius: 30,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.light.corporate,
  },
  imageAddConversationButton: {
    width: 30,
    height: 30,
  },
});
