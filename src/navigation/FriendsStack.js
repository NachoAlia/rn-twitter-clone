import React, { useContext } from "react";
import { Icon } from "react-native-elements";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { BookmarkScreen } from "../screens/Bookmark";
import { FriendsScreen } from "../screens/Friends";
import { useNavigation } from "@react-navigation/native";
import { useThemaContext } from "../components/ThemeProvider";
import { screen, color } from "../utils";

const Stack = createNativeStackNavigator();

export function FriendsStack() {
    const navigation = useNavigation();
    const thema = useThemaContext();
    return (
        <Stack.Navigator
            screenOptions={{ headerBackButtonMenuEnabled: false, headerShown: true }}
        >
            <Stack.Screen
                name={screen.friends.list}
                component={FriendsScreen}
                options={{
                    title: "Friends",
                    headerTitleStyle: {
                        color: thema ? color.light.text : color.dark.text,
                    },
                    headerStyle: {
                        backgroundColor: thema
                            ? color.light.background
                            : color.dark.background,
                    },

                    headerLeft: () => (
                        <Icon
                            type="material-community"
                            name="arrow-left"
                            containerStyle={{ marginLeft: 0, marginRight: 30 }}
                            color={thema ? color.light.text : color.dark.text}
                            size={24}
                            onPress={() => navigation.navigate(screen.home.tab)}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
}
