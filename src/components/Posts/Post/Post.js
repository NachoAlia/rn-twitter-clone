import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar, Button, Image, Text } from "react-native-elements";
import { styles } from "./Post.style";
import { color, ImageAuto, screen, timePost } from "../../../utils";
import { GoToUserProfile } from "../../../utils/GoToUserProfile";
import { useNavigation } from "@react-navigation/native";
import { PostButtonBar } from "./PostButtonBar";
import { Repost } from "./Repost";
import { useThemaContext } from "../../ThemeProvider";
import { domainUrl } from "../../../config/host";
import { UserContext } from "../../../context";

export function Post({ idPost }) {
  const [dataPost, setDataPost] = useState(null);
  const [reload, setReload] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  const thema = useThemaContext();

  const { currentUser } = useContext(UserContext);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets/${idPost}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLiked(
            data.likes.some((like) => like.user_id === currentUser.id)
          );
          setDataPost(data);
        })

        .catch((error) => console.error(error));
    };

    fetchData();
  }, [reload]);

  const goPost = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.post,
      params: { dataPost, isLiked },
    });
  };

  const goImage = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.image,
      params: { dataPost, isLiked },
    });
  };

  return (
    <>
      {dataPost && (
        <View style={styles.container}>
          <View style={styles.photoUser}>
            <Avatar
              source={
                dataPost.photoProfile_url
                  ? { uri: dataPost.photoProfile_url }
                  : require("../../../../assets/icons/default_user_photo.png")
              }
              size="medium"
              rounded
              onPress={() => GoToUserProfile(navigation, dataPost.user_id)}
            />
          </View>

          <View style={styles.containerData}>
            {dataPost.thread_tweet_id ? (
              <View
                style={[
                  styles.threadBar,
                  {
                    backgroundColor: thema
                      ? color.light.contrast
                      : color.dark.contrast,
                  },
                ]}
              />
            ) : (
              <></>
            )}
            <View style={styles.title}>
              <View style={styles.postTitle}>
                <Text
                  style={[
                    styles.nicknameUser,
                    { color: thema ? color.light.text : color.dark.text },
                  ]}
                >
                  {dataPost.nickname}
                </Text>

                <Text
                  style={[
                    styles.nameUser,
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
              <Text
                style={[
                  styles.titleDate,
                  {
                    color: thema
                      ? color.light.textSecondary
                      : color.dark.textSecondary,
                  },
                ]}
              >
                {timePost(dataPost.created_at)}
              </Text>
            </View>

            <View style={styles.containerInfo}>
              <Text
                style={[
                  styles.text,
                  { color: thema ? color.light.text : color.dark.text },
                ]}
              >
                {dataPost.body}
              </Text>
              <TouchableOpacity style={styles.postButton} onPress={goPost} />

              {dataPost.photoTweet_url ? (
                <View style={styles.imagePost}>
                  <TouchableOpacity onPress={goImage}>
                    <ImageAuto
                      uri={dataPost.photoTweet_url}
                      desiredWidth={Dimensions.get("window").width * 0.75}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
              {dataPost.retweet ? (
                <Repost dataPost={dataPost.retweet} />
              ) : (
                <></>
              )}
              <View style={{ marginTop: 10 }}>
                <PostButtonBar
                  dataPost={dataPost}
                  reload={setReload}
                  isLiked={isLiked}
                />
              </View>
            </View>
          </View>
        </View>
      )}
      {dataPost?.thread_tweet_id ? (
        <View style={styles.threadStyle}>
          <View style={styles.threadUser}>
            <Avatar
              source={require("../../../../assets/icons/default_user_photo.png")}
              size="small"
              rounded
            />
          </View>
          <Text style={styles.threadText}>Mostrar este hilo</Text>
        </View>
      ) : (
        <></>
      )}
      <View
        style={[
          styles.spreaderBar,
          {
            backgroundColor: thema ? color.light.contrast : color.dark.contrast,
          },
        ]}
      />
    </>
  );
}
