import React from "react";
import { View, Text, FlatList, VirtualizedList } from "react-native";
import { styles } from "./ConversationList.styles";
import { Conversation } from "../Conversation/Conversation";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function ConversationList() {
  const thema = useThemaContext();
  const conversations = [
    {
      id: 1,
      avatarUri: "https://m.media-amazon.com/images/I/61NnbaTmgGL.png",
      userName: "NachoAlia",
      mentionName: "@NachoAlia",
      fecha: new Date(),
    },
    {
      id: 2,
      avatarUri:
        "https://thumbs.dreamstime.com/b/avatar-cartoon-wallpaper-girl-232239549.jpg",
      userName: "AnotherUser1",
      mentionName: "@AnotherUser1",
      fecha: new Date(),
    },
    {
      id: 3,
      avatarUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNY-OQz4XFu7084J2itchn3tomNBYgJzVvxJyivw6n01_AY-I4QTKCH622MfAHrkUgFY&usqp=CAU",
      userName: "AnotherUser2",
      mentionName: "@AnotherUser2",
      fecha: new Date(),
    },
    {
      id: 4,
      avatarUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJAN3z2QdyT9ZjG58XO3MLk7y1wBYNOx3uvv0xCp6Adu9BliZcxdi5oQ8aPjqYWxlex8&usqp=CAU",
      userName: "AnotherUser3",
      mentionName: "@AnotherUser3",
      fecha: new Date(),
    },
  ];
  const getItem = (data, index) => {
    return data[index];
  };
  const getItemCount = () => conversations.length;

  return (
    <VirtualizedList
      keyExtractor={(item) => item.id.toString()}
      data={conversations}
      getItem={getItem}
      getItemCount={getItemCount}
      renderItem={({ item }) => <Conversation chatbox={item} />}
      style={{
        marginTop: 20,
      }}
    />
  );
}
