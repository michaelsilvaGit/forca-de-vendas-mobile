import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import InputCalendario from "../../components/InputCalendario/InputCalendario";
import { useDispatch, useSelector } from 'react-redux';
import { getAllPedidos, filtrarPedidos, resetPedidos } from '../../slices/pedidoSlice';
import ViewRelatorioPedido from '../../components/ViewRelatorioPedido/ViewRelatorioPedido';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RadioButton as PaperRadioButton, Text as PaperText } from 'react-native-paper';
import verificarToken from '../../utils/verificarToken';
import RelatorioPedidos from '../../components/Relatorio/Relatorio';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import Mensagem from 'react-native-toast-message';

import { itensPedidoModel } from '../NovoPedido/pedido.model';

import numberFormatBRL from '../../utils/numberFormatBRL';
import { globalStyles } from '../../globalStyles';






export default () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {pedidos, quantidadePedidos, loading, error, messageErroPedido} = useSelector((state) => state.pedido);
    const {tenant, idColaborador} = useSelector((state) => state.configuracao);
    const {codigoVendedor} = useSelector((state) => state.auth);
    const {items, message: messageProduto} = useSelector((state) => state.produto);

    const [textSearch, setTextSearch] = useState('');
    const [openLoading, setOpenLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(300);
    const [qntPedidos, setQntPedidos] = useState(0);
    const [dataAtual, setDataAtual] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clearInputDate, setClearInputDate] = useState(false);
    const [valorTotalPedidos, setValorTotalPedidos] = useState(0);
    const [status, setValue] = useState('todos');



    useEffect(() => {

        if (isFocused) {

            verificarToken(navigation, dispatch);

            dispatch(resetPedidos());
            setClearInputDate(true);
            setStartDate('');
            setEndDate('');
            setDataAtual(new Date());
            setQntPedidos(0);
        }
    }, [isFocused]);


    useEffect(() => {

        if (isFocused) {
            let data = {
                filters: {
                    pesquisa: textSearch.toUpperCase(),
                    status: status,
                    tipoPesquisa: '',
                    colaboradorId: codigoVendedor,
                    dataInicio: startDate || new Date(),
                    dataFim: endDate || new Date(),
                    imprimirItensRel: "true"
                },
                page: page,
                size: size,
                sorting: {
                    undefined: 'desc'
                },
                tenant: tenant
            }
            dispatch(getAllPedidos(data));

        }

    }, [isFocused, textSearch, dataAtual, startDate, endDate, status, items]);


    useEffect(() => {
        somaTotalPedidos()
    }, [pedidos])

    const selectDateStart = (date) => {
        setStartDate(date)
    };

    const selectDateEnd = (date) => {
        setEndDate(date)
    };

    const oncanceLoading = () => {
        setOpenLoading(false);
    };

    const somaTotalPedidos = () => {
        const totalPedidos = pedidos.length > 0 && pedidos.reduce((acc, pedido) => acc + pedido.valorTotal, 0);
        setValorTotalPedidos(totalPedidos)
    }


    useEffect(() => {
        if(error && messageErroPedido !== ''){
            showMensagem(false, messageErroPedido);
        }
    }, [messageErroPedido, error]);


    const handleOnChangeSearchInput = useCallback((text) => { 
        setTextSearch(text);
    }, []);


    return (

        <>

            <View style={styles.viewContainer}>

                <Mensagem config={mensagemConfig} />

                <View style={styles.containerSearchInput}>
                    <View style={styles.inputSearch} >
                        <Icon name='search' size={20} color='#0a6c91' style={{ marginRight: 3 }} />
                        <TextInput
                            style={[globalStyles.text, { width: '95%' }]}
                            placeholderTextColor={'#999999'}
                            placeholder='Digite o número do pedido ou Cliente'
                            value={textSearch}
                            onChangeText={(text) => {handleOnChangeSearchInput(text)}}
                            autoCorrect={false}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{backgroundColor: '#FFF', paddingHorizontal: 8, paddingVertical: 10, marginBottom: 4}}>
                    <View style={styles.containerInputCalendario}>
                        <View style={{ width: '49%' }}>
                            <Text style={[globalStyles.text, { fontWeight: '700' }]}>Data inicial:</Text>
                            <InputCalendario
                                choseDate={selectDateStart}
                                clearInputDate={clearInputDate}
                                setclearInputDate={() => setClearInputDate(false)}
                            />
                        </View>
                        <View style={{ width: '49%' }}>
                            <Text style={[globalStyles.text, { fontWeight: '700' }]}>Data final:</Text>
                            <InputCalendario
                                choseDate={selectDateEnd}
                                clearInputDate={clearInputDate}
                                setclearInputDate={() => setClearInputDate(false)}
                            />
                        </View>
                    </View>

                    <View style={{ width: '100%', marginBottom: 3 }}>
                        <PaperRadioButton.Group onValueChange={status => setValue(status)} value={status}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <PaperRadioButton color='#2eaed6' value="todos" />
                                    <PaperText style={{ fontSize: 15 }}>Todos</PaperText>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <PaperRadioButton color='#2eaed6' value="aberto" />
                                    <PaperText style={{ fontSize: 15 }}>Aberto</PaperText>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <PaperRadioButton color='#2eaed6' value="sincronizado" />
                                    <PaperText style={{ fontSize: 15 }}>Sincronizado</PaperText>
                                </View>
                                {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <PaperRadioButton color='#2eaed6' value="cancelado" />
                                    <PaperText style={{ fontSize: 15 }}>Cancelado</PaperText>
                                </View> */}
                            </View>
                        </PaperRadioButton.Group>
                    </View>
                </View>

 
                <View style={styles.containerFlatList}>
                    {loading && !textSearch ? (
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00A0D3" />
                        </View>
                    ) : pedidos && pedidos.length > 0 && !error ? (
                        <FlatList
                            data={pedidos}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <ViewRelatorioPedido {...item} />}
                        />
                    ) : (
                        <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '30%' }]}>Nenhum pedido foi encontrado</Text>
                    )}
                </View>
    
                
            </View>

            <RelatorioPedidos pedidos={pedidos}  />

            <View style={styles.containerTotaisPedidos}>

                <View>
                    <Text style={[globalStyles.text, { fontWeight: '700', fontSize: 17, color:'#0a6c91' }]}>Valor Total de pedidos</Text>
                    <Text style={[globalStyles.text, { textAlign: 'center', marginTop: 7, fontSize: 16 }]}>{numberFormatBRL(valorTotalPedidos)}</Text>
                </View>
                <View style={{}}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold', fontSize: 17, color:'#0a6c91' }]}>Total Pedidos</Text>
                    <Text style={[globalStyles.text, { textAlign: 'center', marginTop: 7, fontSize: 16 }]}>{quantidadePedidos && quantidadePedidos}</Text>
                </View>

            </View>
        </>
    )
}


