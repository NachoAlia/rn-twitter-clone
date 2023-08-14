import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useLayoutEffect,
} from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { styles } from "./MessagesList.styles";
import { FlatList } from "react-native-gesture-handler";
import { DirectMessagesContext, UserContext } from "../../../context";

import { Message } from "../Message/Message";
import { domainUrl, cableConsumer } from "../../../config/host";
import { color } from "../../../utils";

export function MessagesList(props) {
  const [messages, setMessages] = useState(null);
  const {
    shouldUpdateMessages,
    setShouldUpdateMessages,
    setShouldUpdateConversations,
  } = useContext(DirectMessagesContext);
  const { currentUser } = useContext(UserContext);
  const { conversation, imageChat } = props;

  const flatListRef = useRef();

  let socket;

  useLayoutEffect(() => {
    if (shouldUpdateMessages) {
      setShouldUpdateMessages(false);
      const fetchData = async () => {
        const response = await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/${conversation.id}/messages`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setMessages(result);
      };
      fetchData();
      setShouldUpdateConversations(false);
      scrollToBottom();
    }
  }, [shouldUpdateMessages]);

  useEffect(() => {
    socket = new WebSocket(cableConsumer);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: conversation.id,
            channel: "MessagesChannel",
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
      if (
        (data.message && data.message.type === "new_message") ||
        data.type === "welcome"
      ) {
        handleReceivedMessage();
      }
    };
    return () => {
      socket.close();
    };
  }, []);

  const handleReceivedMessage = () => {
    setShouldUpdateMessages(true);
  };

  const scrollToBottom = () => {
    if (flatListRef.current && messages?.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };
  const footerComponent = () =>
    shouldUpdateMessages && (
      <ActivityIndicator size={28} color={color.light.corporate} />
    );

  return (
    <View style={{ margin: 5 }}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => <Message item={item} imageChat={imageChat} />}
        keyExtractor={(item) => item.id}
        onLayout={scrollToBottom}
        onContentSizeChange={scrollToBottom}
        ListFooterComponent={footerComponent}
        inverted={false}
      />
    </View>
  );
}
