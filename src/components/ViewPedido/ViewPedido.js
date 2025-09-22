import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Dimensions, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { resetVisualizarPedido, sincronizarPedido, inativarPedido } from "../../slices/pedidoSlice";
import { useDispatch } from 'react-redux';
import numberFormatBRL from '../../utils/numberFormatBRL';
import Icon from 'react-native-vector-icons/Feather';
import IconCircle from 'react-native-vector-icons/FontAwesome';
import { format, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { colorEstado } from '../../enum';

import Styles from './Styles';
import { globalStyles } from '../../globalStyles';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import ModalHistorico from '../ModalHistorico/ModalHistorico';



const ViewPedido = ({ id,
    numero,
    nomeCliente,
    nomeVendedor,
    dataVenda,
    dataTransacao,
    dataLiberacao,
    dataSincronizado,
    dataFaturamento,
    colaboradorPessoaNomeFantasia,
    transportadoraPessoaNomeFantasia,
    lojaPessoaNomeFantasia,
    cancelado,
    cotacao,
    estadoVenda,
    valorTotal,
    sincronizado,
    codigoInternoCliente,
    total,
    reload
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [estado, setEstado] = useState('');
    const [isTablet, setIsTablet] = useState(false);
    const [openConfirmacaoSync, setOpenConfirmacaoSync] = useState(false);
    const [openConfirmacaoInativar, setOpenConfirmacaoInativar] = useState(false);
    const [openModalHistorico, setOpenModalHistorico] = useState(false);
    const [dia, setDia] = useState('');
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');


    useEffect(() => {

        if (isFocused) {
            const { width } = Dimensions.get('window');
            if (width >= 600) {
                setIsTablet(true);
            }

            formatDataVenda(dataVenda);
        }

    }, [isFocused]);


    useEffect(() => {

        if (sincronizado === 'B') {
            setEstado(colorEstado.BLOQUEADO);
        } else if (estadoVenda === '3') {
            setEstado(colorEstado.FATURADO);
        } else if (sincronizado === 'N') {
            setEstado(colorEstado.ABERTO);
        } else if (sincronizado === 'L') {
            setEstado(colorEstado.ENVIADO);
        } else if (sincronizado === 'S') {
            setEstado(colorEstado.SINC);
        }

    }, [estadoVenda, sincronizado])


    const handleSync = useCallback(() => {
        dispatch(sincronizarPedido(id));
        reload();
    }, []);

    const handleInativarPedido = () => {
        dispatch(inativarPedido(id));
        reload();
    }

    const handleOnCancel = useCallback(() => {
        setOpenConfirmacaoSync(false);
        setOpenConfirmacaoInativar(false);
        setOpenModalHistorico(false);
    }, []);


    const formatDataVenda = (data) => {
        let dataObj;
        if (data.includes('/')) {
            dataObj = parse(data, 'dd/MM/yyyy', new Date());
        } else {
            dataObj = parse(data, 'yyyy-MM-dd', new Date());
        }
        setDia(format(dataObj, 'dd'));
        setMes(format(dataObj, 'MMM', { locale: ptBR }));
        setAno(format(dataObj, 'yyyy'));
    }

    return (

        <>
            <ConfirmationModal isVisible={openConfirmacaoSync} confirmed={handleSync} text={'Deseja sincronizar o pedido Nº'} onCancel={handleOnCancel} data={numero} />
            <ConfirmationModal isVisible={openConfirmacaoInativar} confirmed={handleInativarPedido} text={'Deseja INATIVAR o pedido Nº'} onCancel={handleOnCancel} data={numero} />
            <ModalHistorico isVisible={openModalHistorico} dataTransacao={dataTransacao} dataLiberacao={dataLiberacao} dataSincronizado={dataSincronizado} dataFaturamento={dataFaturamento} onCancel={handleOnCancel} />

            <TouchableWithoutFeedback style={{ width: '100%' }} onPress={() => {
                dispatch(resetVisualizarPedido());
                navigation.navigate('VisualizarPedido', { id, estado });
            }}>
                <View style={{ elevation: 4, backgroundColor: '#FFF', width: '100%', display: 'flex', flexDirection: 'row', borderTopLeftRadius: 8, borderBottomLeftRadius: 8, marginBottom: 4 }}>
                    <View style={[Styles.statusLateral, { backgroundColor: estado }]}>
                        <Text style={{ color: '#FFF', fontWeight: '700', fontSize: 28 }}>{dia || 'D'}</Text>
                        <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 20 }}>{mes || 'mês'}</Text>
                        <Text style={{ color: '#FFF', fontWeight: '600', fontSize: 20 }}>{ano || 'ano'}</Text>
                    </View>

                    <View style={{ width: '84%', paddingVertical: 10 }}>

                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>N° {numero}</Text>
                        </View>

                        <View style={{ paddingHorizontal: 10 }}>
                            <View style={{ width: '100%' }}>
                                <View style={{ marginBottom: 8 }}>
                                    <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>{lojaPessoaNomeFantasia}</Text>
                                </View>
                                <Text style={[globalStyles.text, { fontSize: 16, fontWeight: '600', marginBottom: 6 }]}>[{codigoInternoCliente}] {nomeCliente}</Text>
                                <Text style={globalStyles.text}>Transportadora</Text>
                                <Text style={[globalStyles.text, { fontSize: 16, fontWeight: '600' }]}>{transportadoraPessoaNomeFantasia}</Text>
                            </View>

                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 12 }}>
                                <TouchableOpacity style={{ paddingVertical: 4 }} onPress={() => setOpenModalHistorico(true)}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <Icon name='clock' size={18} color='#5401b2' />
                                        <Text style={[globalStyles.text, { fontWeight: '500', marginLeft: 2 }]}>HISTÓRICO</Text>
                                    </View>
                                </TouchableOpacity>
                                <Text style={[globalStyles.text, { fontSize: 16, fontWeight: '500' }]}>{numberFormatBRL(valorTotal || 0)}</Text>
                            </View>
                            {sincronizado === 'N' && (
                                <View style={{ width: '100%', marginTop: 10, display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setOpenConfirmacaoSync(true)} style={{ borderRadius: 6, borderColor: '#b6b6b6', paddingVertical: 4, width: '50%', paddingHorizontal: 10, borderWidth: 1 }}>
                                        <Text style={{ fontWeight: '500', textAlign: 'center', color: '#178900' }}>SINCRONIZAR</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setOpenConfirmacaoInativar(true)} style={{ borderRadius: 6, borderColor: '#b6b6b6', paddingVertical: 4, width: sincronizado === 'N' ? '50%' : '100%', paddingHorizontal: 10, borderWidth: 1 }}>
                                        <Text style={[globalStyles.text, { fontWeight: '500', textAlign: 'center' }]}>INATIVAR</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                            {sincronizado === 'B' && (
                                <TouchableOpacity onPress={() => setOpenConfirmacaoInativar(true)} style={{ borderRadius: 6, borderColor: '#b6b6b6', paddingVertical: 4, width: sincronizado === 'N' ? '50%' : '100%', paddingHorizontal: 10, borderWidth: 1 }}>
                                    <Text style={[globalStyles.text, { fontWeight: '500', textAlign: 'center' }]}>INATIVAR</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    )

}


export default ViewPedido