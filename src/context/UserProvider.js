import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();
import { domainUrl, cableConsumer } from "../config/host";

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentToken, setCurrentToken] = useState(null);
  const [updateInfo, setUpdateInfo] = useState(true);
  const [updateFriendship, setUpdateFriendship] = useState(true);
  const [friendshipsAccepted, setFriendshipsAccepted] = useState(null);
  const [friendshipsAcceptedId, setFriendshipsAcceptedId] = useState(null);
  const [friendshipsPending, setFriendshipsPending] = useState(null);
  const [friendshipsPendingReceived, setFriendshipsPendingReceived] = useState(null);

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


  const sendFriendRequest = async (otherPersonId) => {

    try {

      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/${otherPersonId}/create`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Unable to send friend request.");
      }

      return "Friend request sent.";
    } catch (error) {
      throw error;
    }
  }

  const deleteFriendship = async (requestId) => {
    try {

      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/${requestId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete friendship.");
      }

      return "Friendship deleted.";
    } catch (error) {
      throw error;
    }
  }

  const acceptFriendship = async (requestId) => {
    try {

      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships/${requestId}/accept`, {
        method: "POST"
      });

      if (!response.ok) {
        throw new Error("Unabled to accept friendship.");
      }

      return "Friendship accepted.";
    } catch (error) {
      throw error;
    }
  }


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

  const getFriendshipsPendingReceived = async () => {
    try {
      const response = await fetch(`${domainUrl}/users/${currentUser.id}/friendships`, {
        method: "GET"
      });

      if (!response.ok) {
        throw new Error("Unable to fetch pending friend requests.");
      }

      const data = await response.json();

      setFriendshipsPendingReceived(data.received_friend_requests);
      console.log("ESTA ES LA DATA DE FRIENDSHIPS PENDING RECEIVED:____________", data.received_friend_requests);
    } catch (error) {
      throw error;
    }
  }



  useEffect(() => {
    getFriendshipsPending();
    getFriendshipsAccepted();
    getFriendshipsPendingReceived();
    // acceptFriendship()
    // deleteFriendship()
    // sendFriendRequest()
  }, [
    updateInfo,
    updateFriendship,
    // acceptFriendship,
    // deleteFriendship,
    // sendFriendRequest,
  ])

  const includedInFriendshipsAccepted = (friendId) => {
    console.log(friendId);

    const acceptedFriendship = friendshipsAccepted?.find(
      (friendship) => friendship.friend_id.id === friendId && friendship.status === 'accepted'
    );

    if (acceptedFriendship) {
      setFriendshipsAcceptedId(acceptedFriendship.id);
      console.log("Set Friendships Accepted ID:", acceptedFriendship.id);
      return true;
    } else {
      setFriendshipsAcceptedId(null);
      console.log("Friendships Accepted ID set to null");
      return false;
    }
  };

  const includedInFriendshipsPending = (friendId) => {
    console.log(friendId);
    const result = friendshipsPending?.some((friendship) => friendship.friend_id.id === friendId);
    console.log("included In Friendships Pending?: ", result);
    return result
  };

  useEffect(() => {
    socket = new WebSocket(cableConsumer);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: currentUser.id,
            channel: "FriendshipsChannel",
          }),
        })
      );
    };
    socket.onclose = () => {
      //not yet implemented
    };
    socket.onerror = (error) => {
      console.error("WebSocket connection failed: ", error);
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("ERROR", data);
      if (
        (data.message && data.message.type === "new_message") ||
        data.type === "welcome"
      ) {
        getFriendshipsPending();
        getFriendshipsAccepted();
      }
    };
    return () => {
      socket.close();
    };
  }, []);

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
          friendshipsPendingReceived,
          friendshipsAcceptedId,
          updateFriendship,
          setFriendshipsAccepted,
          setFriendshipsAcceptedId,
          setFriendshipsPending,
          includedInFriendshipsAccepted,
          includedInFriendshipsPending,
          acceptFriendship,
          deleteFriendship,
          sendFriendRequest,
          setUpdateFriendship,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
