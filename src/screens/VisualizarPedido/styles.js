import React from 'react'
import { StyleSheet } from 'react-native'




export default Styles = StyleSheet.create({

    label: {
        fontSize: 16,
        color: '#0a6c91',
        fontWeight: '600'
    },


    containerInfoItens:{
        width: '95%',
        elevation: 8,
        borderRadius: 10, 
        backgroundColor: '#FFF',
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#C5C5C5'
    },

    labelItensPedido: {
        textAlign: 'center',
        marginVertical: 5,
        fontSize: 18
    },


    containerItems: {
        borderWidth: 1, 
        borderColor: '#0a6c91',
        padding: 5, 
        backgroundColor: '#FFF',
        flexDirection: 'row'
    
    },

    containerButtons: {
        width: '95%',
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    textItems: {
        fontSize: 17,
        fontWeight: '400',
    },

    viewItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 3, 
    },

    viewValue: {
        flexDirection: 'row',
        marginTop: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonClonar: {
        marginBottom: 20, 
        backgroundColor: '#34a18d', 
        width: '48%', 
        paddingVertical: 7, 
        borderRadius: 6
    },

    buttonClonarOnly: {
        marginBottom: 20, 
        backgroundColor: '#34a18d', 
        width: '100%', 
        paddingVertical: 7, 
        borderRadius: 6
    },

    textButtonClonar: {
        textAlign: 'center', 
        fontSize: 18, 
        color: '#FFF', 
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
