import React from "react";
import { View, Dimensions } from "react-native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { IconsButton, ImageAuto, color } from "../../../utils";
import { PostButtonBar } from "../../../components/Posts/Post/PostButtonBar";
import { styles } from "./ImageScreen.style";

export function ImageScreen({ close, data }) {
  const thema = useThemaContext();

  const dataPost = data;

  return (
    <>
      <View>
        {thema ? (
          <IconsButton name={"cross_dark"} size={27} onPress={close} />
        ) : (
          <IconsButton name={"cross_light"} size={27} onPress={close} />
        )}
      </View>
      <View
        style={[
          styles.container,
          {
            backgroundColor: thema
              ? color.light.background
              : color.dark.background,
          },
        ]}
      >
        <ImageAuto
          uri={dataPost.photoTweet_url}
          radius={false}
          desiredWidth={Dimensions.get("window").width}
          border={0}
        />
      </View>
      <View
        style={{
          paddingVertical: 20,
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        }}
      >
        <PostButtonBar idPost={dataPost.id} size={30} />
      </View>
    </>
  );
}
