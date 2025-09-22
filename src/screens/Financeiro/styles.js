import { StyleSheet } from 'react-native'




export default styles = StyleSheet.create({

    viewContainer: {
        flex: 1,
        paddingHorizontal: 10,
    },

    containerSearchInput: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        width: '100%',
        height: 60,
        marginBottom: 15,
        marginTop: 10
    },

    containerFlatList: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        flex: 1,
        marginTop: 20,
    },

    inputSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 10,
        alignItems: 'center',    
    },


    containerFinanceiro: {
        backgroundColor: '#fefefe',
        elevation: 8,
        alignItems: 'left',
        paddingHorizontal: 10,
        paddingVertical: 13,
        borderColor: '#ccc',
        marginBottom: 3,
        flexDirection: 'row'
    },

    containerInfo: {
        paddingLeft: 6,
        borderLeftWidth: 3,
        borderLeftColor: '#0a6c91',
        flex: 1
    },

    momeCliente: {
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold'
    },

    infoFinanceiro: {
        color: '#000',
        fontSize: 15,
        marginTop: 1,
        flex: 3
    },

    containerDropdown: {
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 6
    },

    sendButton: {
        height: 50,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },

    viewEmail: {
        flex: 2,
        position: 'absolute',
        marginLeft: 300,
        //flexDirection: 'row',
        //justifyContent: 'space-evenly',
        //borderRadius: 5,
        //paddingVertical: 8,
        //paddingHorizontal: 20,
        //marginBottom: 10,
        //marginTop:10,
        //backgroundColor: '#f8f8ff',
    },

    viewButton: {
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        borderRadius: 50,
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginBottom: 10,
        marginTop:10,
        backgroundColor: '#f5f5f5',
    }

})


