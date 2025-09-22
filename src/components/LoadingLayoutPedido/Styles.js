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
    
    
    TextBoldCiano: {
       fontSize: 16,
       color: '#e3650d',
       fontWeight: '600'
    },
    
    TextBoldGreen: {
        fontSize: 16,
        color: 'green',
        fontWeight: '600'
    },
    
    TextBoldRed: {
        fontSize: 16,
        color: 'red',
        fontWeight: '600'
    },
    
    TextBoldBlue: {
        fontSize: 16,
        color: 'blue',
        fontWeight: '600'
    },
    
    dotsContainer: {
        flexDirection: 'row', 
        marginLeft: 2, 
        alignItems: 'flex-end'
    },
    dot: {
        marginLeft: 3,
        fontWeight: 'bold',
        color: '#e3650d'
    },


})





