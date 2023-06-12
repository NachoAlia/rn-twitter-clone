import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { styles } from "./EditImagesForm.styles";

import { Icon, Text, Button, Input, Image } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";

export function EditImagesForm(props) {
  const { formik } = props;
  const [imageProfile, setImageProfile] = useState(null);
  const [imageCover, setImageCover] = useState(null);

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      updatePhotoProfile(result.assets[0].uri);
    }
  };

  const updatePhotoProfile = (uri) => {
    console.log(uri);
  };

  const updatePhotoCover = async (imagePath) => {
    // not yet implemented
  };

  const uploadImage = async (uri) => {
    // not yet implemented
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.containerProfileCover}
        onPress={openGallery}
      >
        <Icon
          type="material-community"
          name="camera-plus-outline"
          size={32}
          color={"white"}
          style={styles.addProfileCoverIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.containerProfileAvatar}
        onPress={openGallery}
      >
        <Icon
          type="material-community"
          name="camera-plus-outline"
          size={25}
          color={"white"}
          style={styles.addProfileCoverIcon}
        />
      </TouchableOpacity>
    </View>
  );
}
