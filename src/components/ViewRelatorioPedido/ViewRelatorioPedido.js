import React, { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, Button, TextInput, TouchableWithoutFeedback } from 'react-native';
import { resetVisualizarPedido } from '../../slices/pedidoSlice';
import Wpp from '../../assets/wppEnviar.svg';
import numberFormatBRL from '../../utils/numberFormatBRL';
import { globalStyles } from '../../globalStyles';
import { useDispatch } from 'react-redux';

import Styles from '../../components/ViewRelatorioPedido/Styles';
import { useNavigation } from '@react-navigation/native';

const ViewRelatorioPedido = ({ id,
    numero,
    nomeCliente,
    dataVenda,
    colaboradorPessoaNomeFantasia,
    transportadoraPessoaNomeFantasia,
    lojaPessoaNomeFantasia,
    cancelado,
    cotacao,
    codigoInternoCliente,
    estadoVenda,
    valorTotal,
    total,
    sincronizado,
    itens,
}) => {



    const dispatch = useDispatch();
    const navigation = useNavigation();
    
    const [estado, setEstado] = useState('');
    const [sendWppEnable, setSendWppEnable] = useState(false);
    //const [wpp, setWpp] = useState('');



    // useEffect(() => {
    //     itens?.map((item => {
    //         console.log('ITENS', item)
    //     }))
    // }, [])





    useEffect(() => {

        if(cancelado === 'S'){
            setEstado('CANCELADO');
        }else if(sincronizado === 'S'){
            setEstado('SINCRONIZADO');
        }else if(sincronizado === 'N'){
            setEstado('ABERTO');
        }

    }, [estado, cancelado, cotacao, sincronizado])


    //ENVIAR PEDIDO PELO WPP - possivel lógica
    // const sendWpp = () => {
    //     console.log('Pedido enviado para: ', wpp);

    //     if (wpp) {
    //         return Alert.alert(`Pedido enviado com sucesso para ${wpp}!`,
    //             '',
    //             [{
    //                 text: 'Ok', onPress: () => {
    //                     setWpp('');
    //                     setSendWppEnable(false);

    //                 }
    //             }]
    //         )
    //     }
    // }



    return (
        <>
            <TouchableWithoutFeedback onPress={() => {
                dispatch(resetVisualizarPedido());
                navigation.navigate('VisualizarPedido', {id, estado});
            }}>
            <View style={Styles.containerPedido}>
                <View style={Styles.containerPedidoHeader}>
                    <Text style={[globalStyles.text, Styles.textBold, {fontSize: 16}]}>Nº {numero}</Text>
                    <Text style={[globalStyles.text]}>{dataVenda}</Text>
                </View>
                <View style={Styles.containerPedidoHeader}>
                        <Text style={[globalStyles.text, Styles.textBold, {fontSize: 16}]}>LOJA: {lojaPessoaNomeFantasia}</Text>
                    </View>
                <View>
                    <Text style={globalStyles.text}>Cliente</Text>
                    <Text style={[globalStyles.text, Styles.textBold]}>{`[ ${codigoInternoCliente ? codigoInternoCliente : ''} ] ${nomeCliente}`}</Text>
                </View>
                <View>
                    <Text style={globalStyles.text}>Vendedor</Text>
                    <Text style={[globalStyles.text, Styles.textBold]}>{colaboradorPessoaNomeFantasia}</Text>
                </View>
                <View>
                    <Text style={globalStyles.text}>Transportadora</Text>
                    <Text style={[globalStyles.text, Styles.textBold]}>{transportadoraPessoaNomeFantasia}</Text>
                </View>
                <View>
                    <Text style={globalStyles.text}>STATUS</Text>
                    <Text
                        style={
                            estado === 'SINCRONIZADO' ? Styles.TextBoldGreen :
                                estado === 'ABERTO' ? Styles.TextBoldBlue : Styles.TextBoldRed
                        }
                    >
                        {estado}
                    </Text>
                </View>

                <View style={{}}>
                    <Text style={globalStyles.text}>Valor total</Text>
                    <Text style={[globalStyles.text, Styles.textBold]}>{valorTotal ? numberFormatBRL(valorTotal) : numberFormatBRL(total)}</Text>
                </View>




                {/* <View style={Styles.viewWpp}>
                    {estado === 'CONCLUÍDO' && (
                        <View>
                            <TouchableOpacity
                                onPress={() => setSendWppEnable(!sendWppEnable)}>
                                <Wpp />
                            </TouchableOpacity>
                        </View>
                    )}
                </View> */}

                {/* <View>
                    {sendWppEnable && (
                        <View>
                            <TextInput
                                placeholder='Digite o WhatsApp para envio'
                                onChangeText={setWpp}
                                value={wpp}
                                keyboardType='numeric'
                            />
                            <Button title='Enviar para WhatsApp' onPress={sendWpp} />

                        </View>
                    )}
                </View> */}
            </View>
            </TouchableWithoutFeedback>
        </>


    )

}


export default ViewRelatorioPedido;