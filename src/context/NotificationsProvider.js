import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { domainUrl, cableConsumer } from "../config/host";
import { TabBarContext } from "./TabBarProvider";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  const { newNotifications, setNewNotifications } = useContext(TabBarContext);
  const [shouldUpdateNotifications, setShouldUpdateNotifications] =
    useState(true);
  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    socket = new WebSocket(cableConsumer);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: currentUser.id,
            channel: "NotificationsChannel",
          }),
        })
      );
    };
    socket.onclose = () => {
      //not yet implemented
    };
    socket.onerror = (error) => {
      console.error("Error en la conexión WebSocket: ", error);
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.message.type === "new-post" || data.type === "new-post") {
        handleReceivedMessage();
        //console.log(data);
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleReceivedMessage = () => {
    console.log("new-post.....................");
    setShouldUpdateNotifications((prevState) => !prevState);
    setNewNotifications(true);
  };

  const notifications_from_user = async (user_id) => {
    try {
      const response = await fetch(
        `${domainUrl}/users/${user_id}/notifications`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setShouldUpdateNotifications(true);
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificationsFromUser = () => notifications;

  const new_notification_post = (post_id, user_id) => {};
  const mark_as_read_notification = (notification_id) => {};
  const mark_all_as_read_notification = (user_id) => {};

  return (
    <NotificationsContext.Provider
      value={{
        shouldUpdateNotifications,
        setShouldUpdateNotifications,
        notifications_from_user,
        getNotificationsFromUser,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
