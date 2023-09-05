import React, { useContext, useEffect, useState } from "react";
import { domainUrl } from "../config/host";

export const postsContext = React.createContext();

export function usePostsContext() {
  const { dataPosts } = useContext(postsContext);
  return dataPosts;
}
export function useMorePostsContext() {
  const { morePosts } = useContext(postsContext);
  return morePosts;
}
export function useReloadingContext() {
  const { reloading } = useContext(postsContext);
  return reloading;
}
export function useReloadPostContext() {
  const { onReloadPosts } = useContext(postsContext);
  return onReloadPosts;
}

export function useHasMorePostsContext() {
  const { hasMorePosts } = useContext(postsContext);
  return hasMorePosts;
}

export function PostsProvider(props) {
  const [dataPosts, setDataPosts] = useState([]);
  const [reload, setReload] = useState(true);
  const [reloading, setReloading] = useState(false);
  const [lastPostId, setLastPostId] = useState(0);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  useEffect(() => {
    setHasMorePosts(true);
    fetchData();
  }, [reload]);

  const fetchData = async () => {
    setReloading(true);
    await fetch(`${domainUrl}/tweets`)
      .then((response) => response.json())
      .then((data) => {
        setDataPosts(data);
        setLastPostId(data[data.length - 1].id);
      })
      .then(setReloading(false))
      .catch((error) => console.error(error));
  };

  const morePosts = async () => {
    if (lastPostId != 0) {
      setReloading(true);
      await fetch(`${domainUrl}/tweets?last_tweet_id=${lastPostId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.length < 1) {
            setHasMorePosts(false);
          } else {
            setDataPosts((prevData) => [...prevData, ...data]);
            setLastPostId(data[data.length - 1].id);
          }
        })

        .then(setReloading(false))
        .catch((error) => console.error(error));
    }
  };

  const onReloadPosts = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <postsContext.Provider
      value={{ dataPosts, hasMorePosts, reloading, morePosts, onReloadPosts }}
    >
      {props.children}
    </postsContext.Provider>
  );
}
