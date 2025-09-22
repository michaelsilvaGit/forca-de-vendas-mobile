import { StyleSheet } from "react-native"




export default Styles = StyleSheet.create({

    containerPrincipal: {
        flex: 1,
        marginBottom: 10, 
        elevation: 10, 
        padding: 2,
        backgroundColor: '#FFF',
    },

    containerHeader: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',      
    },

    containerHeaderPromocao: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#FFF', 
    },

    containerImagem: {
        marginLeft: 7,
        borderWidth: 1,
        height: 70, 
        width: 70
    },

    containerImagemPromocao: {
        marginLeft: 7,
        borderWidth: 1,
        borderColor: '#388E3C',
        height: 70, 
        width: 70
    },

    textDescricao: {
        fontSize: 19, 
        fontWeight: '500', 
        color: '#000',
    },

    textDescricaoPromocao: {
        fontSize: 19, 
        fontWeight: '500', 
        color: '#388E3C'
    },

    textCodigo: {
        fontSize: 17, 
        fontWeight: '400', 
        color: '#000' 
    },

    textCodigoPromocao: {
        fontSize: 18, 
        fontWeight: '400', 
        color: '#388E3C' 
    },

    ContainerMeio: {
        flex: 3, 
        display: 'flex',
        justifyContent: 'center',
        paddingHorizontal: 10, 
        //marginBottom: 14,
        backgroundColor: '#f2f2f2'
    },

    containerQtd: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        borderBottomWidth: 1, 
        borderColor: '#CCC', 
        paddingBottom: 8,
        marginBottom: 5
        //paddingRight: 25
    },

    containerInfoQtd: {
        flexDirection: 'row',  
    },

    botoesQtd: {
        height: 50, 
        backgroundColor: '#00A0D3', 
        justifyContent: 'center', 
        alignItems: 'center',
    },

    inputQtd: {
        width: 50, 
        textAlign: 'center', 
        fontSize: 20, 
        backgroundColor: '#FFF'
    },

    textEstoque: {
        fontSize: 17, 
        fontWeight: '500', 
        color: '#000',
        marginRight: 7
    },

    containerValorEquivalente: {
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        marginBottom: 5
    },

    textValorUnitario: {
        fontSize: 19, 
        fontWeight: '500', 
        color: '#000', 
        marginLeft: 4

    },

    textValorUnitarioPromocao: {
        fontSize: 19, 
        fontWeight: '500', 
        color: 'green', 
        marginLeft: 4
    },

    textValorUnitarioAtacarejo: {
        fontSize: 19, 
        fontWeight: '500', 
        color: '#006b93', 
        marginLeft: 4
    },

    botaoEquivalente: {
        backgroundColor: '#00A796', 
        height: 35, 
        justifyContent: 'center', 
        paddingHorizontal: 10,
        borderRadius: 5
    },

    containerDesconto: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    inputDesconto: {
        height: 35, 
        fontSize: 19, 
        paddingVertical: 0, 
        backgroundColor: '#FFF', 
        borderWidth: 1, 
        borderRadius: 6, 
        borderColor: '#BABABA'
    },

    inputPreco: {
        height: 35, 
        width: '100%',
        fontSize: 19, 
        paddingVertical: 0, 
        backgroundColor: '#FFF', 
        borderWidth: 1, 
        borderRadius: 6, 
        borderColor: '#BABABA',
    },

    containerFooter: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingVertical: 7, 
        paddingHorizontal: 10
    },

    textValorTotal: {
        fontSize: 22, 
        fontWeight: '500', 
        color: '#000'
    },

    botaoAdicionar: {
        width: 130, 
        height: 45, 
        backgroundColor: '#00A0D3', 
        alignItems: 'center', 
        justifyContent: 'center'
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