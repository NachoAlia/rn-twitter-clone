import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { styles } from "./ConversationList.styles";
import { Conversation } from "../Conversation/Conversation";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

import { DirectMessagesContext, UserContext } from "../../../context";
import { domainUrl, cableConsumer } from "../../../config/host";
import { ConversationOptionsScreen } from "../../../screens/Messages/ConversationOptionsScreen";

export function ConversationList(props) {
  const thema = useThemaContext();
  const { searchFilter } = props;
  const { currentUser } = useContext(UserContext);
  const [conversations, setConversations] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [conversationIdOption, setConversationIdOption] = useState(null);
  const { shouldUpdateConversations, setShouldUpdateConversations } =
    useContext(DirectMessagesContext);

  useLayoutEffect(() => {
    if (shouldUpdateConversations) {
      setShouldUpdateConversations(false);
      const fetchData = async () => {
        const response = await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/index`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setConversations(result);
      };

      fetchData();
    }
  }, [shouldUpdateConversations]);

  useEffect(() => {
    socket = new WebSocket(cableConsumer);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          command: "subscribe",
          identifier: JSON.stringify({
            id: currentUser.id,
            channel: "ConversationsChannel",
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
        (data.message && data.message.type === "update_conversation") ||
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
    setShouldUpdateConversations(true);
  };

  if (conversations === null) {
    return <ActivityIndicator color={color.light.corporate} size={28} />;
  }

  return (
    <>
      {conversations.length > 0 ? (
        <FlatList
          data={
            searchFilter
              ? conversations.filter(
                  (conversation) =>
                    conversation.user_receiver.username
                      .toString()
                      .toLowerCase()
                      .includes(searchFilter.toString().toLowerCase()) ||
                    conversation.last_message
                      .toString()
                      .toLowerCase()
                      .includes(searchFilter.toString().toLowerCase())
                )
              : conversations
          }
          renderItem={({ item }) => (
            <Conversation
              chatbox={item}
              setShowOptions={setShowOptions}
              setConversationIdOption={setConversationIdOption}
            />
          )}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl
              refreshing={shouldUpdateConversations}
              onRefresh={() => setShouldUpdateConversations(true)}
            />
          }
          style={{ marginTop: 30 }}
        />
      ) : (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: color.light.corporate,
              fontSize: 16,
            }}
          >
            Aun no tienes ninguna conversación
          </Text>
        </View>
      )}
      {showOptions && (
        <ConversationOptionsScreen
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          conversationIdOption={conversationIdOption}
          setShouldUpdateConversations={setShouldUpdateConversations}
        />
      )}
    </>
  );
}
