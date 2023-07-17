import React, { useContext, useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./AddConversationScreen.styles";
import { useNavigation } from "@react-navigation/native";
import { Icon, Input } from "react-native-elements";
import { DrawerContext, TabBarContext } from "../../../context";
import { useThemaContext } from "../../../components/ThemeProvider";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { color } from "../../../utils";
import { AddConversationItem } from "../../../components/Messages/AddConversationItem/AddConversationItem";

export function AddConversationScreen() {
  const [filter, setFilter] = useState(null);
  const thema = useThemaContext();
  const navigation = useNavigation();
  const { tabBarScreenOptions, setTabBarScreenOptions } =
    useContext(TabBarContext);
  const { drawerScreenOptions, setDrawerScreenOptions } =
    useContext(DrawerContext);

  DATA = [
    {
      id: 1,
      username: "NachoAlia 💖",
      profile_url: "https://m.media-amazon.com/images/I/61NnbaTmgGL.png",
    },
    {
      id: 2,
      username: "AnotherUser1",
      profile_url:
        "https://thumbs.dreamstime.com/b/avatar-cartoon-wallpaper-girl-232239549.jpg",
    },
    {
      id: 3,
      username: "AnotherUser2",
      profile_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGNY-OQz4XFu7084J2itchn3tomNBYgJzVvxJyivw6n01_AY-I4QTKCH622MfAHrkUgFY&usqp=CAU",
    },
    {
      id: 4,
      username: "AnotherUser3",
      profile_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFJAN3z2QdyT9ZjG58XO3MLk7y1wBYNOx3uvv0xCp6Adu9BliZcxdi5oQ8aPjqYWxlex8&usqp=CAU",
    },
  ];

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
            ? DATA.filter((item) =>
                item.username.toLowerCase().includes(filter.toLowerCase())
              )
            : DATA
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AddConversationItem item={item} />}
      />
    </View>
  );
}
