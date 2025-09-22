import { StyleSheet } from 'react-native';



export default styles = StyleSheet.create({

    containerSearchInput: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef',
        width: '100%',
        height: 90,
        zIndex: -1,
        paddingHorizontal: 8
    },

    containerInputCalendario: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 17,
        zIndex: -1,
        backgroundColor: '#FFF',
        elevation: 6,
        paddingHorizontal: 4,
        paddingVertical: 7,
        borderRadius: 7
       
    },

    containerradioForm: {
        width: '100%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between'
        
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

    containerFlatList: {
        borderColor: '#E1E1E1',
        flex: 1,
        elevation: 1,
        
    },

    viewContainer: {
        flex: 1,
    },
    containerTotaisPedidos: {
        width: '100%',
        backgroundColor: '#FFF',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingVertical: 8,

    },

    
})
