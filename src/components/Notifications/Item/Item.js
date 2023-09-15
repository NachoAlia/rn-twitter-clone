import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";

export function Item(props) {
  const thema = useThemaContext();
  const { notification } = props;
  const notification_date = notification?.created_at
    ? new Date(notification?.created_at).toLocaleDateString("en-ES", {
        day: "2-digit",
        month: "short",
      })
    : null;
  return (
    <View
      style={{
        borderBottomWidth: 0.5,
        borderColor: "gray",
        padding: 10,
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      <View style={{ flexDirection: "row", marginBottom: 10, width: "90%" }}>
        <Avatar
          rounded
          size={"medium"}
          source={
            notification.user_profile_image_url
              ? {
                  uri: notification.user_profile_image_url,
                }
              : require("../../../../assets/icons/default_user_photo.png")
          }
          avatarStyle={{
            borderWidth: 1.5,
            borderColor: color.light.corporate,
          }}
        />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <View style={{ flexDirection: "row", marginBottom: 5 }}>
            <Text
              style={{
                fontWeight: "bold",
                color: thema ? color.light.text : color.dark.text,
                fontSize: 14,
              }}
            >
              {notification.title}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={{ marginLeft: 5, alignSelf: "flex-end" }}>
                <Text
                  style={{
                    color: thema
                      ? color.light.textSecondary
                      : color.dark.textSecondary,
                    fontSize: 13,
                  }}
                >
                  {notification_date}
                </Text>
              </Text>
            </View>
          </View>
          <Text
            style={{
              color: thema
                ? color.light.textSecondary
                : color.dark.textSecondary,
              fontSize: 15,
            }}
          >
            {notification.body}
          </Text>
        </View>
      </View>
    </View>
  );
}
