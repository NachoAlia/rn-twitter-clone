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

import { styles } from "./EditImagesForm.styles";
import { color } from "../../../../utils";

import { UserContext } from "../../../../context/UserProvider";

export function EditImagesForm(props) {
  const { formik } = props;
  const { currentUser } = useContext(UserContext);
  const [imageProfile, setImageProfile] = useState(null);
  const [imageCover, setImageCover] = useState(null);

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

  const updatePhotoProfile = async () => {
    const result = await openGallery([4, 3]);
    if (result) {
      let file = getNewFileFormat(result.assets[0].uri);
      formik.setFieldValue("photoProfile", file);
      console.log(file);
    }
  };

  const updatePhotoCover = async () => {
    const result = await openGallery([4, 3]);
    if (result) {
      let file = getNewFileFormat(result.assets[0].uri);
      formik.setFieldValue("photoCover", file);
      console.log(file);
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

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.containerProfileCover,
          {
            backgroundColor: formik.values.photoCover
              ? "#4BB543"
              : color.light.corporate,
          },
        ]}
        onPress={updatePhotoCover}
      >
        {formik.values.photoCover ? (
          <View style={{ backgroundColor: "black" }}>
            <Image
              source={{ uri: formik.values.photoCover.uri }}
              style={{
                width: "100%",
                height: 170,
                resizeMode: "cover",
                opacity: 0.5,
              }}
            />
            <View
              style={{ position: "absolute", alignSelf: "center", top: "50%" }}
            >
              <Icon
                type="material-community"
                name="camera-plus-outline"
                size={35}
                color={"#ffff"}
                style={[styles.addProfileCoverIcon]}
              />
            </View>
          </View>
        ) : (
          <>
            {currentUser.photoCover ? (
              <View style={{ backgroundColor: "black" }}>
                <Image
                  source={{ uri: currentUser.photoCover_url }}
                  style={{
                    width: "100%",
                    height: 170,
                    resizeMode: "cover",
                    opacity: 0.7,
                  }}
                />
              </View>
            ) : (
              <View style={{ backgroundColor: "black" }}>
                <Image
                  source={require("../../../../../assets/icons/picture_not_found.png")}
                  style={{
                    width: "100%",
                    height: 170,
                    resizeMode: "cover",
                    opacity: 0.7,
                  }}
                />
              </View>
            )}
            <View
              style={{
                position: "absolute",
                alignSelf: "center",
              }}
            >
              <Icon
                type="material-community"
                name="camera-plus-outline"
                size={32}
                color={"#ffff"}
                style={styles.addProfileCoverIcon}
              />
            </View>
            <Text style={{ color: "red" }}>{formik.errors.photoCover}</Text>
          </>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={
          formik.values.photoProfile
            ? styles.containerProfileAvatarChecked
            : styles.containerProfileAvatar
        }
        onPress={updatePhotoProfile}
      >
        {formik.values.photoProfile ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Avatar
              rounded
              size="large"
              source={{ uri: formik.values.photoProfile.uri }}
              avatarStyle={{ opacity: 0.7 }}
              containerStyle={{ flex: 1 }}
            />
            <View style={{ position: "absolute" }}>
              <Icon
                type="material-community"
                name="camera-plus-outline"
                size={25}
                color={"#ffff"}
                style={styles.addProfileCoverIcon}
              />
            </View>
          </View>
        ) : (
          <>
            {currentUser.photoProfile ? (
              <Avatar
                rounded
                size="large"
                source={{ uri: currentUser.photoProfile_url }}
                containerStyle={{ backgroundColor: "black" }}
                avatarStyle={{ opacity: 0.7 }}
              />
            ) : (
              <Avatar
                rounded
                size="large"
                source={require("../../../../../assets/icons/default_user_photo.png")}
                containerStyle={{ backgroundColor: "black" }}
                avatarStyle={{ opacity: 0.7 }}
              />
            )}
            <View style={{ position: "absolute" }}>
              <Icon
                type="material-community"
                name="camera-plus-outline"
                size={25}
                color={"#ffff"}
                style={styles.addProfileAvatarIcon}
              />
            </View>
          </>
        )}
      </TouchableOpacity>
      <Text style={{ color: "red" }}>{formik.errors.photoProfile}</Text>
    </View>
  );
}
