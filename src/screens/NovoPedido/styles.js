import React from 'react'
import { StyleSheet } from 'react-native'




export default Styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 10,
        overflow: 'scroll'
    },

    scrollViewContainer: {
        flexGrow: 1,
    },

    containerPedido: {
        paddingHorizontal: 8,
        backgroundColor: '#F8F8F8',
        borderWidth: 1,
        borderColor: '#f6f6f6',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },

    containerCliente: {
        width: '100%',
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },

    containerInfo: {
        backgroundColor: '#FFF',
        width: '100%',
        borderColor: '#dbdbdb',
        borderWidth: 1,
        padding: 8,
        marginBottom: 6,
        borderRadius: 9,
        elevation: 1
    },

    labelBold: {
        marginBottom: 10,
        fontSize: 17,
        fontWeight: 'bold'
    },

    button: {
        height: 30,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0a6c91',
        borderRadius: 7
    },

    textButtonLimpar: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#0a6c91',
    },

    textButtonSalvar: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFF',

    },

    ContainerItens: {
        borderColor: '#dbdbdb',
        backgroundColor: '#FFF',
        justifyContent: 'space-around',
    },

    ContainerButtons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    buttonSalvar: {
        display: 'flex',
        backgroundColor: '#00AD83',
        alignItems: 'center',
        justifyContent: 'center',
        width: '49%',
        paddingVertical: 9,
        borderRadius: 6 
    },

    buttonLimpar: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#0a6c91',
        alignItems: 'center',
        width: '49%',
        paddingVertical: 9,
        borderRadius: 6 
    },


    inputDisable: {
        paddingHorizontal: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.07)',
        height: 44,
        borderRadius: 5
    },

    containerInputCliente: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        color: '#898989',
        fontSize: 20,
        width: '100%', 
        height: 44,
        borderRadius: 5,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderTopColor: '#C1C1C1',
        borderLeftColor: '#C1C1C1',
        borderRightColor: '#C1C1C1',
    },

    inputCliente: {
        height: '100%', 
        width: '92%',
        fontSize: 18, 
        fontWeight: '500', 
        color: '#8A8A8A',
        paddingLeft: 6,
        paddingVertical: 0,
        paddingHorizontal: 4,
        textAlignVertical: 'center'
    },

    inputContainerError: {
        borderBottomWidth: 2,
        borderBottomColor: 'red',
        
    },

    inputContainerOk: {
        borderBottomWidth: 2,
        borderBottomColor: 'green',
    },

    botaoAddProdutos: {
        backgroundColor: '#0a6c91', 
        padding: 4, 
        borderRadius: 5, 
        alignItems: 'center'
    },

    containerValorTotal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 4,
    }


})

