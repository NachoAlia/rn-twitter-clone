import React, { useContext, useLayoutEffect, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./AddConversationScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { Icon, Input } from "react-native-elements";
import { DrawerContext, TabBarContext } from "../../../context";
import { useThemaContext } from "../../../components/ThemeProvider";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../../../utils";
import { AddConversationItem } from "../../../components/Messages/AddConversationItem/AddConversationItem";
import { domainUrl } from "../../../config/host";

export function AddConversationScreen() {
  const [filter, setFilter] = useState(null);
  const [data, setData] = useState([]);
  const thema = useThemaContext();
  const navigation = useNavigation();
  const { tabBarScreenOptions, setTabBarScreenOptions } =
    useContext(TabBarContext);
  const { setDrawerScreenOptions } = useContext(DrawerContext);
  const [shoulHideDrawerHeader, setShoulHideDrawerHeader] = useState(false);

  useLayoutEffect(() => {
    const updatedTabBarOptions = {
      ...tabBarScreenOptions,
      tabBarStyle: { display: "none" },
    };

    if (!shoulHideDrawerHeader) {
      setTabBarScreenOptions(updatedTabBarOptions);
      navigation.setOptions({
        headerTintColor: thema ? color.light.text : color.dark.text,
        headerStyle: {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      });
      setDrawerScreenOptions({ headerShown: false });
      setShoulHideDrawerHeader(true);
    }

    return () => {
      setDrawerScreenOptions({ headerShown: false });
      setTabBarScreenOptions(updatedTabBarOptions);
      navigation.setOptions({
        headerTintColor: thema ? color.light.text : color.dark.text,
        headerStyle: {
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
        },
      });
    };
  }, [thema, shoulHideDrawerHeader]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${domainUrl}/users`);
      const users = await response.json();

      const userPromises = users.map(async (element) => {
        const userResponse = await fetch(`${domainUrl}/users/${element.id}`);
        return await userResponse.json();
      });

      const userData = await Promise.all(userPromises);
      setData(userData);
    };
    fetchUsers();
  }, [navigation]);

  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        flex: 1,
      }}
    >
      <Input
        leftIcon={{
          type: "material-community",
          name: "magnify",
          color: thema ? color.light.corporate : color.dark.corporate,
          style: { marginLeft: 12 },
          size: 28,
        }}
        cursorColor={thema ? color.light.corporate : color.dark.corporate}
        inputStyle={{
          fontSize: 16,
          color: thema ? color.light.text : color.dark.text,
        }}
        inputContainerStyle={{
          borderBottomWidth: 0.7,
          borderBottomColor: thema
            ? color.light.textSecondary
            : color.dark.textSecondary,
        }}
        onChangeText={(text) => {
          setFilter(text);
        }}
      />
      <FlatList
        data={
          filter
            ? data.filter((item) =>
                item.username.toLowerCase().includes(filter.toLowerCase())
              )
            : data
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AddConversationItem item={item} />}
      />
    </View>
  );
}
