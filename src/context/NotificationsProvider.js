import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { domainUrl, cableConsumer } from "../config/host";
import { TabBarContext } from "./TabBarProvider";

import { Audio } from "expo-av";

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const { currentUser } = useContext(UserContext);
  // const { newNotifications, setNewNotifications } = useContext(TabBarContext);
  // const [shouldUpdateNotifications, setShouldUpdateNotifications] =
  //   useState(true);
  const [loadNotifications, setLoadNotifications] = useState(true);
  const [notifications, setNotifications] = useState(null);
  const [newNotifications, setNewNotifications] = useState(false);
  // Función para cargar las notificaciones desde el servidor

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${domainUrl}/users/${currentUser.id}/notifications`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
        setNotifications(data);
        const hasNew = data.some((notification) => notification.status === 0);
        setNewNotifications(hasNew);
      } catch (error) {
        console.error("Error al cargar notificaciones:", error);
      } finally {
        setLoadNotifications(true);
      }
    };

    if (currentUser && loadNotifications) {
      setLoadNotifications(false);
      fetchData();
    }
  }, [currentUser, loadNotifications]);

  useEffect(() => {
    let socket = new WebSocket(cableConsumer);

    const handleWebSocketOpen = () => {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: currentUser?.id,
            channel: "NotificationsChannel",
          }),
        })
      );
    };

    const handleWebSocketClose = () => {
      // Implementa lógica de cierre si es necesario
    };

    const handleWebSocketError = (error) => {
      console.error("Error en la conexión WebSocket:", error);
    };

    const handleWebSocketMessage = (event) => {
      const data = JSON.parse(event.data);

      if (
        data?.message?.type === "new-post" ||
        data?.type === "new-post" ||
        data?.type === "new-message" ||
        data?.message?.type === "new-message"
      ) {
        console.log("Llegó un mensaje...");
        handleReceivedMessage();
      }
    };

    socket.addEventListener("open", handleWebSocketOpen);
    socket.addEventListener("close", handleWebSocketClose);
    socket.addEventListener("error", handleWebSocketError);
    socket.addEventListener("message", handleWebSocketMessage);

    return () => {
      socket.close();
    };
  }, []);

  const handleReceivedMessage = () => {
    console.log("Nuevo mensaje recibido");
    setLoadNotifications(true);
  };

  const mark_all_as_read_notification = async () => {
    try {
      const response = await fetch(
        `${domainUrl}/users/${currentUser?.id}/notifications/mark_all_as_read`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        // Marcamos loadNotifications como true para forzar la recarga de notificaciones
        setLoadNotifications(true);
      } else {
        console.error("Error al marcar todas las notificaciones como leídas");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <NotificationsContext.Provider
      value={{
        // shouldUpdateNotifications,
        // setShouldUpdateNotifications,
        // notifications_from_user,
        mark_all_as_read_notification,
        // hasUnreadNotifications,
        loadNotifications,
        newNotifications,
        // setLoadNotifications,
        notifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
