import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
import { domainUrl } from "../config/host";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(true);
  const [friendshipsAccepted, setFriendshipsAccepted] = useState(null);
  const [friendshipsPending, setFriendshipsPending] = useState(null);

  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser) {
        const response = await fetch(`${domainUrl}/users/${currentUser.id}`);
        const data = await response.json();
        setCurrentUser(data);
      }
      setUpdateInfo(false);
    };
    fetchData();
  }, [updateInfo]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${domainUrl}/users/${currentUser?.id}/bookmarks/index`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setBookmarks(result);
    };
    fetchData();
  }, [updateInfo]);






  //*************** empieza friends
  //*************** empieza friends
  //*************** empieza friends
  //*************** empieza friends

  const getFriendshipsAccepted = async () => {
    try {
      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/accepted`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch pending friend requests.");
      }

      const data = await response.json();

      setFriendshipsAccepted(data);
      console.log("ESTA ES LA DATA DE FRIENDSHIPS ACCEPTED:____________", data);
    } catch (error) {
      throw error;
    }
  }

  const getFriendshipsPending = async () => {
    try {
      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/pending`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch pending friend requests.");
      }

      const data = await response.json();

      setFriendshipsPending(data);
      console.log("ESTA ES LA DATA DE FRIENDSHIPS PENDING:____________", data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getFriendshipsPending();
    getFriendshipsAccepted();
  }, [updateInfo])

  const includedInFriendshipsAccepted = (friendId) => {
    console.log(friendId);
    const result = friendshipsAccepted?.some((friend) => friend.friend_id.id === friendId);
    console.log("included In Friendships Accepted: ", result);
    return result
  };

  const includedInFriendshipsPending = (friendId) => {
    console.log(friendId);
    const result = friendshipsPending?.some((friend) => friend.friend_id.id === friendId);
    console.log("included In Friendships Pending?: ", result);
    return result
  };

  //*************** termina friends
  //*************** termina friends
  //*************** termina friends
  //*************** termina friends



  const addBookmark = (postId) => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domainUrl}/users/${currentUser?.id}/bookmarks/${postId}/create`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error(`No-ok. Status: ${response.status}`);
        }

        const result = await response.json();
        setBookmarks([...bookmarks, result]);
        setUpdateInfo(true);
      } catch (error) {
        console.error("Error al agregar bookmark:", error);
      }
    };

    fetchData();
  };
  const removeBookmark = (postId) => {
    const fetchData = async () => {
      await fetch(`${domainUrl}/users/${currentUser?.id}/bookmarks/${postId}`, {
        method: "DELETE",
      }).then(() => {
        setBookmarks(
          bookmarks.filter((bookmark) => bookmark?.tweet_id !== postId)
        );
        setUpdateInfo(true);
      });
    };
    fetchData();
  };

  const removeAllBookmarks = () => {
    const fetchData = async () => {
      try {
        await fetch(`${domainUrl}/users/${currentUser?.id}/bookmarks`, {
          method: "DELETE",
        });
        setBookmarks([]);
        setUpdateInfo(true);
      } catch (error) {
        console.error("Error al eliminar los marcadores:", error);
      }
    };
    fetchData();
  };
  const includedInBookmark = (postId) => {
    return bookmarks?.some((bookmark) => bookmark.tweet_id === postId);
  };

  const onLoginSuccess = async (data) => {
    setCurrentUser(data.user);
    setCurrentToken(data.token);
    setUpdateInfo(true);
  };

  const onLogoutAction = () => {
    setCurrentUser(null);
    setCurrentToken(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        currentToken,
        setUpdateInfo,
        updateInfo,
        onLoginSuccess,
        onLogoutAction,
        user_bookmark: {
          bookmarks,
          addBookmark,
          includedInBookmark,
          removeBookmark,
          removeAllBookmarks,
        },
        myFriends: {
          friendshipsAccepted,
          friendshipsPending,
          setFriendshipsAccepted,
          setFriendshipsPending,
          includedInFriendshipsAccepted,
          includedInFriendshipsPending,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
