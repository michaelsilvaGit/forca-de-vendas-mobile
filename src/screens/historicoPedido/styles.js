import { StyleSheet } from "react-native"





export default styles = StyleSheet.create({

    containerPrincipal: {
        flex: 1, 
        backgroundColor: '#F8F8F8', 
        paddingHorizontal: 11
    },

    containerNomeCliente: {
        backgroundColor: '#FFF', 
        marginTop: 15, 
        justifyContent: 'center',
        borderRadius: 6,
        padding: 10,
        borderRadius: 7,
        elevation: 6,
        zIndex: -1,
    },

    containerInputCalendario: {
        width: '100%',
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 30,
        zIndex: -1,
        backgroundColor: '#FFF',
        elevation: 6,
        paddingHorizontal: 4,
        paddingVertical: 7,
        borderRadius: 7,
        marginTop: 12
    },

    botaoFiltrar: {
        height: 36, 
        borderRadius: 5, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#00A0D3',
        marginBottom: 15
    },

    containerFlatList: {
        borderWidth: 1,
        borderColor: '#E1E1E1',
        flex: 1,
    },
})