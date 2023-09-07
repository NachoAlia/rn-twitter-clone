import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingTop: 40,
        textAlign: "center"
    },
    list: {
        flex: 1,
        marginVertical: 20,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-around",
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
