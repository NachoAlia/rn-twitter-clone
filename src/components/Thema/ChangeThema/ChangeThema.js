import React from "react";
import { View, Text } from "react-native";
import { Image } from "react-native-elements";
import { useThemaContext, useChangeThemeContext } from "../../ThemeProvider";

export function ChangeThema() {
  const thema = useThemaContext();
  const onChangeMode = useChangeThemeContext();
  const imageOn = require("../../../assets/icons/ui/on.png");
  const imageOff = require("../../../assets/icons/ui/off.png");
  return (
    <View>
      <View>
        <Text>Tema Claro</Text>
        {thema ? <Image source={imageOn} /> : <Image source={imageOff} />}
      </View>
      <View>
        <Text>Tema Oscuro</Text>
        {thema ? <Image source={imageOff} /> : <Image source={imageOn} />}
      </View>
    </View>
  );
}
