import React, { useState, useLayoutEffect, useContext } from "react";
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
import { domainUrl } from "../../../config/host";
import { useNavigation } from "@react-navigation/native";
import { ConversationOptionsScreen } from "../../../screens/Messages/ConversationOptionsScreen";

export function ConversationList() {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [conversations, setConversations] = useState(null);
  const [showOptions, setShowOptions] = useState(null);
  const [conversationIdOption, setConversationIdOption] = useState(null);
  const { shouldUpdateConversations, setShouldUpdateConversations } =
    useContext(DirectMessagesContext);

  useLayoutEffect(() => {
    if (shouldUpdateConversations) {
      const fetchData = async () => {
        const response = await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/index`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setConversations(result);
        setShouldUpdateConversations(false);
      };

      fetchData();
    }
  }, [navigation, shouldUpdateConversations]);
  if (conversations === null) {
    return <ActivityIndicator />;
  }

  return (
    <>
      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
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
