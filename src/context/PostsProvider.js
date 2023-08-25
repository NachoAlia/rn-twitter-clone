import React, { useContext, useEffect, useState } from "react";
import { domainUrl } from "../config/host";

export const postsContext = React.createContext();
export const morePostContext = React.createContext();
export const reloadPostContext = React.createContext();

export function usePostsContext() {
  return useContext(postsContext);
}
export function useMorePostsContext() {
  return useContext(morePostContext);
}
export function usereloadPostContext() {
  return useContext(reloadPostContext);
}

export function PostsProvider(props) {
  const [dataPosts, setDataPosts] = useState(null);
  const [reload, setReload] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets`)
        .then((response) => response.json())
        .then((data) => setDataPosts(data))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [reload]);

  const morePosts = () => {
    setLastPostId(dataPosts[dataPosts.length - 1].id);

    const fetchMoreData = () => {
      fetch(`${domainUrl}/tweets?last_tweet_id=${lastPostId}`)
        .then((response) => response.json())
        .then((data) => {
          setDataPosts((prevData) => [...prevData, ...data]);
        })
        .catch((error) => console.error(error));
    };

    fetchMoreData();
  };

  const onReloadPost = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <postsContext.Provider value={dataPosts}>
      <morePostContext.Provider value={morePosts}>
        <reloadPostContext.Provider value={onReloadPost}>
          {props.children}
        </reloadPostContext.Provider>
      </morePostContext.Provider>
    </postsContext.Provider>
  );
}
