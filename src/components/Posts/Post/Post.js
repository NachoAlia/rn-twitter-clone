import React, { useEffect, useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Avatar, Text } from "react-native-elements";
import { styles } from "./Post.style";
import {
  color,
  IconsButton,
  ImageAuto,
  screen,
  timePost,
} from "../../../utils";
import { useNavigation } from "@react-navigation/native";
import { PostButtonBar } from "./PostButtonBar";
import { Repost } from "./Repost";
import { useThemaContext } from "../../ThemeProvider";
import { domainUrl } from "../../../config/host";
import { Modal } from "../../Shared";
import { ImageScreen } from "../../../screens/Post/ImageScreen";

export function Post({ idPost }) {
  const [dataPost, setDataPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [dataRepost, setDataRepost] = useState(null);

  const thema = useThemaContext();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets/${idPost}`)
        .then((response) => response.json())
        .then((data) => {
          setDataPost(data);
          setDataRepost(data.retweet);
        })

        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const goPost = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.post,
      params: { dataPost },
    });
  };

  const onCloseOpenModal = () => setShowModal((prevState) => !prevState);

  return (
    <>
      {dataPost && (
        <>
          {!(dataPost.body || dataPost.photoTweet_url) && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 30,
              }}
            >
              <IconsButton name={"repost"} touchable={false} />
              <Text
                style={{
                  color: thema
                    ? color.light.textSecondary
                    : color.dark.textSecondary,
                }}
              >
                {dataPost.nickname} reposteo
              </Text>
            </View>
          )}
          <View
            style={
              dataPost.body || dataPost.photoTweet_url
                ? styles.container
                : styles.containerTight
            }
          >
            <View style={styles.photoUser}>
              <Avatar
                source={
                  dataPost.body || dataPost.photoTweet_url
                    ? dataPost.photoProfile_url
                      ? { uri: dataPost.photoProfile_url }
                      : require("../../../../assets/icons/default_user_photo.png")
                    : dataPost.retweet.photoProfile_url
                    ? { uri: dataPost.retweet.photoProfile_url }
                    : require("../../../../assets/icons/default_user_photo.png")
                }
                size="medium"
                rounded
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
                    @
                    {dataPost.body || dataPost.photoTweet_url
                      ? dataPost.username
                      : dataPost.retweet.username}
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
                {dataPost.body ? (
                  <View style={styles.body}>
                    <Text
                      style={[
                        styles.text,
                        { color: thema ? color.light.text : color.dark.text },
                      ]}
                    >
                      {dataPost.body}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}

                <TouchableOpacity style={styles.postButton} onPress={goPost} />

                {dataPost.photoTweet_url ? (
                  <View style={styles.imagePost}>
                    <TouchableOpacity onPress={onCloseOpenModal}>
                      <ImageAuto
                        uri={dataPost.photoTweet_url}
                        desiredWidth={Dimensions.get("window").width * 0.75}
                      />
                    </TouchableOpacity>
                    <Modal
                      fullScreen={true}
                      show={showModal}
                      close={onCloseOpenModal}
                      style={{
                        flex: 1,
                        width: "100%",
                        borderRadius: 0,
                        backgroundColor: thema
                          ? color.light.background
                          : color.dark.background,
                      }}
                    >
                      <ImageScreen close={onCloseOpenModal} data={dataPost} />
                    </Modal>
                  </View>
                ) : (
                  <></>
                )}
                {dataPost.retweet ? (
                  <Repost dataPost={dataPost.retweet} />
                ) : (
                  <></>
                )}
                <View style={{ marginTop: 20 }}>
                  <PostButtonBar idPost={dataPost.id} />
                </View>
              </View>
            </View>
          </View>
        </>
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
