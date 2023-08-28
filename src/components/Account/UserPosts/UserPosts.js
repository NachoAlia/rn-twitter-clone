import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useThemaContext } from "../../ThemeProvider";
import { Post } from "../../../components/Posts";
import { domainUrl } from "../../../config/host";
import { color } from "../../../utils";

export function UserPosts(props) {
  const thema = useThemaContext();
  const { userData, postCounter } = props;
  const [postIds, setPostIds] = useState(null);
  const [shouldUpdateList, setShouldUpdateList] = useState(true);

  useLayoutEffect(() => {
    setShouldUpdateList(false);
    setPostIds(null);
    const fetchData = async () => {
      const response = await fetch(
        `${domainUrl}/tweets/tweets_for_user/${userData.id}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setPostIds(result);
      postCounter.setCountPosts(result.length);
    };
    fetchData();
  }, [shouldUpdateList, userData.id]);

  return (
    <View
      style={{
        marginTop: 0,
        marginLeft: 0,
      }}
    >
      {postIds?.length > 0 ? (
        postIds?.map((post) => (
          <View style={{ marginBottom: 20 }}>
            <Post idPost={post.id} key={post.id} />
          </View>
        ))
      ) : (
        <Text
          style={{
            alignSelf: "center",
            marginTop: "20%",
            color: color.light.corporate,
          }}
        >
          Aun no has creado ningun post
        </Text>
      )}
    </View>
  );
}
