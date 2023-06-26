import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ButtonNewPost.style";
import { screen } from "../../../utils";

export function ButtonNewPost() {
  const navigation = useNavigation();

  const gotoNewPost = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.newPost,
    });
  };
  return (
    <TouchableOpacity style={styles.button} onPress={gotoNewPost}>
      <Image
        source={require("../../../../assets/icons/ui/new_post.png")}
        containerStyle={styles.imagenIcon}
      />
    </TouchableOpacity>
  );
}
