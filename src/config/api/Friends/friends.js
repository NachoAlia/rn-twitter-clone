
import { domainUrl } from "../../host";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiUrl = `${domainUrl}/users`;

export async function sendFriendRequest(myId, otherPersonId) {
    console.log("userId:", myId);
    try {
        const token = await AsyncStorage.getItem("token");


        const response = await fetch(`${apiUrl}/${JSON.stringify(myId)}/friendships/${otherPersonId}/create`, {
            method: "POST",
        });

        if (!response.ok) {
            throw new Error("Unable to send friend request.");
        }

        return "Friend request sent.";
    } catch (error) {
        throw error;
    }
}

export async function acceptFriendship(myId, requestId) {
    try {

        const response = await fetch(`${apiUrl}/${myId}/friendships/${requestId}/accept`, {
            method: "POST"
        });

        if (!response.ok) {
            throw new Error("Unabled to accept friendship.");
        }

        return "Friendship accepted.";
    } catch (error) {
        throw error;
    }
}

export async function deleteFriendship(myId, requestId) {
    try {

        const response = await fetch(`${apiUrl}/${myId}/friendships/${requestId}`, {
            method: "DELETE",
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
        const response = await fetch(`${apiUrl}/${userId}/friendships`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Unable to fetch pending friend requests.");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
}


export async function getFriends(userId) {
    try {
        const response = await fetch(`${apiUrl}/${userId}/friendships/accepted`, {
            method: "GET"
        });

        if (!response.ok) {
            throw new Error("Unable to fetch pending friend requests.");
        }

        const data = await response.json();

        return data;
    } catch (error) {
        throw error;
    }
}