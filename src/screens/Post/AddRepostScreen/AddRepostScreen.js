import React, { useState, useContext } from "react";
import { Dimensions, View } from "react-native";
import { Avatar, Button, Input, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddRepostScreen.data";
import { styles } from "./AddRepostScreen.style";
import { IconsButton, ImageAuto, color, screen } from "../../../utils";
import { CharacterCountBar } from "../../../utils/CharacterCountBar";
import { useThemaContext } from "../../../components/ThemeProvider";
import { domainUrl } from "../../../config/host";
import { UserContext, usereloadPostContext } from "../../../context";
import { Repost } from "../../../components/Posts/Post/Repost";

export function AddRepostScreen({ close, data }) {
  const [canNotBePost, setCanNotBePost] = useState(true);
  const [image, setImage] = useState(null);

  const { currentUser } = useContext(UserContext);
  const dataPost = data;
  const reloadpost = usereloadPostContext();
  const thema = useThemaContext();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const route = `/tweets/${dataPost.id}/retweets?user_id=${currentUser.id}`;
        const apiUrl = `${domainUrl}${route}`;

        const formData = new FormData();
        formData.append("retweet[body]", formValue.repost);
        if (formValue.image) {
          formData.append("retweet[photoTweet]", formValue.image);
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

        formik.resetForm();
        setImage(null);
        setCanNotBePost(true);

        reloadpost();
        close();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const getNewFileFormat = (uri) => {
    const newImageUri = "file:///" + uri.split("file:/").join("");
    const filename = uri.split("/").pop();
    const file = {
      uri: newImageUri,
      type: "image/jpeg",
      name: filename,
    };
    return file;
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
    });
    setImage(result.assets[0].uri);
    let file = getNewFileFormat(result.assets[0].uri);
    formik.setFieldValue("image", file);
    setCanNotBePost(false);
  };
  return (
    <>
      {dataPost && (
        <View
          style={[
            styles.container,
            {
              backgroundColor: thema
                ? color.light.background
                : color.dark.background,
            },
          ]}
        >
          <View style={styles.header}>
            {thema ? (
              <IconsButton name={"arrow_dark"} size={25} onPress={close} />
            ) : (
              <IconsButton name={"arrow_light"} size={25} onPress={close} />
            )}
            <Button
              title="Publicar"
              buttonStyle={styles.containerButtonPost}
              onPress={formik.handleSubmit}
              loading={formik.isSubmitting}
              disabled={formik.values.repost.length == 0 && canNotBePost}
              disabledStyle={styles.containerButtonPostDisabled}
            />
          </View>
          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Avatar
              source={
                currentUser.photoProfile_url
                  ? { uri: currentUser.photoProfile_url }
                  : require("../../../../assets/icons/default_user_photo.png")
              }
              size="medium"
              rounded
            />
            <View style={{ flex: 1 }}>
              <Input
                placeholder={"¡Agrega un comentario!"}
                multiline
                numberOfLines={5}
                maxLength={140}
                textAlignVertical="top"
                inputContainerStyle={styles.textArea}
                inputStyle={{
                  color: thema ? color.light.text : color.dark.text,
                }}
                placeholderTextColor={
                  thema ? color.light.textSecondary : color.dark.textSecondary
                }
                onChangeText={(text) => formik.setFieldValue("repost", text)}
                value={formik.values.repost}
              />
              {formik.values.image ? (
                <View style={styles.imagePost}>
                  <ImageAuto
                    uri={image}
                    desiredWidth={Dimensions.get("window").width * 0.7}
                  />
                </View>
              ) : (
                <></>
              )}
              <View style={styles.repost}>
                {console.log(dataPost)}
                <Repost dataPost={dataPost} />
              </View>
              <CharacterCountBar value={formik.values.repost.length} />
              <View style={styles.barPost}>
                <IconsButton name={"image"} size={30} onPress={openGallery} />

                <Text
                  style={[
                    styles.valuesAmount,
                    {
                      color: thema
                        ? color.light.textSecondary
                        : color.dark.textSecondary,
                    },
                  ]}
                >
                  {formik.values.repost.length}/140
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
}
