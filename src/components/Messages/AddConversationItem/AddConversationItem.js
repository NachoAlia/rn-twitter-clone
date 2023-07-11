import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";

import { styles } from "./AddConversationItem.styles";
import { color } from "../../../utils";

import { useThemaContext } from "../../ThemeProvider";
import { TouchableOpacity } from "react-native-gesture-handler";

export function AddConversationItem({ item }) {
  const thema = useThemaContext();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderBottomColor: color.light.textSecondary },
      ]}
      onPress={() => console.log(item.id)}
    >
      <Avatar
        size={"small"}
        source={{ uri: item.profile_url }}
        rounded
        containerStyle={{ alignSelf: "center" }}
      />
      <View style={{ flexDirection: "column", marginLeft: 10 }}>
        <Text
          style={{
            color: thema ? color.light.text : color.dark.text,
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          {item.username}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: color.light.textSecondary,
          }}
        >
          @{item.username}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
