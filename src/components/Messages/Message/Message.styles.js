import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  currentUserSender: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginLeft: 10,
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
    fontSize: 12.5,
  },
  stateText: {
    fontSize: 13,
    marginLeft: 5,
  },
  photoMensaje: {
    width: 100,
    height: 100,
  },
  containerPhotoMessageSender: {
    alignSelf: "flex-end",
    borderWidth: 1,
    overflow: "hidden",
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginHorizontal: 10,
    borderColor: color.light.corporate,
  },
  containerPhotoMessageReceiver: {
    alignSelf: "flex-start",
    borderWidth: 1,
    overflow: "hidden",
    borderBottomEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginHorizontal: 10,
    borderColor: color.light.corporate,
  },
});
