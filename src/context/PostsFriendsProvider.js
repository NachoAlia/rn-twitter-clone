import React, { useContext, useEffect, useState } from "react";
import { domainUrl } from "../config/host";
import { UserContext } from "./UserProvider";
import { log } from "react-native-reanimated";

export const postsFriendsContext = React.createContext();

export function usePostsFriendsContext() {
  const { dataPosts } = useContext(postsFriendsContext);
  return dataPosts;
}
export function useMorePostsFriendsContext() {
  const { morePosts } = useContext(postsFriendsContext);
  return morePosts;
}
export function useReloadFriendsContext() {
  const { reload } = useContext(postsFriendsContext);
  return reload;
}
export function useReloadingFriendsContext() {
  const { reloading } = useContext(postsFriendsContext);
  return reloading;
}
export function useReloadPostFriendsContext() {
  const { onReloadPosts } = useContext(postsFriendsContext);
  return onReloadPosts;
}

export function useHasMorePostsFriendsContext() {
  const { hasMorePosts } = useContext(postsFriendsContext);
  return hasMorePosts;
}

export function PostsFriendsProvider(props) {
  const [dataPosts, setDataPosts] = useState([]);
  const [reload, setReload] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    setHasMorePosts(true);
    currentUser?.id && fetchData();
  }, [reload, currentUser]);

  const fetchData = async () => {
    setReloading(true);

    await fetch(`${domainUrl}/users/${currentUser?.id}/tweets_from_friends`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setDataPosts(data);
          setLastPostId(data[data.length - 1].id);
        } else {
          setHasMorePosts(false);
        }
      })
      .then(() => {
        setReloading(false);
      })
      .catch((error) => console.error(error));
  };

  const fetchMorePots = async () => {
    await fetch(
      `${domainUrl}/users/${currentUser.id}/tweets_from_friends?last_tweet_id=${lastPostId}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length < 1) {
          setHasMorePosts(false);
        } else {
          setDataPosts((prevData) => [...prevData, ...data]);
          setLastPostId(data[data.length - 1].id);
          if (data.length < 5) {
            setHasMorePosts(false);
          }
        }
      })

      .then(setReloading(false))
      .catch((error) => console.error(error));
  };

  const morePosts = () => {
    if (lastPostId != 0) {
      setReloading(true);
      fetchMorePots();
    }
  };

  const onReloadPosts = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <postsFriendsContext.Provider
      value={{
        dataPosts,
        hasMorePosts,
        reload,
        reloading,
        morePosts,
        onReloadPosts,
      }}
    >
      {props.children}
    </postsFriendsContext.Provider>
  );
}
