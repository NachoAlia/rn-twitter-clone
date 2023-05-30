import React from "react";
import { View } from "react-native";
import { Button, Image } from "react-native-elements";
import { styles } from "./PostButtonBar.style";

export function PostButtonBar() {
  return (
    <View style={styles.barPost}>
      <Button
        buttonStyle={styles.containerButtonImage}
        icon={
          <Image
            source={require("../../../../../assets/icons/ui/comments.png")}
            style={styles.imageButton}
          />
        }
      />
      <Button
        buttonStyle={styles.containerButtonImage}
        icon={
          <Image
            source={require("../../../../../assets/icons/ui/repost.png")}
            style={styles.imageButton}
          />
        }
      />
      <Button
        buttonStyle={styles.containerButtonImage}
        icon={
          <Image
            source={require("../../../../../assets/icons/ui/like_border.png")}
            style={styles.imageButton}
          />
        }
      />
      <Button
        buttonStyle={styles.containerButtonImage}
        icon={
          <Image
            source={require("../../../../../assets/icons/ui/share.png")}
            style={styles.imageButton}
          />
        }
      />
    </View>
  );
}
