import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  currentUserSender: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 0,
    padding: 15,
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: color.light.corporate,
  },
  currentUserReceiver: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginRight: 10,
    padding: 15,
    marginBottom: 0,
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: color.light.alternative,
  },
  timeText: {
    fontSize: 14,
  },
  stateText: {
    fontSize: 13,
    marginLeft: 5,
  },
});
