import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: 12
    },

    containerSearchInput: {
        marginTop: 20,
        marginBottom: 50,
        zIndex: -1
    },

    containerDropdow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5
    },

    containerFlatList: {
        flex: 1,
    },

    inputSearch: {
        paddingLeft: 10,
        flexDirection: 'row',
        width: '87%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        elevation: 10,
        alignItems: 'center',
    },


    containerProduto: {
        flex: 1,
        width: '100%',
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        marginBottom: 12,
        borderLeftWidth: 3,
        borderLeftColor: '#0a6c91',
        borderTopColor: '#C8C8C8',
        borderBottomColor: '#C8C8C8',
        borderRightColor: '#C8C8C8',
    },

    containerDescricao: {
        elevation: 5,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 4,
        paddingVertical: 10
    },

    containerDescricaoPromocao: {
        elevation: 5,
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        marginBottom: 4,
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: '#388E3C'
    },

    containerImagem: {
        marginLeft: 7,
        borderWidth: 1,
    },

    containerImagemPromocao: {
        marginLeft: 7,
        borderWidth: 1,
        borderColor: '#388E3C'
    },

    nomeProduto: {
        fontSize: 19,
        fontWeight: '500',
        color: '#000'
    },

    nomeProdutoPromocao: {
        fontSize: 19,
        fontWeight: '600',
        color: '#388E3C'
    },

    infoProduto: {
        fontSize: 16,
        //fontWeight: '400',
        color: '#000'
    },

    infoProdutoPromocao: {
        fontSize: 17,
        fontWeight: '400',
        color: '#388E3C'
    },

    infoProdutoText: {
        textAlign: 'center',
    },

    viewInfo: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#FFF',
    },

    viewDescription: {
        flex: 1,
        marginLeft: 6,
    },


    productEquivalent: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        flexDirection: 'row',
        justifyContent: 'center'
    },

    textEquivalent: {
        fontSize: 17,
        marginRight: 1,
        color: '#7f7f7f'
    },

    textEquivalentPromocao: {
        fontSize: 17,
        marginRight: 1,
        color: '#474747'
    },

    

    imgProducts: {
        height: 60,
        width: 60,
    },

    infoColumns: {
        marginVertical: 5,
        marginHorizontal: 30
    },

    filterButton: {
        width: '12%',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: '#bebebe',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        justifyContent: 'center',
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalImage: {
        width: '90%',
        height: '70%',
        resizeMode: 'contain',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 25,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'black',
    },
})


