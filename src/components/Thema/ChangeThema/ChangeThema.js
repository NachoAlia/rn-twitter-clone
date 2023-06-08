import React from "react";
import { View, Text, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-elements";
import { useThemaContext, useChangeThemeContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { styles } from "./ChangeThema.style";

export function ChangeThema() {
  const thema = useThemaContext();
  const onChangeMode = useChangeThemeContext();

  const imageOn = require("../../../../assets/icons/ui/on.png");
  const imageOff = require("../../../../assets/icons/ui/off.png");

  return (
    <View>
      <TouchableWithoutFeedback onPress={onChangeMode}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../../assets/icons/ui/light.png")}
              style={styles.imageIcon}
            />
            <Text
              style={[
                styles.text,
                { color: thema ? color.light.text : color.dark.text },
              ]}
            >
              Tema Claro
            </Text>
          </View>
          <Image source={thema ? imageOn : imageOff} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onChangeMode}>
        <View style={styles.container}>
          <View style={{ flexDirection: "row" }}>
            <Image
              source={require("../../../../assets/icons/ui/dark.png")}
              style={styles.imageIcon}
            />
            <Text
              style={[
                styles.text,
                { color: thema ? color.light.text : color.dark.text },
              ]}
            >
              Tema Oscuro
            </Text>
          </View>
          <Image source={thema ? imageOff : imageOn} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
