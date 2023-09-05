import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
import { domainUrl } from "../config/host";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(true);
  const [friendsRequest, setFriendsRequest] = useState(null);
  const [friends, setFriends] = useState(null);

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

  const getFriendsRequest = async () => {
    try {
      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch pending friend requests.");
      }

      const data = await response.json();

      setFriendsRequest(data.received_friend_requests);
      console.log("ESTA ES LA DATA DE PENDING:____________", data.received_friend_requests);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getFriendsRequest();
  }, [updateInfo])

  const includedInFriendsRequest = (friendId) => {
    console.log(friendId);
    const result = friendsRequest?.some((friendRequest) => friendRequest.user_id.id === friendId);
    console.log("Is pending?: ", result);
    return result

  };

  const getFriends = async () => {
    try {
      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/accepted`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch pending friend requests.");
      }

      const data = await response.json();

      setFriends(data);
      console.log("ESTA ES LA DATA DE FRIEND:____________", data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {


    getFriends();
  }, [updateInfo])

  const includedInFriends = (friendId) => {
    console.log(friendId);
    const result = friends?.some((friend) => friend.friend_id.id === friendId);
    console.log("is friend?: ", result);
    return result

  };


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
          friends,
          setFriends,
          includedInFriends,
        },
        myFriendsRequest: {
          friendsRequest,
          setFriendsRequest,
          includedInFriendsRequest,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
