import React from "react";
import { View, Text, TextInput } from "react-native";
import { Input } from "react-native-elements";
import { IconsButton, color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";

export function SearchInput({ search, mode, changeMode }) {
  const thema = useThemaContext();

  const changemodeSearch = () => {
    changeMode((prevState) => !prevState);
  };
  return (
    <View style={{ flexDirection: "row" }}>
      <Input
        style={{}}
        placeholder="Buscar"
        errorStyle={{ height: 0, margin: 0 }}
        inputStyle={{ color: thema ? color.light.text : color.dark.text }}
        inputContainerStyle={{
          backgroundColor: thema
            ? color.light.background
            : color.dark.background,
          borderRadius: 50,
          paddingHorizontal: 10,
          borderColor: thema ? color.light.contrast : color.dark.contrast,
          borderWidth: 1,
          marginHorizontal: 10,
        }}
        leftIcon={
          <IconsButton
            name="search"
            size={30}
            touchable={false}
            active={true}
          />
        }
        rightIcon={
          mode ? (
            <IconsButton name="users" size={30} onPress={changemodeSearch} />
          ) : (
            <IconsButton name="post" size={30} onPress={changemodeSearch} />
          )
        }
        onChangeText={(text) => {
          search(text);
        }}
      />
    </View>
  );
}
