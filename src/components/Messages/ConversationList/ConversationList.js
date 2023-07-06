import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./ConversationList.styles";
import { Conversation } from "../Conversation/Conversation";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";

export function ConversationList() {
  const thema = useThemaContext();
  const conversations = [
    {
      id: 1,
      avatarUri:
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
      userName: "NachoAlia",
      mentionName: "@NachoAlia",
      fecha: new Date(),
    },
    {
      id: 2,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 3,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 4,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 5,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 6,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 7,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 8,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 9,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 10,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 11,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 12,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 13,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 14,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
    {
      id: 15,
      avatarUri:
        "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg",
      userName: "NachoAlia2",
      mentionName: "@NachoAlia2",
      fecha: new Date(),
    },
  ];

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={conversations}
      renderItem={({ item }) => <Conversation chatbox={item} />}
      style={{
        marginTop: 20,
      }}
    ></FlatList>
  );
}
