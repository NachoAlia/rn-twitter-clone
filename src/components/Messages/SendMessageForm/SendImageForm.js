import React, { useContext, useState } from "react";
import { View, TouchableOpacity } from "react-native";

import {
  Icon,
  Text,
  Button,
  Input,
  Image,
  Avatar,
} from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";

import { IconsButton, color } from "../../../utils";

import { UserContext } from "../../../context";

export const SendImageForm = React.memo((props) => {
  const { formik, currentPhoto, setPhoto } = props;
  const { currentUser } = useContext(UserContext);

  const openGallery = async (aspect) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: aspect,
      quality: 1,
    });

    if (!result.canceled) {
      return result;
    }
    return null;
  };

  const selectMessageImage = async () => {
    const result = await openGallery([4, 3]);
    if (result) {
      let file = getNewFileFormat(result.assets[0].uri);
      formik.setFieldValue("photoMessage", file);
      setPhoto(file);
    }
  };

  const getNewFileFormat = (uri) => {
    const newImageUri = "file:///" + uri.split("file:/").join("");
    const filename = uri.split("/").pop();
    const file = {
      uri: newImageUri,
      type: mime.lookup(uri),
      name: filename,
    };
    return file;
  };

  handleDeleteCurrentPhoto = () => {
    setPhoto(null);
    formik.setFieldValue("photoMessage", "");
  };

  return (
    <View>
      {currentPhoto ? (
        <TouchableOpacity onPress={handleDeleteCurrentPhoto}>
          <Icon
            type="material-community"
            name="image-remove"
            size={28}
            color={color.light.corporate}
            style={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={selectMessageImage}>
          <Icon
            type="material-community"
            name="image-outline"
            color={"#828282"}
            size={28}
            containerStyle={{ marginLeft: 5 }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
