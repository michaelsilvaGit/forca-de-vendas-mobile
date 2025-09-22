import React from 'react'
import { Text, View } from "react-native"
import { useSelector } from "react-redux"

import Styles from './styles'
import numberFormatBRL from '../../utils/numberFormatBRL'
import { globalStyles } from '../../globalStyles'





const ItemsPedido = ({
                      aplicacao,
                      descricaoProduto,
                      codigoProduto,
                      quantidade,
                      valorUnitario,
                      percentualDescontoItens,
                      valorDescontoItens,
                      sequencia,
                      unidadeProduto,
                      valorTotal,
                      codigoReferencia
                    }) => {

    const { nomeProduto } = useSelector((state) => state.configuracao);


    return (

        <View style={Styles.containerItems}>
            <View style={{ borderColor: '#0a6c91', borderRightWidth: 2, width: 18, alignItems: 'center', justifyContent: 'center', padding: 0}}>
                <Text style={[globalStyles.text, {fontSize: 19, fontWeight: '700'}]}>{sequencia}</Text>
            </View>

            <View style={{width: '100%', paddingRight: 18, paddingLeft: 6}}>
                <View style={{marginBottom: 8, borderBottomWidth: 1, borderBottomColor: '#dcdcdc', paddingVertical: 5}}>
                    <Text style={[globalStyles.text, Styles.textItems, {fontWeight: 'bold'} ]}>{nomeProduto === 'Descrição' ? descricaoProduto : nomeProduto === 'Aplicação' ? aplicacao || descricaoProduto : 'SEM NOME'}</Text>
                    <Text style={[globalStyles.text, Styles.textItems]}>{codigoProduto}</Text>
                </View>
                <View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[globalStyles.text, Styles.textItems]}>Valor Un.: {numberFormatBRL(valorUnitario)}</Text>
                        <Text style={[globalStyles.text, Styles.textItems]}>Catálogo: {codigoReferencia}</Text>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={[globalStyles.text, Styles.textItems]}>Quantidade: {quantidade}</Text>
                        <Text style={[globalStyles.text, Styles.textItems]}>Unidade: {unidadeProduto}</Text>
                    </View>
                </View>
                <View style={{paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
                    <Text style={[globalStyles.text, Styles.textItems]}>Desc.(%): {percentualDescontoItens.toFixed(2)}</Text>
                    <Text style={[globalStyles.text, Styles.textItems]}>Desc.: {numberFormatBRL(valorDescontoItens)}</Text>
                </View>

                <View style={Styles.viewValue}>
                    <Text style={[globalStyles.text, {fontSize: 18, fontWeight: '700'}]}>Valor: </Text>
                    <Text style={[globalStyles.text, { fontSize: 18 }]}>{numberFormatBRL(valorTotal)}</Text>
                </View>
            </View>
            
        </View>
    )


}

export default ItemsPedido