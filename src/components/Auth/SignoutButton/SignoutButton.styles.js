import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  containerModal: {
    margin: -5,
    padding: 10,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 15,
  },
  text: {
    fontSize: 22,
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#c19659",
    borderRadius: 15,
    marginVertical: 10,
  },
  btnAceptCancel: {
    color: "#c19659",
  },
  buttonAcceptContainer: {
    width: "50%",
  },
  buttonCloseContainer: {
    padding: 5,
    backgroundColor: "#c1965950",
    width: "50%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
  },
});
