import React, { useEffect, useState } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";
import { Avatar, Overlay, Text } from "react-native-elements";
import { styles } from "./Post.style";
import {
  color,
  GoToUserProfile,
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
import { PostScreen } from "../../../screens/Post";

export function Post({ idPost }) {
  const [dataPost, setDataPost] = useState(null);
  const [deleteData, setDeleteData] = useState(false);
  const [showModalImage, setShowModalImage] = useState(false);
  const [showModalPost, setShowModalPost] = useState(false);
  const [dataRepost, setDataRepost] = useState(null);

  const thema = useThemaContext();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets/${idPost}`)
        .then((response) => response.json())
        .then((data) => {
          if (!(data.body || data.photoTweet_url)) {
            setDataRepost(data.retweet);
          }
          setDataPost(data);
        })

        .catch((error) => console.error(error));
    };

    fetchData();
  }, []);

  const onCloseOpenModalPost = () =>
    setShowModalPost((prevState) => !prevState);

  const onCloseOpenModalImage = () =>
    setShowModalImage((prevState) => !prevState);

  return (
    <>
      {dataPost && (
        <>
          <>
            {dataRepost && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 30,
                }}
              >
                {console.log(deleteData)}
                {deleteData ? (
                  <View
                    style={{
                      height: "100%",
                      width: "100%",
                      position: "absolute",
                      backgroundColor: "#000000",
                    }}
                  >
                    {console.log(`aca esta en ${deleteData}`)}
                  </View>
                ) : (
                  <></>
                )}
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
            <View style={dataRepost ? styles.containerTight : styles.container}>
              <View style={styles.photoUser}>
                <Avatar
                  source={
                    dataRepost
                      ? dataRepost.photoProfile_url
                        ? { uri: dataRepost.photoProfile_url }
                        : require("../../../../assets/icons/default_user_photo.png")
                      : dataPost.photoProfile_url
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
                        {
                          color: thema ? color.light.text : color.dark.text,
                        },
                      ]}
                    >
                      {dataRepost ? dataRepost.nickname : dataPost.nickname}
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
                      @{dataRepost ? dataRepost.username : dataPost.username}
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
                          {
                            color: thema ? color.light.text : color.dark.text,
                          },
                        ]}
                      >
                        {dataPost.body}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  {dataRepost?.body ? (
                    <View style={styles.body}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: thema ? color.light.text : color.dark.text,
                          },
                        ]}
                      >
                        {dataRepost.body}
                      </Text>
                    </View>
                  ) : (
                    <></>
                  )}
                  <TouchableOpacity
                    style={styles.postButton}
                    onPress={onCloseOpenModalPost}
                  />
                  <Modal
                    fullScreen={true}
                    show={showModalPost}
                    close={onCloseOpenModalPost}
                    style={{
                      flex: 1,
                      width: "100%",
                      borderRadius: 0,
                      backgroundColor: thema
                        ? color.light.background
                        : color.dark.background,
                    }}
                  >
                    <PostScreen
                      idPost={dataRepost ? dataRepost.id : dataPost.id}
                      close={onCloseOpenModalPost}
                    />
                  </Modal>
                  {dataPost.photoTweet_url ? (
                    <View style={styles.imagePost}>
                      <TouchableOpacity onPress={onCloseOpenModalImage}>
                        <ImageAuto
                          uri={dataPost.photoTweet_url}
                          desiredWidth={Dimensions.get("window").width * 0.75}
                        />
                      </TouchableOpacity>
                      <Modal
                        fullScreen={true}
                        show={showModalImage}
                        close={onCloseOpenModalImage}
                        style={{
                          flex: 1,
                          width: "100%",
                          borderRadius: 0,
                          backgroundColor: thema
                            ? color.light.background
                            : color.dark.background,
                        }}
                      >
                        <ImageScreen
                          close={onCloseOpenModalImage}
                          data={dataPost}
                        />
                      </Modal>
                    </View>
                  ) : dataRepost?.photoTweet_url ? (
                    <View style={styles.imagePost}>
                      <TouchableOpacity onPress={onCloseOpenModalImage}>
                        <ImageAuto
                          uri={dataRepost.photoTweet_url}
                          desiredWidth={Dimensions.get("window").width * 0.75}
                        />
                      </TouchableOpacity>
                      <Modal
                        fullScreen={true}
                        show={showModalImage}
                        close={onCloseOpenModalImage}
                        style={{
                          flex: 1,
                          width: "100%",
                          borderRadius: 0,
                          backgroundColor: thema
                            ? color.light.background
                            : color.dark.background,
                        }}
                      >
                        <ImageScreen
                          close={onCloseOpenModalImage}
                          data={dataRepost}
                        />
                      </Modal>
                    </View>
                  ) : (
                    <></>
                  )}
                  {!dataRepost ? (
                    dataPost.retweet ? (
                      <Repost dataPost={dataPost.retweet} />
                    ) : (
                      <></>
                    )
                  ) : (
                    <></>
                  )}
                  <View style={{ marginTop: 20 }}>
                    {dataRepost?.id ? (
                      <>
                        <PostButtonBar
                          removeFlag={setDeleteData}
                          idPost={dataRepost.id}
                        />
                      </>
                    ) : (
                      <PostButtonBar
                        removeFlag={setDeleteData}
                        idPost={dataPost.id}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
          </>

          {dataPost?.thread_tweet_id ? (
            <View style={styles.threadStyle}>
              <View style={styles.threadUser}>
                <Avatar
                  source={require("../../../../assets/icons/default_user_photo.png")}
                  size="small"
                  rounded
                  onPress={() => GoToUserProfile(navigation, dataPost.user_id)}
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
                backgroundColor: thema
                  ? color.light.contrast
                  : color.dark.contrast,
              },
            ]}
          />
          {deleteData ? (
            <View
              style={[
                styles.deleteContainer,
                {
                  backgroundColor: `${
                    thema ? color.dark.background : color.light.background
                  }50`,
                },
              ]}
            >
              <View
                style={[
                  styles.deleteMesage,
                  {
                    backgroundColor: thema
                      ? color.light.background
                      : color.dark.background,
                  },
                ]}
              >
                <Text
                  style={{
                    fontSize: 25,
                    color: thema ? color.light.text : color.dark.text,
                  }}
                >
                  Lo lamento!
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    color: thema ? color.light.text : color.dark.text,
                  }}
                >
                  Este Post fue eliminado.
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
}
