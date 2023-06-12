import { StyleSheet } from "react-native";
import { color } from "../../../../utils";
export const styles = StyleSheet.create({
  containerProfileCover: {
    width: "100%",
    height: 150,
    padding: 2,
    backgroundColor: color.light.corporate,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ffff",
  },
  addProfileCoverIcon: {
    transform: [{ rotateY: "180deg" }],
  },
  containerProfileAvatar: {
    marginHorizontal: 15,
    marginTop: -40,
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#ffff",
    backgroundColor: color.light.textSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
});
