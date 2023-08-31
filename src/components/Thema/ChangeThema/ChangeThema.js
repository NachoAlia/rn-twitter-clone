import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-elements";
import { useThemaContext, useChangeThemeContext } from "../../ThemeProvider";
import { IconsButton, color } from "../../../utils";
import { styles } from "./ChangeThema.style";

export function ChangeThema() {
  const thema = useThemaContext();
  const onChangeMode = useChangeThemeContext();

  return (
    <View style={styles.margin}>
      {thema ? (
        <IconsButton name={"light"} size={38} onPress={onChangeMode} />
      ) : (
        <IconsButton name={"dark"} size={38} onPress={onChangeMode} />
      )}
    </View>
  );
}
