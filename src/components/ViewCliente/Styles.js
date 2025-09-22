import { StyleSheet } from 'react-native'




export default Styles = StyleSheet.create({

    containerCliente: {
        backgroundColor: '#fefefe',
        elevation: 8,
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderColor: '#ccc',
        marginBottom: 3,
    },

    containerInfo: {
        flexDirection: 'row',
        paddingLeft: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#0a6c91'
    },

    nomeCliente: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
    },

    infoCliente: {
        color: '#000',
        fontSize: 15,
        marginTop: 1
    },

    codigoCliente: {
        color: '#000',
        fontSize: 18,
        
    },






    containerStatusIcon: {
        display: 'flex', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

})