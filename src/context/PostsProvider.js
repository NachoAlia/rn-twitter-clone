import React, { useContext, useEffect, useState } from "react";
import { domainUrl } from "../config/host";

export const postsContext = React.createContext();
export const reloadPostContext = React.createContext();

export function usePostsContext() {
  return useContext(postsContext);
}
export function usereloadPostContext() {
  return useContext(reloadPostContext);
}

export function PostsProvider(props) {
  const [dataPosts, setDataPosts] = useState(null);
  const [reload, setReload] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      fetch(`${domainUrl}/tweets`)
        .then((response) => response.json())
        .then((data) => setDataPosts(data))
        .catch((error) => console.error(error));
    };

    fetchData();
  }, [reload]);

  const onReloadPost = () => {
    setReload((prevState) => !prevState);
  };

  return (
    <postsContext.Provider value={dataPosts}>
      <reloadPostContext.Provider value={onReloadPost}>
        {props.children}
      </reloadPostContext.Provider>
    </postsContext.Provider>
  );
}
