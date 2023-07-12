import React, { useEffect, useState, useContext } from "react";
import { Dimensions, View } from "react-native";
import { Avatar, Button, Image, Input, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./NewPostScreen.data";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NewPostScreen.style";
import { IconsButton, ImageAuto, color, screen } from "../../../utils";
import { CharacterCountBar } from "../../../utils/CharacterCountBar";
import { useThemaContext } from "../../../components/ThemeProvider";
import { domainUrl } from "../../../config/host";
import { UserContext, usereloadPostContext } from "../../../context";

export function NewPostScreen() {
  const [canBePost, setCanBePost] = useState(true);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const { currentUser } = useContext(UserContext);
  const reloadpost = usereloadPostContext();
  const thema = useThemaContext();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const route = `/users/${currentUser.id}/tweets`;
        const apiUrl = `${domainUrl}${route}`;

        const formData = new FormData();
        formData.append("tweet[body]", formValue.content);
        if (formValue.image) {
          formData.append("tweet[photoTweet]", formValue.image);
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });
        reloadpost();
        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => {},
      headerLeft: () =>
        thema ? (
          <IconsButton name={"arrow_dark"} size={25} onPress={goHome} />
        ) : (
          <IconsButton name={"arrow_light"} size={25} onPress={goHome} />
        ),
      headerRight: () => (
        <Button
          title="Publicar"
          buttonStyle={styles.containerButtonPost}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={formik.values.content.length == 0 && canBePost}
          disabledStyle={styles.containerButtonPostDisabled}
        />
      ),
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
    });
  }, [thema, canBePost, formik]);

  const goHome = () => {
    navigation.navigate(screen.home.tab, {
      screen: screen.home.home,
    });
  };

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
    setCanBePost(false);
  };
  return (
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
      <Avatar
        source={
          currentUser.photoProfile_url
            ? { uri: currentUser.photoProfile_url }
            : require("../../../../assets/icons/default_user_photo.png")
        }
        size="large"
        rounded
      />
      <View style={{ flex: 1 }}>
        <Input
          placeholder={"¿Que está pasando?"}
          multiline
          numberOfLines={5}
          maxLength={140}
          inputContainerStyle={styles.textArea}
          inputStyle={{ color: thema ? color.light.text : color.dark.text }}
          placeholderTextColor={
            thema ? color.light.textSecondary : color.dark.textSecondary
          }
          onChangeText={(text) => formik.setFieldValue("content", text)}
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
        <CharacterCountBar value={formik.values.content.length} />
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
            {formik.values.content.length}/140
          </Text>
        </View>
      </View>
    </View>
  );
}
