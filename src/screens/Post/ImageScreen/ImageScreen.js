import React, { useEffect } from "react";
import { View, Text, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemaContext } from "../../../components/ThemeProvider";
import { IconsButton, ImageAuto, color } from "../../../utils";
import { PostButtonBar } from "../../../components/Posts/Post/PostButtonBar";
import { styles } from "./ImageScreen.style";

export function ImageScreen(props) {
  const { route } = props;

  const navigation = useNavigation();

  const thema = useThemaContext();

  const data = route.params.dataPost;
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {},
      headerLeft: () => <Text>x</Text>,
    });
  }, []);
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
          uri={data.image}
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
        <PostButtonBar dataPost={route.params.dataPost} size={30} />
      </View>
    </>
  );
}
