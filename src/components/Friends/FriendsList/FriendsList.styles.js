import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'white',
        // justifyContent: "center",
        // alignItems: "center"
        paddingHorizontal: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        padding: 16,
        textAlign: "center"
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
        // padding: 16,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    friendUsername: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 16,
    },
});
