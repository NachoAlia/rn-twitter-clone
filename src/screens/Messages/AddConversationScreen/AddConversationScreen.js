import React, { useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./AddConversationScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "react-native-elements";
import { DrawerContext, TabBarContext } from "../../../context";
import { useThemaContext } from "../../../components/ThemeProvider";
import { TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../../../utils";

export function AddConversationScreen() {
  const thema = useThemaContext();
  const navigation = useNavigation();
  const { tabBarScreenOptions, setTabBarScreenOptions } =
    useContext(TabBarContext);
  const { drawerScreenOptions, setDrawerScreenOptions } =
    useContext(DrawerContext);

  useLayoutEffect(() => {
    const updatedDrawerOptions = {
      ...drawerScreenOptions,
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={navigation.goBack}
        >
          <Icon
            type="material-community"
            name="arrow-left"
            size={25}
            color={thema ? color.light.text : color.dark.text}
          />
        </TouchableOpacity>
      ),
      title: "Mensaje directo",
      headerTitleAlign: "left",
      headerTitleStyle: { marginLeft: 10 },
      headerTintColor: thema ? color.light.text : color.dark.text,
      swipeEnabled: false,
    };
    if (!drawerScreenOptions) {
      setDrawerScreenOptions(updatedDrawerOptions);
    }

    const updatedTabBarOptions = {
      ...tabBarScreenOptions,
      tabBarStyle: { display: "none" },
    };
    if (!tabBarScreenOptions) {
      setTabBarScreenOptions(updatedTabBarOptions);
    }

    return () => {
      setTabBarScreenOptions(null);
    };
  }, [drawerScreenOptions, thema]);

  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        flex: 1,
      }}
    >
      <Text style={{ color: thema ? color.light.text : color.dark.text }}>
        AddConversationScreen
      </Text>
    </View>
  );
}
