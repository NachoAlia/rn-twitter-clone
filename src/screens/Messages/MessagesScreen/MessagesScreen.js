import React, { useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ConversationList } from "../../../components/Messages/ConversationList";
import { useThemaContext } from "../../../components/ThemeProvider";
import { color } from "../../../utils";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { DrawerContext } from "../../../context";
import { Icon, Input } from "react-native-elements";
import { AddConversationButton } from "../../../components/Messages/AddConversationButton";

export function MessagesScreen() {
  const { setDrawerScreenOptions, drawerScreenOptions } =
    useContext(DrawerContext);
  const thema = useThemaContext();

  useFocusEffect(
    React.useCallback(() => {
      setDrawerScreenOptions({
        title: (
          <View
            style={{
              position: "absolute",
              maxWidth: "150%",
              marginLeft: -20,
            }}
          >
            <Input
              placeholder="Buscar mensajes directos"
              inputContainerStyle={{
                width: "120%",
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
              }}
              cursorColor={thema ? color.light.corporate : color.dark.corporate}
            />
          </View>
        ),
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 10 }}>
            <Icon
              type="material-community"
              name="cog-outline"
              color={color.light.corporate}
            />
          </TouchableOpacity>
        ),
        headerTitleAlign: "flex-start",
        headerTitleStyle: { marginHorizontal: -5 },
      });

      return () => {
        setDrawerScreenOptions(null);
      };
    }, [thema])
  );

  return (
    <View
      style={{
        backgroundColor: thema ? color.light.background : color.dark.background,
        flex: 1,
      }}
    >
      <>
        <ConversationList />
        <AddConversationButton />
      </>
    </View>
  );
}
