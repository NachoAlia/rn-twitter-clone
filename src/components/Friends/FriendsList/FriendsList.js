import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { getFriends } from "../../../config/api/Friends/friends";
import { LoadingModal } from "../../Shared";

export function FriendsList({ userId }) {

    const [showLoading, setShowLoading] = useState(false);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        handleGetFriends(userId);
    }, []);

    const handleGetFriends = async (userId) => {
        try {
            setShowLoading(true);
            const requests = await getFriends(userId);
            console.log(requests);
            setFriends(requests);
            setShowLoading(false);
        } catch (error) {
            console.error("Error get friends:", error);
            setShowLoading(false);
        }
    };
    return (
        <View>
            <Text onPress={() => handleGetFriends(userId)} >Lista de Amigos</Text>
            <FlatList
                data={friends}
                keyExtractor={(friend) => friend.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.friend_id.id}</Text>
                        <Text>{item.friend_id.username}</Text>
                    </View>
                )}
            />
            <LoadingModal show={showLoading} text="Charging friends..." />
        </View>
    );
}
