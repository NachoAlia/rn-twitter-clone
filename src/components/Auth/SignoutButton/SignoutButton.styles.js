import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  containerModal: {
    margin: -5,
    padding: 25,
    borderRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 15,
  },
  text: {
    fontSize: 26,
    textAlign: "center",
    flexWrap: "wrap",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#c19659",
    borderRadius: 15,
    marginTop: 15,
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
