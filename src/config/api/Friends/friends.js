// src/config/api/Friends/friends.js

import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

// /api/v1/users/:user_id/friendships/:id/create(.:format) 
const apiUrl = `${domainUrl}/users`;

export async function sendFriendRequest(myId, otherPersonId) {
    console.log("userId:", myId);
    try {
        const token = await AsyncStorage.getItem("token");


        const response = await fetch(`${apiUrl}/${JSON.stringify(myId)}/friendships/${otherPersonId}/create`, {
            method: "POST",
            // headers: {
            //     "Content-Type": "application/json",
            //     Authorization: `Bearer ${token}`,
            // },
            // body: JSON.stringify({ friend_id: otherPersonId }),
        });

        if (!response.ok) {
            throw new Error("Unable to send friend request.");
        }

        return "Friend request sent.";
    } catch (error) {
        throw error;
    }
}

export async function deleteFriendship(myId, otherPersonId) {
    try {
        const token = await AsyncStorage.getItem("token");

        const response = await fetch(`${apiUrl}/${JSON.stringify(myId)}/friendships/${otherPersonId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unable to delete friendship.");
        }

        return "Friendship deleted.";
    } catch (error) {
        throw error;
    }
}