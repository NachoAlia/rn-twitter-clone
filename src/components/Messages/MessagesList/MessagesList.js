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
import { UserContext } from "../../../context";

import { useThemaContext } from "../../ThemeProvider";

import { Message } from "../Message/Message";
import { domainUrl } from "../../../config/host";
import { color } from "../../../utils";

export function MessagesList({ userReceiver }) {
  const [messages, setMessages] = useState(null);
  const [updateMessages, setUpdateMessages] = useState(true);
  const { currentUser } = useContext(UserContext);
  const flatListRef = useRef();

  useLayoutEffect(() => {
    setUpdateMessages(true);
    const fetchData = async () => {
      const response = await fetch(
        `${domainUrl}/users/${currentUser.id}/messages/${userReceiver.id}/getCurrentConversation`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setMessages(result);
      setUpdateMessages(false);
    };

    fetchData();
    // scrollToBottom();
  }, []);

  useEffect(() => {}, [messages]);

  const scrollToBottom = () => {
    if (flatListRef.current && messages?.length > 0) {
      flatListRef.current.scrollToEnd({ animated: false });
    }
  };
  const footerComponent = () =>
    updateMessages && (
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
