import React from 'react'
import { StyleSheet } from 'react-native'





export default styles = StyleSheet.create({

    containerInfo: {
        width: '95%',
        elevation: 8,
        borderRadius: 10, 
        backgroundColor: '#FFF',
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 4
    },

    label: {
        fontSize: 16,
        color: '#0a6c91',
        fontWeight: '600'
    },

    containerFalseInputs: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        color: '#898989',
        fontSize: 20,
        width: '100%', 
        height: 30,
        borderRadius: 5,
        marginVertical: 5,
    },

    containerFalseInputsNoHeight: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        color: '#898989',
        fontSize: 20,
        width: '100%', 
        minHeight: 30,
        borderRadius: 5,
        marginVertical: 5,
    },

    falseInputs: {
        height: '100%', 
        width: '92%',
        fontSize: 18, 
        fontWeight: '500', 
        color: '#8A8A8A',
        paddingLeft: 6,
        paddingVertical: 0,
        paddingHorizontal: 4,
        textAlignVertical: 'center',
    },
})



