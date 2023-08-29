import React, { useContext, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { Dropdown } from "../../../components/Shared/Dropdown";
import { useNavigation } from "@react-navigation/native";
import { screen, color } from "../../../utils";
import { useThemaContext } from "../../../components/ThemeProvider";
import { styles } from "./BookmarkScreen.styles";
import { BookmarkList } from "../../../components/Bookmark/BookmarkList";
import { ScrollView } from "react-native-gesture-handler";
import { UserContext } from "../../../context";

export function BookmarkScreen() {
  const navigation = useNavigation();
  const thema = useThemaContext();
  const { user_bookmark, setUpdateInfo, updateInfo } = useContext(UserContext);
  const removeAllBookmarks = () => {
    user_bookmark.removeAllBookmarks();
    setUpdateInfo(true);
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Dropdown
          links={[
            {
              name: "Borrar todos los elementos guardados",
              action: () => removeAllBookmarks(),
            },
          ]}
          overlayStyle={{
            backgroundColor: thema
              ? color.light.background
              : color.dark.background,

            padding: 20,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: thema ? color.light.corporate : color.dark.corporate,
            position: "absolute",
            top: 45,
            right: 10,
          }}
          linkTitleStyle={{ color: thema ? color.light.text : color.dark.text }}
          iconName="dots-vertical"
          iconColor={thema ? color.light.text : color.dark.text}
        />
      ),
    });
  }, [thema]);
  return (
    <ScrollView
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
      }}
    >
      {updateInfo && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          color={color.light.corporate}
        />
      )}
      <BookmarkList />
    </ScrollView>
  );
}
