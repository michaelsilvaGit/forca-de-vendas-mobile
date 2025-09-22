import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fefefe',
        padding: 10,
        borderColor: 'blue'
    },

    textInput: {
        borderBottomWidth: 1,
        borderLeftColor: '#d0d4dc',
        borderLeftWidth: 1,
        borderRightColor: '#d0d4dc',
        borderRightWidth: 1,
        borderTopColor: '#d0d4dc',
        borderTopWidth: 1,
        borderRadius: 5,
        paddingVertical: 6,
    },

    ContainerCliente: {
        backgroundColor: '#fefefe',
        width: 100,
        border: 1,
        borderStyle: 'solid',
        borderColor: '#f6f6f6',
        alignItems: 'left',
        // boxShadow: 1 2 5 '#dbdbdb',
        marginTop: 0,
    },

    ContainerBorder: {
        borderBottomWidth: 1,
        //border: 1,
        //borderStyle: 'solid',
        borderColor: '#dbdbdb',
        //width: 100,
        //padding: 8,
        paddingVertical: 8
    },

    LabelRed: {
        fontSize: 16,
        color: 'red',
    },

    ButtonLogin: {
        backgroundColor: '#34a18d',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 9,
        borderRadius: 6,
        marginTop: 20,
        marginBottom: 30,
    },

    TextButtonLogin: {
        fontSize: 18,
        color: 'white'
    },

    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent', // Fundo semitransparente
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    modalTextInput: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#f2f2f2', // Caixa com fundo visível
        marginBottom: 20,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        width: '45%',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonOpen: {
        backgroundColor: '#34a18d', // Botão "Pesquisar" verde
    },
    buttonClose: {
        backgroundColor: '#f9a950', // Botão "Cancelar" laranja
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
    },
   
})


// export const ContainerCliente = styled.SafeAreaView`
//     background-color: #fefefe;
//     width: 100%;
//     border: 1px solid #f6f6f6;
//     align-items: left; 
//     box-shadow: 1px 2px 5px #dbdbdb;            
//     margin-top: 0px;
//     flex: 1
//     `

// export const ContainerBorder = styled.View`
//     border: 1px solid #dbdbdb;
//     width: 100%;           
//     padding: 8px 8px; 
//     `

// export const LabelRed = styled.Text`
//     font-size: 16px;
//     color: red
//     `

// export const ButtonLogin = styled.View`
//     background-color: #06038D;
//     border-radius: 30px;
//     height: 50px;
//     justify-content: center;
//     align-items: center
// `

// export const TextButtonLogin = styled.Text`
//     fontSize: 18px;
//     color: white
// `