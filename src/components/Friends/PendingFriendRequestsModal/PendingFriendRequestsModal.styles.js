import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    containerModal: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: 'white',
        margin: -5
    },
    header: {
        flexDirection: 'row',
        alignSelf: "stretch",
        justifyContent: "space-around",
        marginVertical: 5
        // borderBottomWidth: 1,
        // borderColor: "#C1C1C1",

    },
    buttonClose: {
        marginLeft: 80,
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 10,
        paddingVertical: 20
        // backgroundColor: "red"
    },
    title: {
        fontSize: 22,
        paddingHorizontal: 10,
        fontWeight: 'bold',
        marginVertical: 10,

    },
    avatarContainer: {
        flexDirection: 'row',
        justifyContent: "space-around",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#C1C1C1",

    },

    username: {
        fontSize: 18,
        fontWeight: 'bold',

    },
    none: {
        fontSize: 18,
        textAlign: "center"
    },
    status: {
        fontSize: 16,
        color: '#555',
    },
    actionButtons: {
        flexDirection: 'row',
        marginLeft: 30,
        alignItems: "center",
    },

});
