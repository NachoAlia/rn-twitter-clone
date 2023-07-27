import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Image, Text } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./PostButtonBar.style";
import { IconsButton, color, screen } from "../../../../utils";
import { useThemaContext } from "../../../ThemeProvider";
import { domainUrl } from "../../../../config/host";
import { UserContext, usereloadPostContext } from "../../../../context";
import { RepostsModal } from "../../Reposts";

export function PostButtonBar({
  dataPost,
  amount = true,
  size = 20,
  reload,
  isLiked,
}) {
  const [isLike, setIsLike] = useState(isLiked);
  const [isBookmark, setIsBookmark] = useState(false);
  const [visible, setVisible] = useState(false);

  const { currentUser } = useContext(UserContext);

  const thema = useThemaContext();

  const navigation = useNavigation();

  const addComment = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.addComment,
      params: { dataPost, reload },
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
      reload((prevState) => !prevState);
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
      reload((prevState) => !prevState);
    }
  };

  const giveBookmark = () => {
    setIsBookmark(true);
  };

  const removeBookmark = () => {
    setIsBookmark(false);
  };

  return (
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
          <IconsButton name={"like_border"} size={size} onPress={giveLike} />
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
          <IconsButton name={"bookmark"} size={size} onPress={removeBookmark} />
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
  );
}
