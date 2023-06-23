import React from "react";
import { View, Text } from "react-native";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function UserLikes() {
  const thema = useThemaContext();
  return (
    <View style={{ alignItems: "center", marginTop: 40 }}>
      <Text
        style={{
          color: thema ? color.light.text : color.dark.text,
          fontSize: 20,
        }}
      >
        UserLikesTest
      </Text>
    </View>
  );
}
