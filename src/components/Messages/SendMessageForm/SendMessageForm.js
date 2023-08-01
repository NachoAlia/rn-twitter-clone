import React, { useContext, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import { Input, Icon, Image } from "react-native-elements";
import { IconsButton, color } from "../../../utils";
import { styles } from "./SendMessageForm.styles";
import { useEffect } from "react";
import { useThemaContext } from "../../ThemeProvider";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./SendMessageForm.data";
import { UserContext } from "../../../context";
import { domainUrl } from "../../../config/host";
import { SendImageForm } from "./SendImageForm";

export const SendMessageForm = React.memo((props) => {
  const [inputActive, setInputActive] = useState(false);
  const [textMessage, setTextMessage] = useState(null);
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);
  const { userReceiver, conversation } = props;
  const [photo, setPhoto] = useState(null);

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

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const data = new FormData();

        data.append("message[body]", formValue.body || "");
        data.append("message[photoMessage]", formValue.photoMessage || "");
        //`${domainUrl}/users/${currentUser.id}/messages/${userReceiver.id}/send_message`
        ///api/v1/users/:user_id/conversations/:conversation_id/messages/send_message(
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
          setTextMessage(null);
          setPhoto(null);
          formik.setFieldValue("body", "");
          formik.setFieldValue("photoMessage", "");
          console.log("enviado");
        });
      } catch (error) {
        console.log(error);
      }
    },
  });

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
            rightIcon={
              <IconsButton
                name="send"
                size={28}
                onPress={formik.handleSubmit}
              />
            }
            leftIcon={
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: 5,
                  alignItems: "center",
                }}
              >
                <SendImageForm
                  formik={formik}
                  currentPhoto={photo}
                  setPhoto={setPhoto}
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
            onChangeText={(text) => {
              setTextMessage(text);
              formik.setFieldValue("body", text);
            }}
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
            }}
            inputStyle={{
              marginLeft: 10,
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
              <SendImageForm
                formik={formik}
                currentPhoto={photo}
                setPhoto={setPhoto}
              />
            </View>
            <IconsButton name="send" size={28} onPress={formik.handleSubmit} />
          </View>
        </View>
      )}
    </View>
  );
});
