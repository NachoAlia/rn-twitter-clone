import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { GoToUserProfile, color } from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { useThemaContext } from "../../ThemeProvider";

export function UserCard({ data }) {
  const navigation = useNavigation();

  const thema = useThemaContext();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          margin: 10,
          padding: 15,
          alignItems: "center",
        }}
      >
        <Avatar
          source={
            data.photoProfile_url
              ? { uri: data.photoProfile_url }
              : require("../../../../assets/icons/default_user_photo.png")
          }
          size="medium"
          rounded
          containerStyle={{
            borderWidth: 1,
            borderColor: color.light.corporate,
          }}
          onPress={() => GoToUserProfile(navigation, data.id)}
        />
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 20,
              color: thema ? color.light.text : color.dark.text,
            }}
          >
            {data.username}
          </Text>
          <Text
            style={{
              color: thema
                ? color.light.textSecondary
                : color.dark.textSecondary,
            }}
          >
            @{data.nickname}
          </Text>
        </View>
      </View>
      <View
        style={{
          alignSelf: "center",
          height: 1,
          width: "90%",
          backgroundColor: thema ? color.light.contrast : color.dark.contrast,
        }}
      />
    </>
  );
}
