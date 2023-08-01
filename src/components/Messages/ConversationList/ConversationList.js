import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./ConversationList.styles";
import { Conversation } from "../Conversation/Conversation";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

import { UserContext } from "../../../context";
import { domainUrl } from "../../../config/host";
import { useNavigation } from "@react-navigation/native";

export function ConversationList() {
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [conversations, setConversations] = useState(null);

  useLayoutEffect(() => {
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
  }, [navigation]);
  if (conversations === null) {
    return <ActivityIndicator />;
  }
  return (
    <FlatList
      data={conversations}
      renderItem={({ item }) => <Conversation chatbox={item} />}
      keyExtractor={(item) => item.id}
      style={{ marginTop: 30 }}
    />
  );
}
