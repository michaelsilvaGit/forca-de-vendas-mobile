import { StyleSheet } from "react-native"




export default Styles = StyleSheet.create({


    //Dropdow Pesquisa
    
    buttonDropdowPesquisa: {
        width: 'auto', 
        backgroundColor: '#FFF', 
        borderBottomWidth: 1,
        borderBottomColor: '#bebebe'
    },



    //DropDow Required

    dropdown2BtnStyle: {
        width: '100%',
        height: 48,
        backgroundColor: '#FFF',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 2,
        borderColor: '#C1C1C1',
        borderRadius: 8,
    },

    dropdown2BtnTxtStyle: {
        color: '#838383',
        textAlign: 'left'

    },

    dropdown2DropdownStyle: {
        backgroundColor: '#FFF',
        borderRadius: 12,
    },

    dropdown2RowStyle: { backgroundColor: '#FFF', borderBottomColor: '#0a6c91' },
    dropdown2RowTxtStyle: {
        color: '#838383',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    dropdown2SelectedRowStyle: { backgroundColor: '#FFF' },

    dropdown2searchInputStyleStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#0a6c91',
    },


    inputContainerError: {
        borderBlockEndColor: 'red',
    },

    inputContainerOk: {
        borderBlockEndColor: 'green',
    },
})