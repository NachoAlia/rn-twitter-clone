import React, { createContext, useContext, useState } from "react";
import { UserContext } from "./UserProvider";
import { domainUrl } from "../config/host";
export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [shouldUpdateNotifications, setShouldUpdateNotifications] =
    useState(true);
  const [notifications, setNotifications] = useState(null);

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
