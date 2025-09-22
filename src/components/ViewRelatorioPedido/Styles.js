import { StyleSheet } from 'react-native';



export default Styles = StyleSheet.create({

    containerPedido: {
        backgroundColor: '#fefefe',
        elevation: 8,
        alignItems: 'left',
        padding: 10,
        borderColor: '#ccc',
        marginBottom: 3,
    },

    containerPedidoHeader: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    textBold: {
        fontWeight: 'bold'
    },

    TextBoldGreen: {
        color: 'green',
        fontWeight: 'bold'
    },

    TextBoldRed: {
        color: 'red',
        fontWeight: 'bold'
    },
    
    TextBoldBlue: {
        color: 'blue',
        fontWeight: 'bold'
    },

    viewWpp: {
        flex: 2,
        position: 'absolute',
        marginLeft: 300,
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
        //borderRadius: 5,
        //paddingVertical: 8,
        //paddingHorizontal: 20,
        //marginBottom: 10,
        marginTop:50,
        //backgroundColor: '#f8f8ff',
    },

})