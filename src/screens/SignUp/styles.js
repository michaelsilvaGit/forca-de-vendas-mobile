import { StyleSheet } from "react-native";



export default styles = StyleSheet.create({

    container: {
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingIcon: {
        marginTop: 50
    },

    inputArea: {
        padding: 40,
        width: '100%'
    },

    buttonLogin: {
        height: 60,
        backgroundColor: '#06038D',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonLogin: {
        fontSize: 18,
        color: '#FFF'
    },

    message: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
        marginBottom: 20

    },

    textMessage: {
        fontSize: 16,
        color: '#06038D'
    },

    textMessageBold: {
        fontSize: 16,
        color: '#06038D',
        fontWeight: 'bold',
        marginLeft: 5
    }

})