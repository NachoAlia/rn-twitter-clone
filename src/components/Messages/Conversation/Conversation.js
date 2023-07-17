import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";
export function Conversation(props) {
  const thema = useThemaContext();
  const { chatbox } = props;
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <View
        style={{
          borderBottomWidth: 0.5,
          borderColor: "gray",
          padding: 10,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 10, width: "90%" }}>
          <Avatar
            rounded
            size={"medium"}
            source={{
              uri: chatbox.avatarUri,
            }}
          />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={{ flexDirection: "row", marginBottom: 5 }}>
              <Text
                style={{
                  fontWeight: "bold",
                  color: thema ? color.light.text : color.dark.text,
                }}
              >
                {chatbox.userName}
              </Text>
              <Text
                style={{
                  marginLeft: 5,
                  color: thema
                    ? color.light.textSecondary
                    : color.dark.textSecondary,
                }}
              >
                {chatbox.mentionName}
              </Text>
              <View style={{ flex: 1 }}>
                <Text style={{ marginLeft: 5, alignSelf: "flex-end" }}>
                  <Text
                    style={{
                      color: thema
                        ? color.light.textSecondary
                        : color.dark.textSecondary,
                    }}
                  >{`${chatbox.fecha.getDate()}/${chatbox.fecha.getMonth()}/${chatbox.fecha.getFullYear()}`}</Text>
                </Text>
              </View>
            </View>
            <Text
              style={{
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              }}
            >
              Ultimo mensaje
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
