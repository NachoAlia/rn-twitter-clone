import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  originUserTitle: { fontWeight: "bold", fontSize: 18 },
  originBody: { paddingHorizontal: 10 },
  originPost: { paddingVertical: 10 },
  originUser: { fontSize: 18, paddingBottom: 10 },
  containerButtonPostDisabled: { backgroundColor: color.light.alternative },
  containerButtonPost: {
    borderRadius: 20,
    alignSelf: "flex-end",
    backgroundColor: color.light.corporate,
    paddingHorizontal: 15,
  },
  textArea: { padding: 0, margin: 0, borderBottomWidth: 0 },
  imagePost: {
    width: "94%",
    height: 200,
    resizeMode: "contain",
    marginHorizontal: "3%",
  },
  containerButtonImage: {
    backgroundColor: "#fff00",
    alignSelf: "flex-start",
  },
  barPost: { flexDirection: "row", justifyContent: "space-between" },
  valuesAmount: {
    alignSelf: "center",
  },
  verticalBar: {
    height: "93%",
    width: 1,
    position: "absolute",
    left: 25,
  },
});
