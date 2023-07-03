import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { UserButtonGroup } from "../../../components/Account/UserButtonGroup/UserButtonGroup";
import { ScrollView } from "react-native-gesture-handler";
import { useThemaContext } from "../../../components/ThemeProvider";

import { InfoUser } from "../../../components/Account/InfoUser/InfoUser";

import { styles } from "./AccountScreen.styles";
import { color } from "../../../utils";

import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils/screenName";

import { UserContext } from "../../../context/UserProvider";

export function AccountScreen() {
  const navigation = useNavigation();
  const thema = useThemaContext();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Icon
          type="material-community"
          name="arrow-left"
          containerStyle={{ marginLeft: 0, marginRight: 30 }}
          size={24}
          color={thema ? color.light.text : color.dark.text}
          onPress={() => navigation.navigate(screen.home.tab)}
        />
      ),
      headerTitle: currentUser.username,
      headerTintColor: thema ? color.light.text : color.dark.text,
      headerStyle: {
        backgroundColor: thema ? color.light.background : color.dark.background,
      },
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
      <ScrollView>
        <InfoUser />
        <UserButtonGroup />
      </ScrollView>
    </View>
  );
}
