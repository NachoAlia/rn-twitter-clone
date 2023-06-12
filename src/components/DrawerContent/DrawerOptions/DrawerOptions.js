import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "./DrawerOptions.styles";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";
import { useThemaContext } from "../../ThemeProvider";
import { color } from "../../../utils";
export function DrawerOptions() {
  const navigation = useNavigation();
  const thema = useThemaContext();

  const getMenuOptions = () => {
    return [
      {
        title: "Profile",
        iconType: "material-community",
        iconNameLeft: "account-outline",
        iconSize: 32,
        iconColorLeft: "#ccc",
        bottomDivider: false,
        onPress: () => navigation.navigate(screen.account.account),
      },
      {
        title: "Explore",
        iconType: "material-community",
        iconNameLeft: "magnify",
        iconSize: 32,
        bottomDivider: false,
        onPress: () => console.log("holi1"),
      },
      {
        title: "List",
        iconType: "material-community",
        iconNameLeft: "clipboard-outline",
        iconSize: 32,
        bottomDivider: false,
        onPress: () => console.log("asd"),
      },
      {
        title: "Bookmark",
        iconType: "material-community",
        iconNameLeft: "bookmark-outline",
        iconSize: 32,
        bottomDivider: false,
        onPress: () => console.log("asd"),
      },
      {
        title: "Settings",
        iconType: "material-community",
        iconNameLeft: "cog-outline",
        iconSize: 32,
        bottomDivider: true,
        onPress: () => console.log("asd"),
      },
      {
        title: "Help Center",
        iconType: "material-community",
        iconNameLeft: "chat-question-outline",
        iconSize: 32,
        bottomDivider: false,
        onPress: () => console.log("asd"),
      },
    ];
  };

  const menuOptions = getMenuOptions();
  return (
    <View>
      {menuOptions.map((elem, index) => {
        return (
          <View key={index}>
            {elem.bottomDivider && <View style={styles.bottomDivider}></View>}
            <TouchableOpacity style={styles.touchable} onPress={elem.onPress}>
              <Icon
                type={elem.iconType}
                name={elem.iconNameLeft}
                size={elem.iconSize}
                iconStyle={styles.iconStyle}
              />
              <Text
                style={{
                  fontSize: 22,
                  paddingHorizontal: 10,
                  color: thema ? color.light.text : color.dark.text,
                }}
              >
                {elem.title}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}
