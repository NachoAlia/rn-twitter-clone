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
import {
  DirectMessagesContext,
  DrawerContext,
  UserContext,
} from "../../../context";

import { useThemaContext } from "../../ThemeProvider";

import { Message } from "../Message/Message";
import { domainUrl } from "../../../config/host";
import { color } from "../../../utils";

export function MessagesList(props) {
  const [messages, setMessages] = useState(null);
  const [updateMessages, setUpdateMessages] = useState(true);
  const { setDrawerScreenOptions } = useContext(DrawerContext);
  const { shouldUpdateMessages, setShouldUpdateMessages } = useContext(
    DirectMessagesContext
  );
  const { currentUser } = useContext(UserContext);

  const { userReceiver, conversation } = props;
  const flatListRef = useRef();

  useLayoutEffect(() => {
    if (shouldUpdateMessages) {
      setUpdateMessages(true);
      const fetchData = async () => {
        const response = await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/${conversation.id}/messages`,
          {
            method: "GET",
          }
        );
        const result = await response.json();
        setMessages(result);
        console.log(result);
        setUpdateMessages(false);
      };
      fetchData();
      setShouldUpdateMessages(false);
      scrollToBottom();
    }
  }, [shouldUpdateMessages]);

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
        renderItem={({ item }) => <Message item={item} />}
        keyExtractor={(item) => item.id}
        onLayout={scrollToBottom}
        onContentSizeChange={scrollToBottom}
        ListFooterComponent={footerComponent}
        inverted={false}
      />
    </View>
  );
}
