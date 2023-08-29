import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = `${domainUrl}/friendships`;

export async function sendFriendRequest(friendId, token) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                friend_id: friendId,
            }),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function acceptFriendRequest(friendshipId, token) {
    try {
        const response = await fetch(`${apiUrl}/${friendshipId}/accept`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}
