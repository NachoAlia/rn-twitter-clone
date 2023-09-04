import React, { useContext, useEffect, useState } from "react";
import { domainUrl } from "../../config/host";
import { UserContext } from "../../context";

export const BookmarkList = () => {
  const { currentUser } = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${domainUrl}/users/${currentUser.id}/bookmarks/index`,
        { method: "GET" }
      );
      const result = await response.json();
      setPosts(result);
    };
    fetchData();
  }, []);
  return posts;
};
