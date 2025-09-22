import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import Styles from './Styles'



const CardHome = ({ tela, nomeTela = '', IconSvg }) => {

    const navigation = useNavigation();

    const onPressButton = () => {

        if (tela === 'cliente')
            navigation.navigate('PesquisarCliente');
        else if (tela === 'pedido')
            navigation.navigate({ name:'NovoPedido', merge: true});
        else if (tela === 'pesquisarPedido')
            navigation.navigate('PesquisarPedido');
        else if (tela === 'novoCliente')
            navigation.navigate('NovoCliente');
        else if (tela === 'produtos')
            navigation.navigate('Produtos');
        else if (tela === 'relatorioPedido')
            navigation.navigate('RelatorioPedido')
    }


    const isDisabled = tela === 'produtos';

    return (
        <>
            <TouchableOpacity
                style={[Styles.button, isDisabled && { backgroundColor: '#97b1c2' }]}
                onPress={onPressButton}
                disabled={isDisabled}
                pointerEvents={isDisabled ? 'none' : 'auto'}>
                <IconSvg fill={isDisabled ? "#808080" : "#f3f3f3"} width="75%" height="45" />
                <Text style={[Styles.textButton, isDisabled && { color: '#fff' }]}>{nomeTela}</Text>
            </TouchableOpacity>
        </>
    )

}



export default CardHome