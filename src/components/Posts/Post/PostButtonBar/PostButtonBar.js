import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { styles } from "./PostButtonBar.style";
import { IconsButton, color } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";
import { Modal } from "../../../Shared";
import { domainUrl, cableConsumer } from "../../../../config/host";
import { UserContext } from "../../../../context";
import { RepostsModal } from "../../Reposts";
import { AddRepostScreen, AddCommentScreen } from "../../../../screens/Post/";
import { DeletepostModal } from "../DeletePostModal";

export function PostButtonBar({
  idPost,
  removeFlag,
  amount = true,
  size = 20,
  recharge = false,
  reloadPost = null,
}) {
  const [dataPost, setDataPost] = useState(null);
  const [reload, setReload] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [visible, setVisible] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showModalRepost, setShowModalRepost] = useState(false);
  const [showModalComment, setShowModalComment] = useState(false);

  const { currentUser, user_bookmark, setUpdateInfo, updateInfo } =
    useContext(UserContext);
  const thema = useThemaContext();
  const isBookmark = user_bookmark.includedInBookmark(idPost) || false;

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets/${idPost}`)
        .then((response) => response.json())
        .then((data) => {
          setIsLike(data.likes.some((like) => like.user_id === currentUser.id));

          setDataPost(data);
        })

        .catch((error) => console.error(error));
    };

    fetchData();
  }, [reload, idPost]);

  useEffect(() => {
    const socket = new WebSocket(cableConsumer);

    socket.onopen = () => {
      const subscriptionParams = {
        command: "subscribe",
        identifier: JSON.stringify({
          tweet_id: idPost,
          channel: "TweetChannel",
        }),
      };
      socket.send(JSON.stringify(subscriptionParams));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.message === "tweet_updated") {
        setReload((prevState) => !prevState);
        if (recharge == true) {
          reloadPost((prevState) => !prevState);
        }
      }
      if (data.message === "tweet_deleted") {
        removeFlag((prevState) => !prevState);
        setDataPost(null);
      }
    };

    socket.onerror = (error) => {
      console.error("Error WebSocket:", error);
    };

    socket.onclose = () => {
      console.log("Conexión WebSocket cerrada:");
    };

    return () => {
      socket.close();
    };
  }, [idPost]);

  const onCloseOpenModalRepost = () =>
    setShowModalRepost((prevState) => !prevState);

  const onCloseOpenModalComment = () =>
    setShowModalComment((prevState) => !prevState);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const toggleOverlayDelete = () => {
    setConfirmDelete(!confirmDelete);
  };
  const giveLike = async () => {
    const route = `/tweets/${dataPost.id}/likes`;
    const apiUrl = `${domainUrl}${route}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify({ user_id: currentUser.id }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => setIsLike(true))
      .catch(() => setIsLike(false));

    //if (response.ok) {}
  };

  const removeLike = async () => {
    const idlike = dataPost.likes.find(
      (item) => item.user_id === currentUser.id
    );

    const route = `/tweets/${dataPost.id}/likes/${idlike.id}`;
    const apiUrl = `${domainUrl}${route}`;

    const response = await fetch(apiUrl, {
      method: "DELETE",
    });

    if (response.ok) {
      setIsLike(false);
    }
  };

  const giveBookmark = () => {
    user_bookmark.addBookmark(dataPost.id);
    setUpdateInfo(true);
    setReload(true);
  };

  const removeBookmark = () => {
    user_bookmark.removeBookmark(dataPost.id);
    setUpdateInfo(true);
    setReload(true);
  };

  return (
    <>
      {dataPost && (
        <View style={styles.barPost}>
          <View style={styles.barElement}>
            <IconsButton
              name={"comment"}
              size={size}
              onPress={onCloseOpenModalComment}
            />
            {amount ? (
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
                {dataPost.comments_count}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.barElement}>
            <Modal
              fullScreen={true}
              show={showModalComment}
              close={onCloseOpenModalComment}
              style={{
                flex: 1,
                width: "100%",
                borderRadius: 0,
                backgroundColor: thema
                  ? color.light.background
                  : color.dark.background,
              }}
            >
              <AddCommentScreen
                close={onCloseOpenModalComment}
                data={dataPost}
              />
            </Modal>
            <IconsButton name={"repost"} size={size} onPress={toggleOverlay} />
            {amount ? (
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
                {dataPost.retweet_count}
              </Text>
            ) : (
              <></>
            )}
            <RepostsModal
              visible={visible}
              onBackdropPress={toggleOverlay}
              dataPost={dataPost}
              citeCase={onCloseOpenModalRepost}
            />
            <Modal
              fullScreen={true}
              show={showModalRepost}
              close={onCloseOpenModalRepost}
              style={{
                flex: 1,
                width: "100%",
                borderRadius: 0,
                backgroundColor: thema
                  ? color.light.background
                  : color.dark.background,
              }}
            >
              <AddRepostScreen close={onCloseOpenModalRepost} data={dataPost} />
            </Modal>
          </View>
          <View style={styles.barElement}>
            {isLike ? (
              <IconsButton name={"like"} size={size} onPress={removeLike} />
            ) : (
              <IconsButton
                name={"like_border"}
                size={size}
                onPress={giveLike}
              />
            )}
            {amount ? (
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
                {dataPost.likes_count}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.barElement}>
            {isBookmark ? (
              <IconsButton
                name={"bookmark"}
                size={size}
                onPress={removeBookmark}
              />
            ) : (
              <IconsButton
                name={"bookmark_border"}
                size={size}
                onPress={giveBookmark}
              />
            )}
          </View>
          <View style={styles.barElement}>
            <IconsButton name={"share"} size={size} />
          </View>
          {currentUser.id === dataPost.user_id ? (
            <View style={styles.barElement}>
              <IconsButton
                name={"trash"}
                size={size}
                onPress={toggleOverlayDelete}
              />
            </View>
          ) : (
            <></>
          )}
          <DeletepostModal
            visible={confirmDelete}
            onBackdropPress={toggleOverlayDelete}
            dataPost={dataPost}
          />
        </View>
      )}
    </>
  );
}
