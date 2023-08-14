import React, { useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Avatar, Button, Input, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./AddCommentScreen.data";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./AddCommentScreen.style";
import { IconsButton, ImageAuto, color } from "../../../utils";
import { CharacterCountBar } from "../../../utils/CharacterCountBar";
import { useThemaContext } from "../../../components/ThemeProvider";
import { HeaderComment } from "../../../components/Posts";
import { UserContext } from "../../../context";
import { domainUrl } from "../../../config/host";

export function AddCommentScreen(props) {
  const { route } = props;

  const [canNotBePost, setCanNotBePost] = useState(true);
  const [image, setImage] = useState(null);
  const navigation = useNavigation();

  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);

  const dataPost = route.params.dataPost;

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        const route = `/tweets/${dataPost.id}/tweet_comments?user_id=${currentUser.id}`;
        const apiUrl = `${domainUrl}${route}`;

        const formData = new FormData();

        formData.append("tweet_comment[body]", formValues.content);
        if (formValues.image) {
          formData.append("tweet_comment[photoTweetComment]", formValues.image);
        }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        });

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
          <IconsButton name={"arrow_dark"} size={25} onPress={goBack} />
        ) : (
          <IconsButton name={"arrow_light"} size={25} onPress={goBack} />
        ),
      headerRight: () => (
        <Button
          title="Responder"
          buttonStyle={styles.containerButtonPost}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={formik.values.content.length == 0 && canNotBePost}
          disabledStyle={styles.containerButtonPostDisabled}
        />
      ),
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
    });
  }, [thema, canNotBePost, formik]);

  const goBack = () => {
    navigation.navigate(screen.post.tab, {
      screen: screen.post.post,
      params: { dataPost },
    });
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
      <HeaderComment dataPost={dataPost} />
      <View style={{ flexDirection: "row", height: 150 }}>
        <View>
          <Avatar
            source={
              currentUser.photoProfile_url
                ? { uri: currentUser.photoProfile_url }
                : require("../../../../assets/icons/default_user_photo.png")
            }
            size="medium"
            rounded
          />
        </View>
        <View style={{ flex: 1 }}>
          <Input
            placeholder={"¡Publica tu respuesta!"}
            multiline
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
        </View>
      </View>
      <View>
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
