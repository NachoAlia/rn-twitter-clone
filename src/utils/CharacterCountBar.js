import { View, Text } from "react-native";
import React from "react";
import { color } from "./color";

export function CharacterCountBar({ value }) {
  return (
    <View
      style={{
        height: 3,
        width: "100%",
        backgroundColor: color.light.alternative,
      }}
    >
      <View
        style={{
          height: 3,
          width: `${(value * 100) / 140}%`,
          backgroundColor: color.light.corporate,
        }}
      ></View>
    </View>
  );
}
