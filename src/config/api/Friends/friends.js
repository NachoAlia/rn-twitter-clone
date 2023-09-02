
import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        });

        if (!response.ok) {
            throw new Error("Unable to delete friendship.");
        }

        return "Friendship deleted.";
    } catch (error) {
        throw error;
    }
}

export async function getPendingFriendRequests(userId) {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${apiUrl}/${userId}/friendships/pending`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unable to fetch pending friend requests.");
        }

        const data = await response.json();
        return data.pending_requests;
    } catch (error) {
        throw error;
    }
}
