import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PostButtonBar.style";
import { IconsButton, color, screen } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";
import { domainUrl, cableConsumer } from "../../../../config/host";
import { UserContext, usereloadPostContext } from "../../../../context";
import { RepostsModal } from "../../Reposts";

export function PostButtonBar({ idPost, amount = true, size = 20 }) {
  const [dataPost, setDataPost] = useState(null);
  const [reload, setReload] = useState(true);
  const [isLike, setIsLike] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [visible, setVisible] = useState(false);

  const { currentUser } = useContext(UserContext);

  const thema = useThemaContext();

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
  }, [reload]);

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
        console.log(data);
        setReload((prevState) => !prevState);
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
  }, []);

  const navigation = useNavigation();

  const addComment = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.addComment,
      params: { dataPost },
    });
  };

  const toggleOverlay = () => {
    setVisible(!visible);
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
    });

    if (response.ok) {
      setIsLike(true);
    }
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
    setIsBookmark(true);
  };

  const removeBookmark = () => {
    setIsBookmark(false);
  };

  return (
    <>
      {dataPost && (
        <View style={styles.barPost}>
          <View style={styles.barElement}>
            <IconsButton name={"comment"} size={size} onPress={addComment} />
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
            />
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
        </View>
      )}
    </>
  );
}
