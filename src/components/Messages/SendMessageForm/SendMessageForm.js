import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Input, Icon, Image } from "react-native-elements";
import { IconsButton, color } from "../../../utils";
import { styles } from "./SendMessageForm.styles";
import { useEffect } from "react";
import { useThemaContext } from "../../ThemeProvider";

export function SendMessageForm() {
  const [inputActive, setInputActive] = useState(false);
  const [textMessage, setTextMessage] = useState(null);
  const thema = useThemaContext();

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleInputFocus = () => {
    setInputActive(true);
  };

  const handleInputBlur = () => {
    setInputActive(false);
  };

  const handleKeyboardDidHide = () => {
    setInputActive(false);
  };

  return (
    <View>
      {!inputActive ? (
        <TouchableOpacity onPress={() => setInputActive(true)}>
          <Input
            placeholder="Escribe un mensaje"
            value={
              textMessage
                ? textMessage.replace(/\n/g, "").slice(0, 25) +
                  (textMessage ? "..." : "")
                : ""
            }
            multiline={true}
            numberOfLines={1}
            disabled={true}
            maxLength={120}
            onFocus={handleInputFocus}
            rightIcon={<IconsButton name="send" size={28} />}
            leftIcon={
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  alignItems: "center",
                }}
              >
                <Icon
                  type="material-community"
                  name="image-outline"
                  color={"#828282"}
                  size={28}
                  containerStyle={{ marginLeft: 5 }}
                />
                <Icon
                  type="material-community"
                  name="file-gif-box"
                  color={"#828282"}
                  size={28}
                  containerStyle={{}}
                />
              </View>
            }
            style={{ borderWidth: 0 }}
            containerStyle={{}}
            inputContainerStyle={{ borderWidth: 1, borderRadius: 30 }}
            inputStyle={{
              marginLeft: 5,
              color: thema ? color.light.text : color.dark.text,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            borderRadius: 30,
            borderColor: "#828282",
          }}
        >
          <Input
            placeholder="Escribe un mensaje"
            multiline={true}
            maxLength={120}
            numberOfLines={3}
            autoFocus={true}
            value={textMessage}
            onChangeText={(text) => setTextMessage(text)}
            onPointerCancel={handleInputBlur}
            onBlur={handleInputBlur}
            cursorColor={thema ? color.light.corporate : color.dark.corporate}
            style={{ borderWidth: 0 }}
            containerStyle={{ borderWidth: 0, borderRadius: 0 }}
            inputContainerStyle={{
              borderBottomWidth: 0,
              borderRadius: 0,
              borderColor: inputActive ? "blue" : "gray",
            }}
            inputStyle={{
              marginLeft: 5,
              flex: 1,
              marginTop: 10,
              color: thema ? color.light.text : color.dark.text,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
              marginTop: -10,
              marginHorizontal: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 5,
              }}
            >
              <Icon
                type="material-community"
                name="image-outline"
                size={28}
                color={"#828282"}
                containerStyle={{ marginRight: 0 }}
              />
              <Icon
                type="material-community"
                name="file-gif-box"
                size={28}
                color={"#828282"}
                containerStyle={{ marginRight: 10 }}
              />
            </View>
            <IconsButton name="send" size={28} />
          </View>
        </View>
      )}
    </View>
  );
}
