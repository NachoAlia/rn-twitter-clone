import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { Dropdown } from "../../../components/Shared/Dropdown";
import { useNavigation } from "@react-navigation/native";
import { screen, color } from "../../../utils";
import { useThemaContext } from "../../../components/ThemeProvider";

import { styles } from "./BookmarkScreen.styles";

export function BookmarkScreen() {
  const navigation = useNavigation();
  const thema = useThemaContext();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Dropdown
          links={[
            {
              name: "Borrar todos los elementos guardados",
              action: () => navigation.navigate(screen.home.home),
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
    <View
      style={[
        styles.content,
        {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      ]}
    >
      <Text style={{ color: thema ? color.light.text : color.dark.text }}>
        BookmarkScreen
      </Text>
    </View>
  );
}
