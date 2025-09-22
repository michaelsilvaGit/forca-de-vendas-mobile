import { StyleSheet } from "react-native"



export default Styles = StyleSheet.create({

    excluirContainer: {
        flexDirection: 'row', 
        backgroundColor: '#FFF', 
        width: '100%', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        paddingLeft: 20, 
        borderWidth: 1, 
        borderColor: '#CECECE'
    },

    containerItems: {
        borderWidth: 1, 
        borderColor: '#C5C5C5', 
        padding: 5, 
        backgroundColor: '#FFF'
    },

    textItems: {
        fontSize: 17,
        fontWeight: '500',
    },

    viewItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3, 
    },

    viewValue: {
        flexDirection: 'row',
        alignItems: 'center', 
    }

})