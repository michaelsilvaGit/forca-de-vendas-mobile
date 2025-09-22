import { StyleSheet } from "react-native"





export default styles = StyleSheet.create({

    containerPrincipal: {
        position: 'relative',
        flex: 1, 
        backgroundColor: '#F8F8F8'
    },

    containerMessagem: {
        position: 'absolute', 
        right: 8, 
        top: 140, 
        alignItems: 'center', 
        zIndex: 1
    },

    botaoEquivalentes: {
        position: 'absolute', 
        left: '4%', 
        top: 137
    },

    containerCorpo: {
        flex: 1, 
        padding: 7, 
        marginTop: 13
    },

    containerSearchInput: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center', 
        backgroundColor: '#efefef', 
        width: '100%', 
        height: 60, 
        marginBottom: 50,
        zIndex: -1
    },

    containerInput: {
        paddingLeft: 10, 
        flexDirection: 'row', 
        width: '87%', 
        height: 50, 
        backgroundColor: '#FFF', 
        borderRadius: 8, 
        elevation: 10, 
        alignItems: 'center',
    },

    filterButton: {
        width: '12%',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bebebe',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 53,
        justifyContent: 'center',
    },

})