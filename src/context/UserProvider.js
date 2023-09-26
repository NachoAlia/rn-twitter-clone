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
  // const [friendshipId, setFriendshipId] = useState(null);

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
        console.log(response);
        throw new Error("Unable to send friend request.");
      }

      return "Friend request sent.";
    } catch (error) {
      throw error;
    }
  }

  const deleteFriendship = async (requestId) => {

    // setFriendshipId(requestId);

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

      // console.log("ESTA ES LA DATA DE FRIENDSHIPS ACCEPTED:____________", data);
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
      // console.log("ESTA ES LA DATA DE FRIENDSHIPS PENDING:____________", data);
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
      // console.log("ESTA ES LA DATA DE FRIENDSHIPS PENDING RECEIVED:____________", data.received_friend_requests);
    } catch (error) {
      throw error;
    }
  }



  useEffect(() => {
    getFriendshipsPending();
    getFriendshipsAccepted();
    getFriendshipsPendingReceived();
  }, [
    updateInfo,
    updateFriendship,
  ])

  const includedInFriendshipsAccepted = (friendId) => {
    // console.log(friendId);

    const acceptedFriendship = friendshipsAccepted?.find(
      (friendship) => friendship.friend_id.id === friendId && friendship.status === 'accepted'
    );

    if (acceptedFriendship) {
      setFriendshipsAcceptedId(acceptedFriendship.id);
      // setFriendshipId(acceptedFriendship.id);
      // console.log("Set Friendships Accepted ID:", acceptedFriendship.id);
      return true;
    } else {
      setFriendshipsAcceptedId(null);
      // setFriendshipId(null);
      // console.log("Friendships Accepted ID set to null");
      return false;
    }
  };

  const includedInFriendshipsPending = (friendId) => {
    // console.log(friendId);
    const result = friendshipsPending?.some((friendship) => friendship.friend_id.id === friendId);
    // console.log("included In Friendships Pending?: ", result);
    // setFriendshipId(result.id);
    return result
  };

  useEffect(() => {


    if (currentUser) {
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
      console.log("este es el socket: ", socket);
      socket.onclose = () => {
        //not yet implemented
      };
      socket.onerror = (error) => {
        console.error("WebSocket connection failed: ", error);
      };
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.identifier == `{\"id\":${currentUser.id},\"channel\":\"FriendshipsChannel\"}`) {
          console.log("****");
          console.log("****");
          console.log("****");
          console.log("1: (data): ", data);
          console.log("2: (data.message): ", data.message);
          console.log("3: (data.type): ", data.type);
          console.log("4: (socket): ", socket);
          console.log("5: (socket.onmessage): ", socket.onmessage);
          console.log("6: (socket.onmessage.event): ", socket.onmessage.event);
          console.log("****");
          console.log("****");
          console.log("****");
        }

        console.log(data);
        // console.log(data.body);

        // if (data.type == ((pending_friendship) || (accepted_friendship) || (deleted_friendship))) {
        //   console.log(data);
        // }

        // // console.log(data.message);
        // // console.log(data.message.type);
        // // console.log(data.type);
        // // if (
        // //   (data.message && data.message.type === "pending_friendship") || (data.message && data.message.type === "accepted_friendship") || (data.message && data.message.type === "deleted_friendship")
        // // ) {
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");
        // //   console.log(data);
        // //   console.log(data.message);
        // //   console.log(data.message.type);
        // //   // console.log(data.type);
        // //   // getFriendshipsPending();
        // //   // getFriendshipsPendingReceived();
        // //   // getFriendshipsAccepted();
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");
        // //   console.log("GOOOOO!!!!");

        // // }

        // if (
        //   (data.message || data.type === "pending_friendship")
        // ) {
        //   console.log(data);
        //   console.log("SE EJECUTA PARA PENDING");
        // }

        // if (
        //   (data.message || data.type === "accepted_friendship")
        // ) {
        //   console.log(data);
        //   console.log("SE EJECUTA PARA ACCEPTED");
        // }

        // if (
        //   (data.message || data.type === "deleted_friendship")
        // ) {
        //   console.log(data);
        //   console.log("SE EJECUTA PARA DELETED");
        // }

        // socket.addEventListener('message', (event) => {
        //   console.log('Mensaje recibido del servidor:', event.data);
        // });
      };

      // socket.on('message', (message) => {
      //   // Imprime el mensaje en la consola
      //   console.log('Mensaje del servidor:', message);

      //   // Luego, puedes hacer lo que necesites con el mensaje, como actualizar la interfaz de usuario, etc.
      // });

      return () => {
        // friendshipId,
        socket.close();
      };
    }
  }, [currentUser]);

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
