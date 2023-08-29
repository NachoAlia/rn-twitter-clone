import { StyleSheet } from "react-native";
import { color } from "../../../utils";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  containerButtonPostDisabled: { backgroundColor: color.light.alternative },
  containerButtonPost: {
    borderRadius: 20,
    alignSelf: "flex-end",
    backgroundColor: color.light.corporate,
  },
  textArea: { borderBottomWidth: 0 },
  imagePost: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  containerButtonImage: {
    backgroundColor: "#fff00",
    alignSelf: "flex-start",
  },
  barPost: { flexDirection: "row", justifyContent: "space-between" },
  valuesAmount: {
    alignSelf: "center",
  },
  repost: { marginBottom: 20 },
});
