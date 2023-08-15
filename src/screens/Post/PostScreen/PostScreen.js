import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, ScrollView, FlatList } from "react-native";
import { Avatar } from "react-native-elements";
import { styles } from "./PostScreen.style";
import { IconsButton, ImageAuto, color } from "../../../utils";
import { date } from "../../../utils/date";
import { Repost } from "../../../components/Posts/Post/Repost";
import { useThemaContext } from "../../../components/ThemeProvider";
import { PostButtonBar } from "../../../components/Posts/Post/PostButtonBar/PostButtonBar";
import { Post } from "../../../components";
import { useNavigation } from "@react-navigation/native";

export function PostScreen(props) {
  const { route } = props;
  const isLiked = route.params.isLiked;
  const dataPost = route.params.dataPost;

  const navigation = useNavigation();

  const thema = useThemaContext();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {},
      headerLeft: () =>
        thema ? (
          <IconsButton name={"arrow_dark"} size={25} onPress={goBack} />
        ) : (
          <IconsButton name={"arrow_light"} size={25} onPress={goBack} />
        ),
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
    });
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      <View style={styles.container}>
        <View style={styles.title}>
          <Avatar
            source={
              dataPost.photoProfile_url
                ? { uri: dataPost.photoProfile_url }
                : require("../../../../assets/icons/default_user_photo.png")
            }
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
              {dataPost.nickname}
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
              @{dataPost.username}
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
            {dataPost.body}
          </Text>
          {dataPost.photoTweet_url ? (
            <View style={styles.image}>
              <ImageAuto
                uri={dataPost.photoTweet_url}
                desiredWidth={Dimensions.get("window").width * 0.92}
              />
            </View>
          ) : (
            <></>
          )}
        </View>
        {dataPost.repost ? (
          <View style={styles.containerElement}>
            <Repost dataPost={dataPost.repost} />
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
            {date(dataPost.created_at)}
          </Text>
        </View>
        <View
          style={[
            styles.horizontalBar,
            {
              backgroundColor: thema
                ? color.light.contrast
                : color.dark.contrast,
            },
          ]}
        />
        <View style={styles.row}>
          <View style={styles.containerUnity}>
            <Text
              style={[
                styles.textUnity,
                { color: thema ? color.light.text : color.dark.text },
              ]}
            >
              {dataPost.retweet_count}
            </Text>
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
              Reposts
            </Text>
          </View>
          <View style={styles.containerUnity}>
            <Text
              style={[
                styles.textUnity,
                { color: thema ? color.light.text : color.dark.text },
              ]}
            >
              {dataPost.likes_count}
            </Text>
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
              Me gusta
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.horizontalBar,
            {
              backgroundColor: thema
                ? color.light.contrast
                : color.dark.contrast,
            },
          ]}
        />

        <PostButtonBar idPost={dataPost.id} amount={false} size={30} />
        <View
          style={[
            styles.horizontalBar,
            {
              backgroundColor: thema
                ? color.light.contrast
                : color.dark.contrast,
            },
          ]}
        />
      </View>
      <FlatList
        data={dataPost.comments}
        renderItem={({ item }) => <Post idPost={item.id} isLiked={isLiked} />}
        keyExtractor={(item) => item.id}
      />
    </ScrollView>
  );
}
