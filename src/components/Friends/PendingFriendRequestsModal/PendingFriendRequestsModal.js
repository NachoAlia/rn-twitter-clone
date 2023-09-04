import React, { useEffect, useState } from "react";
import { TouchableOpacity, FlatList, View } from "react-native";
import {
    Avatar,
    Text,
    Image,
    Icon,
} from "react-native-elements";

import { Modal, LoadingModal } from "../../Shared";
import { getPendingFriendRequests, acceptFriendship, deleteFriendship } from "../../../config/api/Friends/friends";
import { styles } from './PendingFriendRequestsModal.styles'
import Toast from "react-native-toast-message";
import { color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";



export function PendingFriendRequestsModal({ userId }) {

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const theme = useThemaContext();
    const [pendingRequests, setPendingRequests] = useState([]);

    // useEffect(() => {
    //     fetchPendingRequests();
    // }, []);

    const fetchPendingRequests = async () => {
        try {
            setShowLoading(true);
            const requests = await getPendingFriendRequests(userId);
            setPendingRequests(requests.received_friend_requests);
            setShowLoading(false);
            setShowModal(true);
        } catch (error) {
            console.error("Error fetching pending friend requests:", error);
            setShowLoading(false);
            setShowModal(false);
        }
        // setShowModal(true);
    };
    const acceptRequest = async (myId, requestId) => {
        try {
            setShowLoading(true);
            const requests = await acceptFriendship(myId, requestId);
            setShowLoading(false);
            setShowModal(false);
        } catch (error) {
            console.error("Error accepted friend requests:", error);
            setShowLoading(false);
        }
    };

    const deleteRequest = async (myId, requestId) => {
        try {
            setShowLoading(true);
            const requests = await deleteFriendship(myId, requestId);
            setShowLoading(false);
        } catch (error) {
            console.error("Error deleted friend requests:", error);
            setShowLoading(false);
        }
    };

    return (
        <View>
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => fetchPendingRequests()}
            >
                <Icon name="account-multiple-plus" type="material-community" size={32} color="#ccc" />
                <Text
                    style={{
                        fontSize: 22,
                        paddingHorizontal: 10,
                        color: theme ? color.light.text : color.dark.text,
                    }}
                >
                    List Pending Friendships Request
                </Text>
            </TouchableOpacity>
            <Modal show={showModal} close={() => setShowModal(false)}>
                <View
                    style={[
                        styles.containerModal,
                        {
                            backgroundColor: theme
                                ? color.light.background
                                : color.dark.background,
                        },
                    ]}
                >
                    <View style={styles.header}>
                        <Text style={styles.title}>Friend Requests</Text>
                        <TouchableOpacity style={styles.buttonClose} onPress={() => setShowModal(false)}>
                            <Icon name="close" size={40} color="#000" type="material-community" />
                        </TouchableOpacity>
                    </View>
                    {pendingRequests.length > 0 ? (
                        <FlatList
                            data={pendingRequests}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View style={styles.avatarContainer}>
                                    <Avatar
                                        size="medium"
                                        rounded
                                        containerStyle={styles.avatar}
                                        source={{ uri: item.user_id.url_profile_photo }}
                                    />
                                    <View>
                                        <Text style={styles.username}>{item.user_id.username}</Text>
                                        <Text style={styles.status}>{item.status}</Text>
                                    </View>
                                    <View style={styles.actionButtons}>

                                        <Icon
                                            name="delete"
                                            type="material-community"
                                            size={35}
                                            color="#c40000"
                                            onPress={() => deleteRequest(item.friend_id, item.id)}
                                        />
                                        <Icon
                                            name="check"
                                            type="material-community"
                                            size={35}
                                            color="#0a8c41"
                                            onPress={() => acceptRequest(item.friend_id, item.id)}
                                        />
                                    </View>
                                </View>
                            )}
                        />
                    ) : (
                        <Text style={styles.none}>No pending requests 😓</Text>
                    )}

                </View>
            </Modal>
            <LoadingModal show={showLoading} text="Charging requests..." />
        </View>
    );
}
