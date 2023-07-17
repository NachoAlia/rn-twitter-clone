import React, { useContext } from "react";
import { View, Text } from "react-native";
import { styles } from "./MessagesList.styles";
import { FlatList } from "react-native-gesture-handler";
import { UserContext } from "../../../context";

import { useThemaContext } from "../../ThemeProvider";

import { Message } from "../Message/Message";

export function MessagesList() {
  const { currentUser } = useContext(UserContext);
  const thema = useThemaContext();
  const date = new Date();
  const DATA = [
    {
      id: 1,
      sender_id: currentUser.id,
      body: "Hola, como estas?",
      date: date.toLocaleString(),
      time: date.toLocaleTimeString(),
      image: "image_url",
    },
    {
      id: 2,
      sender_id: 123,
      body: "Todo bien, vos?",
      date: date.toLocaleString(),
      time: date.toLocaleTimeString(),
      image: "image_url",
    },
    {
      id: 3,
      sender_id: currentUser.id,
      body: "Bien bien, me alegro",
      date: date.toLocaleString(),
      time: date.toLocaleTimeString(),
      image: "image_url",
    },
  ];

  return (
    <View style={{ margin: 5 }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Message item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
