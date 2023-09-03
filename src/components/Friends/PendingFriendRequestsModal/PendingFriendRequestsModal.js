import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Modal, LoadingModal } from "../../Shared";
import { getPendingFriendRequests } from "../../../config/api/Friends/friends";
import { styles } from './PendingFriendRequestsModal.styles'
import Toast from "react-native-toast-message";
import { Icon } from "react-native-elements";
import { color } from "../../../utils";
import { useThemaContext } from "../../ThemeProvider";



export function PendingFriendRequestsModal({ userId }) {

    const [showLoading, setShowLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const theme = useThemaContext();
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        fetchPendingRequests();
    }, []);

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
    console.log(pendingRequests);

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
                    <Text>Pending Friend Requests</Text>
                    {pendingRequests.length > 0 ? (
                        <FlatList
                            data={pendingRequests}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <Text>{item.status}</Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text>No pending requests</Text>
                    )}


                    <TouchableOpacity onPress={() => setShowModal(false)}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <LoadingModal show={showLoading} text="Charging requests..." />
        </View>
    );
}
