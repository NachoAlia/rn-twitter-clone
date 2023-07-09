import React from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-elements";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
import { styles } from "./HeaderComment.style";

export function HeaderComment({ dataPost }) {
  const thema = useThemaContext();

  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={[
          styles.verticalBar,
          {
            backgroundColor: thema ? color.light.contrast : color.dark.contrast,
          },
        ]}
      />
      <Avatar
        source={require("../../../../assets/icons/default_user_photo.png")}
        size="medium"
        rounded
      />
      <View style={styles.originBody}>
        <Text
          style={[
            styles.originUserTitle,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {dataPost.nicknameUser}
        </Text>
        <Text
          style={[
            styles.originPost,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {dataPost.postBody}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={[
              styles.originUser,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            Respondiendo a{" "}
          </Text>
          <Text style={[styles.originUser, { color: color.light.corporate }]}>
            @{dataPost.nameUser}
          </Text>
        </View>
      </View>
    </View>
  );
}