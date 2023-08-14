import React, { useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as mime from "react-native-mime-types";
import { color } from "../../../utils";

export const SendImageForm = ({ formik, currentPhoto, setPhoto }) => {
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

  const handleDeleteCurrentPhoto = () => {
    setPhoto(null);
    formik.setFieldValue("photoMessage", "");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={currentPhoto ? handleDeleteCurrentPhoto : selectMessageImage}
      >
        <Icon
          type="material-community"
          name={currentPhoto ? "image-remove" : "image-outline"}
          size={28}
          color={currentPhoto ? color.light.corporate : "#828282"}
          style={{ marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
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
