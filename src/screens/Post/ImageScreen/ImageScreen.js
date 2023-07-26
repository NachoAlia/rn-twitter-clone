import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { IconsButton, ImageAuto, color } from "../../../utils";
import { PostButtonBar } from "../../../components/Posts/Post/PostButtonBar";
import { styles } from "./ImageScreen.style";

export function ImageScreen(props) {
  const { route } = props;
  const isLiked = route.params.isLiked;

  const navigation = useNavigation();

  const thema = useThemaContext();

  const dataPost = route.params.dataPost;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {},
      headerLeft: () =>
        thema ? (
          <IconsButton name={"cross_dark"} size={25} onPress={goBack} />
        ) : (
          <IconsButton name={"cross_light"} size={25} onPress={goBack} />
        ),
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
    });
  }, [thema]);

  const goBack = () => {
    navigation.goBack();
  };
  return (
    <>
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
        <PostButtonBar dataPost={dataPost} isLiked={isLiked} size={30} />
      </View>
    </>
  );
}
