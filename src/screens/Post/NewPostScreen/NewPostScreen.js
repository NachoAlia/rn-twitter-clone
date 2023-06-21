import React, { useState } from "react";
import { View } from "react-native";
import { Avatar, Button, Image, Input, Text } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./NewPostScreen.data";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./NewPostScreen.style";
import { IconsButton, color } from "../../../utils";
import { CharacterCountBar } from "../../../utils/CharacterCountBar";
import { useThemaContext } from "../../../components/ThemeProvider";

export function NewPostScreen() {
  const [canBePost, setCanBePost] = useState(true);
  const navigation = useNavigation();

  const thema = useThemaContext();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        console.log(formValue);

        navigation.goBack();
      } catch (error) {
        console.log(error);
      }
    },
  });

  const goBack = () => {
    navigation.goBack();
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
    });
    formik.setFieldValue("image", result.assets[0].uri);
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
        source={require("../../../../assets/icons/default_user_photo.png")}
        size="large"
        rounded
      />
      <View style={{ flex: 1 }}>
        <Button
          title="Publicar"
          buttonStyle={styles.containerButtonPost}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
          disabled={formik.values.content.length == 0 && canBePost}
          disabledStyle={styles.containerButtonPostDisabled}
        />
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
          <Image
            style={styles.imagePost}
            source={require("../../../../assets/icons/picture_not_found.png")}
          />
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
