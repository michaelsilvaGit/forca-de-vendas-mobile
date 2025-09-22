import { StyleSheet } from "react-native";



export default styles = StyleSheet.create({

    container: {
        position: 'relative',
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    loadingIcon: {
        marginTop: 50
    },

    inputArea: {
        padding: 10,
        //backgroundColor: '#c9c9c9',
        minWidth: '80%',
        marginBottom: 40,
    },

    buttonLogin: {
        height: 60,
        backgroundColor: '#2e94c2',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonLoginDisable: {
        height: 60,
        backgroundColor: '#2f7392',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },

    textButtonLogin: {
        fontSize: 18,
        color: '#FFF'
    },

    textButtonLoginDisable: {
        fontSize: 18,
        color: '#cdcdcd'
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