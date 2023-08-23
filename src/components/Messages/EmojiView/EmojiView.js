import React, { useMemo, useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { color } from "../../../utils";

import EmojiSelector, { Categories } from "react-native-emoji-selector";

export function EmojiView(props) {
  const { textMessage, setTextMessage } = props;
  const [selectedEmojis, setSelectedEmojis] = useState(""); // Estado para almacenar emojis seleccionados
  const [shouldUpdateState, setShouldUpdateState] = useState(true);

  useEffect(() => {
    if (shouldUpdateState) {
      setShouldUpdateState(false);
      const updatedTextMessage = textMessage + selectedEmojis;
      setTextMessage(updatedTextMessage);
      setSelectedEmojis("");
    }
  }, [selectedEmojis]);

  const handleEmojiSelected = (emoji) => {
    setSelectedEmojis((prevSelectedEmojis) => prevSelectedEmojis + emoji);
    setShouldUpdateState(true);
  };

  const isEmoji = (char) => {
    return /\p{Extended_Pictographic}/u.test(char);
  };

  const isAscii = (char) => {
    return char.charCodeAt(0) < 128;
  };

  const handleDeleteText = () => {
    !isAscii(textMessage.charAt(textMessage.length - 1))
      ? setTextMessage(textMessage.slice(0, textMessage.length - 2))
      : setTextMessage(textMessage.slice(0, textMessage.length - 1));
    setShouldUpdateState(true);
  };

  const handleDeleteAllText = () => {
    setTextMessage("");
    setShouldUpdateState(true);
  };

  const emojiSelectorComponent = useMemo(
    () => (
      <EmojiSelector
        category={Categories.emotion}
        onEmojiSelected={handleEmojiSelected}
        showSearchBar={false}
        showHistory={false}
        showTabs={false}
        showSectionTitles={false}
        columns={12}
      />
    ),
    []
  );

  return (
    <View
      style={{
        height: 250,
        paddingHorizontal: 10,
      }}
    >
      {emojiSelectorComponent}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 15,
          right: 20,
          backgroundColor: color.light.corporate,
          width: 45,
          height: 45,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 25,
        }}
        onPress={handleDeleteText}
        onLongPress={handleDeleteAllText}
      >
        <Icon
          type="material-community"
          name="backspace-outline"
          color={"#fff"}
        />
      </TouchableOpacity>
    </View>
  );
}
