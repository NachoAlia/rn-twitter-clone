import React from "react";
import { View, Text, FlatList } from "react-native";

export function FriendsList({ friends }) {
    return (
        <View>
            <Text>Lista de Amigos</Text>
            <FlatList
                data={friends}
                keyExtractor={(friend) => friend.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.username}</Text>
                    </View>
                )}
            />
        </View>
    );
}
