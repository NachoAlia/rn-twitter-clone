import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import { styles } from "./PostScreen.style";
import { ImageAuto, color } from "../../../utils";
import { date } from "../../../utils/date";
import { Repost } from "../../../components/Posts/Post/Repost";
import { useThemaContext } from "../../../components/ThemeProvider";

export function PostScreen(props) {
  const { route } = props;
  const data = route.params.dataPost;

  const thema = useThemaContext();
  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <View style={styles.title}>
        <Avatar
          source={require("../../../../assets/icons/default_user_photo.png")}
          size="medium"
          rounded
        />
        <View style={styles.containerPost}>
          <Text
            style={[
              styles.textTitle,
              { color: thema ? color.light.text : color.dark.text },
            ]}
          >
            {data.nicknameUser}
          </Text>
          <Text
            style={[
              styles.textSubTitle,
              {
                color: thema
                  ? color.light.textSecondary
                  : color.dark.textSecondary,
              },
            ]}
          >
            @{data.nameUser}
          </Text>
        </View>
      </View>
      <View style={styles.containerElement}>
        <Text
          style={[
            styles.text,
            { color: thema ? color.light.text : color.dark.text },
          ]}
        >
          {data.postBody}
        </Text>
        {data.image ? (
          <View style={styles.image}>
            <ImageAuto
              uri={data.image}
              desiredWidth={Dimensions.get("window").width * 0.92}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
      {data.repost.nicknameUser ? (
        <View style={styles.containerElement}>
          <Repost dataPost={data.repost} />
        </View>
      ) : (
        <></>
      )}
      <View style={styles.containerElement}>
        <Text
          style={[
            styles.text,
            {
              color: thema
                ? color.light.textSecondary
                : color.dark.textSecondary,
            },
          ]}
        >
          {date(data.createdAt)}
        </Text>
      </View>
      <View
        style={[
          styles.horizontalBar,
          {
            backgroundColor: thema ? color.light.contrast : color.dark.contrast,
          },
        ]}
      />
    </ScrollView>
  );
}
