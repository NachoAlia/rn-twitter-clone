import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    borderColor: "#C19659",
    borderWidth: 2,
    borderRadius: 10,
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Ajusta el valor de transparencia aquí (0.5 en este ejemplo)
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#C19659",
    textTransform: "uppercase",
    marginTop: 10,
    fontSize: 22,
  },
});
