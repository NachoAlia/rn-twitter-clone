import React, { useContext, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { Input, Icon, Image } from "react-native-elements";
import { IconsButton, color } from "../../../utils";
import { styles } from "./SendMessageForm.styles";
import { useEffect } from "react";
import { useThemaContext } from "../../ThemeProvider";
import { setIn, useFormik } from "formik";
import { initialValues, validationSchema } from "./SendMessageForm.data";
import { DirectMessagesContext, UserContext } from "../../../context";
import { domainUrl } from "../../../config/host";
import { SendImageForm } from "./SendImageForm";
import { EmojiView } from "../EmojiView";

export const SendMessageForm = React.memo((props) => {
  const [inputActive, setInputActive] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const [isLoading, setIsLoading] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [emojiSelectorActive, setEmojiSelectorActive] = useState(false);
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const { conversation } = props;
  const { setShouldUpdateConversations, setShouldUpdateMessages } = useContext(
    DirectMessagesContext
  );
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
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
  const handleEmojiSelectorInactive = () => {
    setEmojiSelectorActive(false);
    textInputRef.focus();
  };

  const handleEmojiSelectorActive = () => {
    setEmojiSelectorActive(true);
    Keyboard.dismiss();
  };
  const handleKeyboardDidShow = () => {
    setEmojiSelectorActive(false);
  };

  const handleSetText = (text) => {
    setTextMessage(text);
    formik.setFieldValue("body", text);
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        handleEmojiSelectorInactive();
        setIsLoading(true);
        const data = new FormData();

        data.append("message[body]", formValue.body || "");
        data.append("message[photoMessage]", formValue.photoMessage || "");

        await fetch(
          `${domainUrl}/users/${currentUser.id}/conversations/${conversation.id}/messages/send_message`,
          {
            method: "POST",
            body: data,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ).then(() => {
          setTextMessage("");
          setPhoto(null);
          formik.setFieldValue("body", "");
          formik.setFieldValue("photoMessage", "");
          setShouldUpdateMessages(true);
          setShouldUpdateConversations(true);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

  return (
    <View>
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
          ref={(ref) => (textInputRef = ref)}
          multiline={true}
          maxLength={120}
          numberOfLines={3}
          autoFocus={true}
          value={textMessage}
          onChangeText={handleSetText}
          errorMessage={formik.errors.body}
          onPointerCancel={handleInputBlur}
          onBlur={handleInputBlur}
          cursorColor={thema ? color.light.corporate : color.dark.corporate}
          style={{ borderWidth: 0 }}
          containerStyle={{ borderWidth: 0, borderRadius: 0 }}
          inputContainerStyle={{
            borderBottomWidth: 0,
            borderRadius: 0,
            borderColor: inputActive ? "blue" : "gray",
            paddingHorizontal: 5,
          }}
          inputStyle={{
            marginLeft: 10,
            flex: 1,
            marginTop: 5,
            marginBottom: 10,
            color: thema ? color.light.text : color.dark.text,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            marginTop: -35,
            paddingHorizontal: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: 0,
            }}
          >
            <SendImageForm
              formik={formik}
              currentPhoto={photo}
              setPhoto={setPhoto}
            />
            <TouchableOpacity onPress={() => {}}>
              {!emojiSelectorActive ? (
                <Icon
                  type="material-community"
                  name="emoticon-lol-outline"
                  color="#828282"
                  size={28}
                  onPress={handleEmojiSelectorActive}
                />
              ) : (
                <Icon
                  type="material-community"
                  name="keyboard"
                  color="#828282"
                  size={28}
                  onPress={handleEmojiSelectorInactive}
                />
              )}
            </TouchableOpacity>
          </View>
          {!isLoading ? (
            <IconsButton name="send" size={28} onPress={formik.handleSubmit} />
          ) : (
            <ActivityIndicator color={color.light.corporate} size={26} />
          )}
        </View>
      </View>

      {emojiSelectorActive && (
        <EmojiView textMessage={textMessage} setTextMessage={handleSetText} />
      )}
    </View>
  );
});
