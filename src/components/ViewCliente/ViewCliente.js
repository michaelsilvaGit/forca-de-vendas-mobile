import React, { useContext, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getClientsById, resetClienteCloneAndEdit } from '../../slices/clienteSlice';
import { resetItemProduto } from '../../slices/produtoSlice';
import { resetPedidoCliente } from '../../slices/pedidoSlice';
import numberFormatBRL from '../../utils/numberFormatBRL';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/Octicons';
import IconDupl from 'react-native-vector-icons/AntDesign';
import { clearItemsFromDraft } from '../../db/repository/pedidoRepositoryDraft';

import Styles from './Styles';
import { globalStyles } from '../../globalStyles';





export default ({ id, razaoSocial, nomeFantasia, cnpjCpf, cidade, estado, saldoCredito, telefone, status, pedido, draftId, codigoInterno, situacaoClienteDescricao}) => {


    const navigation = useNavigation();
    const dispatch = useDispatch();

    const [showSituacao, setShowSituacao] = useState(false);

    const clickCliente = useCallback(async(cliente) => {
        if (pedido) {
            dispatch(resetClienteCloneAndEdit());
            dispatch(resetItemProduto());
            await clearItemsFromDraft(draftId);
            dispatch(getClientsById(cliente));
            navigation.navigate('NovoPedido');
        }
    }, [dispatch, navigation, pedido]);

    if(status === 'A'){
        status = 'ATIVO'
    }else if(status === 'I'){
        status = 'INATIVO'
    }
    


    return (

        <View style={{width: '100%', paddingHorizontal: 24, backgroundColor: '#FFF', borderRadius: 8, elevation: 6, marginBottom: 10}}>
            <TouchableOpacity onPress={() => navigation.navigate('DuplicataCliente', {id, razaoSocial})} style={{position: 'absolute', top: 10, right: 10}}>
                <IconDupl name='profile' size={40} color='#0a6c91' />
            </TouchableOpacity>

            <View style={{position: 'absolute', width: 6, height: '100%', backgroundColor: '#0a6c91', borderTopStartRadius: 8, borderBottomStartRadius: 8}}><Text></Text></View>
      
            <View>
                <TouchableWithoutFeedback onPress={() => {
                    const cliente = {
                        id: id,
                        name: razaoSocial
                    }
                    clickCliente(cliente);
                }}>
                    <View>
                        <View style={{ marginTop: 30, maxWidth: '95%' }}>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#000', textAlign: 'center' }}>{razaoSocial}</Text>
                        </View>
                        <View style={{ marginTop: 30, borderBottomWidth: 1, borderBottomColor: '#dcdcdc', paddingBottom: 16 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{}}>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>Código:</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>CPF/CNPJ:</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>Tel:</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>Cidade:</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>UF:</Text>
                                </View>
                                <View style={{}}>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>{codigoInterno}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>{cnpjCpf}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>{telefone}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>{cidade}</Text>
                                    <Text style={{ fontSize: 17, fontWeight: '500', color: '#696969' }}>{estado}</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 18, fontWeight: '600', color: '#000' }}>Crédito {numberFormatBRL(saldoCredito)}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{paddingVertical: 16}}>
                    <Text style={[ globalStyles.text, {textAlign: 'center', fontSize: 16, fontWeight: '600'} ]}>Situação</Text>
                    <View style={{backgroundColor: '#f1fbff', borderWidth: 1, borderRadius: 8, marginTop: 6, borderColor: '#0a6c91', paddingHorizontal: 6, paddingVertical: 10}}>
                        <Text style={{textAlign: 'center', color: '#000', fontSize: 18, fontWeight: '600'}}>{situacaoClienteDescricao}</Text>
                    </View>
                </View>
                <TouchableOpacity  style={{borderRadius: 10, backgroundColor: '#0a6c91', paddingVertical: 4, marginTop: 4, marginBottom: 28}} onPress={() => navigation.navigate('HistoricoPedido', {id, razaoSocial})}>
                    <Text style={{textAlign: 'center', fontSize: 18, color: '#FFF'}}>Histórico de pedidos</Text>
                </TouchableOpacity>
            </View>   
        </View>























        // <View style={Styles.containerCliente}>
        //     <View style={Styles.containerInfo}>
        //         <TouchableWithoutFeedback onPress={() => {
        //             const cliente = {
        //                 id: id,
        //                 name: razaoSocial
        //             }
        //             clickCliente(cliente);

        //         }}>
        //             <View style={{ flex: 1 }}>
        //                 <Text style={Styles.nomeCliente}>{razaoSocial}</Text> 
        //                 <Text style={Styles.codigoCliente}>Código: {codigoInterno}</Text>
        //                 <Text style={Styles.infoCliente}>CPF/CNPJ: {cnpjCpf}</Text>
        //                 <Text style={Styles.infoCliente}>Tel: {telefone}</Text>
        //                 <Text style={Styles.infoCliente}>Cidade: {cidade}</Text>
        //                 <Text style={Styles.infoCliente}>UF: {estado}</Text>
        //             </View>
        //         </TouchableWithoutFeedback>


        //         <View style={{justifyContent: 'space-between'}}>

        //             <TouchableOpacity style={{paddingHorizontal: 10, paddingVertical: 10}} onPress={() => navigation.navigate('DuplicataCliente', {id, razaoSocial})}>
        //                 <Icon name='profile' size={25} color='#0a6c91' />
        //             </TouchableOpacity>

        //             <TouchableWithoutFeedback onPress={() => showSituacao && setShowSituacao(false)}>
        //                 <View style={{paddingHorizontal: 10, paddingVertical: 10}}>
        //                     {showSituacao ? (
        //                         <>
        //                             <View style={status === 'ATIVO' ? { borderWidth: 1, borderColor: 'green' } : { borderWidth: 1, borderColor: 'red' }}>
        //                                 <Text style={status === 'ATIVO' ? [Styles.infoCliente, { color: 'green' }] : [Styles.infoCliente, { color: 'red' }]}> {status} </Text>
        //                             </View>
        //                             <View>
        //                                 <Text style={[Styles.infoCliente, { fontWeight: '700', color: '#626262' }]}>Crédito</Text>
        //                                 <Text style={Styles.infoCliente}>{`R$${saldoCredito ? saldoCredito : 0}`}</Text>
        //                             </View>
        //                             {/* <View>
        //                             <Text style={[Styles.infoCliente, { fontWeight: '700', color: '#626262' }]}>Disponível</Text>
        //                             <Text style={Styles.infoCliente}>{`R$0`}</Text>
        //                         </View> */}
        //                         </>
        //                     ) : (

        //                         <TouchableOpacity style={{}}
        //                             onPress={() => {
        //                                 setShowSituacao(!showSituacao);
        //                             }}
        //                         >
        //                             <Icon name='infocirlceo' size={25} color='#0a6c91' />
        //                         </TouchableOpacity>
        //                     )}
        //                 </View>
        //             </TouchableWithoutFeedback>

        //         </View>

                
        //     </View>
        //     <TouchableOpacity onPress={() => {
        //         navigation.navigate('HistoricoPedido', {id, razaoSocial});
        //     }}>
        //         <View style={{ borderWidth: 1, borderColor: '#0a6c91', padding: 3, marginTop: 10 }}>
        //             <Text style={{ fontSize: 15, textAlign: 'center', color: '#0a6c91' }}>Histórico de pedidos</Text>
        //         </View>
        //     </TouchableOpacity>
        // </View>
    )
}
