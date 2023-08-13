import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ConversationList } from "../../../components/Messages/ConversationList";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DrawerContext, TabBarContext } from "../../../context";
import { Image, Icon, Input } from "react-native-elements";
import { AddConversationButton } from "../../../components/Messages/AddConversationButton";

export function MessagesScreen() {
  const thema = useThemaContext();
  const { setDrawerScreenOptions, drawerScreenOptions } =
    useContext(DrawerContext);
  const { setTabBarScreenOptions } = useContext(TabBarContext);
  const [searchBarActive, setSearchBarActive] = useState(false);
  const [filter, setFilter] = useState(null);
  const handleSearchBar = (state) => {
    if (searchBarActive) {
      setFilter(null);
    }
    setSearchBarActive(!state);
  };

  useFocusEffect(
    React.useCallback(() => {
      setDrawerScreenOptions({
        title: searchBarActive ? (
          <View
            style={{
              position: "absolute",
              maxWidth: "150%",
              marginLeft: -20,
              alignSelf: "center",
              flex: 1,
            }}
          >
            <Input
              placeholder="Buscar Mensajes Directos"
              inputContainerStyle={{
                minWidth: "140%",
                maxWidth: "140%",
                height: 35,
                marginTop: 10,
                borderWidth: 1,
                borderRadius: 20,
                backgroundColor: thema
                  ? color.light.background
                  : color.dark.background,
              }}
              style={{
                textAlign: "center",
                color: thema ? color.light.text : color.dark.text,
                fontSize: 15,
              }}
              cursorColor={thema ? color.light.corporate : color.dark.corporate}
              onChangeText={(text) => {
                setFilter(text);
              }}
            />
          </View>
        ) : (
          <Image
            source={require("../../../../assets/icons/logo_owl.png")}
            style={{ width: 80, height: 30, resizeMode: "center" }}
          />
        ),
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 10 }}
            onPress={() => handleSearchBar(searchBarActive)}
          >
            {!searchBarActive ? (
              <Icon
                type="material-community"
                name="comment-search-outline"
                size={26}
                color={color.light.corporate}
              />
            ) : (
              <Icon
                type="material-community"
                name="comment-search"
                size={26}
                color={color.light.corporate}
              />
            )}
          </TouchableOpacity>
        ),
        headerTitleAlign: searchBarActive ? "flex-start" : "center",
        headerTitleStyle: { marginHorizontal: -5 },
      });
      setTabBarScreenOptions({ tabBarVisible: true });
      return () => {
        setDrawerScreenOptions(null);
      };
    }, [thema, searchBarActive])
  );

  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        flex: 1,
        justifyContent: "center",
      }}
    >
      <>
        <ConversationList searchFilter={filter} />
        <AddConversationButton />
      </>
    </View>
  );
}
