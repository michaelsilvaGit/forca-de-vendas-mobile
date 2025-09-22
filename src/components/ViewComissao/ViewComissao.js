import React from 'react'
import { Text, View } from 'react-native'
import formatarData from '../../utils/formatarData'

import Styles from './Styles'
import numberFormatBRL from '../../utils/numberFormatBRL'
import { globalStyles } from '../../globalStyles'



const ViewComissao = ({numeroPedido, dataCadastro, ValorBruto, valorLiquido}) => {


    return (
        <>
            <View style={{borderBottomWidth: 1, paddingVertical: 5, width: '100%', display: 'flex', flexDirection: 'row'}}>
                <Text style={[globalStyles.text, {width: '25%', paddingLeft: 8}]}>{formatarData(dataCadastro)}</Text>
                <Text style={[globalStyles.text, {width: '20%', paddingLeft: 8}]}>{numeroPedido}</Text>
                <Text style={[globalStyles.text, {paddingLeft: 8}]}>{numberFormatBRL(valorLiquido)}</Text>
            </View>
        </>
    )
}


export default ViewComissao;