import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import ViewPedido from '../../components/ViewPedido/ViewPedido';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPedidos, resetPedidos } from '../../slices/pedidoSlice';
import Reload from '../../components/Reload/Reload';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import verificarToken from '../../utils/verificarToken';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import Mensagem from 'react-native-toast-message';
import { globalStyles } from '../../globalStyles';
import LoadingLayoutPedido from '../../components/LoadingLayoutPedido/LoadingLayoutPedido';
import IconCircle from 'react-native-vector-icons/FontAwesome';
import { colorEstado } from '../../enum';




export default () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { pedidos, loading, error, messageErroPedido } = useSelector((state) => state.pedido);
    const { qtdTelaPedidos } = useSelector((state) => state.configuracao);
    const { tenant, idColaborador } = useSelector((state) => state.configuracao);
    const { codigoVendedor } = useSelector((state) => state.auth);

    const [textSearch, setTextSearch] = useState('');
    const [openLoading, setOpenLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(0);



    useEffect(() => {

        if (isFocused) {
            verificarToken(navigation, dispatch);
            dispatch(resetPedidos());
        }

    }, [isFocused])


    //CHAMA TODO OS PEDIDOS
    useEffect(() => {

        if (isFocused) {
            let data = {
                filters: {
                    pesquisa: textSearch.toUpperCase(),
                    status: 'A',
                    tipoPesquisa: '',
                    colaboradorId: codigoVendedor,
                    imprimirItensRel: "false"
                },
                page: page,
                size: qtdTelaPedidos,
                sorting: {
                    undefined: 'desc'
                },
                tenant: tenant
            }

            dispatch(getAllPedidos(data));
        }

    }, [isFocused, textSearch, reload]);


    useEffect(() => {
        if (error && messageErroPedido !== '') {
            showMensagem(false, messageErroPedido);
        }
    }, [messageErroPedido, error]);


    const handleReload = useCallback(() => {
        setTextSearch('');
        setReload(prevReload => !prevReload);
    }, []);


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
                            placeholder='Digite o cliente ou número do pedido'
                            value={textSearch}
                            onChangeText={(text) => {handleOnChangeSearchInput(text)}}
                            autoCorrect={false}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{marginBottom: 6, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <IconCircle name='circle' size={10} color={colorEstado.ABERTO} />
                        <Text style={[globalStyles.text, [globalStyles.text, {marginLeft: 2, fontWeight: '500'}]]}>Aberto</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <IconCircle name='circle' size={10} color={colorEstado.ENVIADO} />
                        <Text style={[globalStyles.text, {marginLeft: 2, fontWeight: '500'}]}>Enviado</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <IconCircle name='circle' size={10} color={colorEstado.SINC} />
                        <Text style={[globalStyles.text, {marginLeft: 2, fontWeight: '500'}]}>Sincronizado</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <IconCircle name='circle' size={10} color={colorEstado.FATURADO} />
                        <Text style={[globalStyles.text, {marginLeft: 2, fontWeight: '500'}]}>Faturado</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <IconCircle name='circle' size={10} color={colorEstado.BLOQUEADO} />
                        <Text style={[globalStyles.text, {marginLeft: 2, fontWeight: '500'}]}>Bloqueado</Text>
                    </View>
                </View>

                <View style={styles.containerFlatList}>
                    {loading && !textSearch ? (                  
                        <>
                            <LoadingLayoutPedido />
                            <LoadingLayoutPedido />
                            <LoadingLayoutPedido />
                            <LoadingLayoutPedido />
                            <LoadingLayoutPedido />
                            <LoadingLayoutPedido />
                        </>
                    ) : pedidos && pedidos.length > 0 && !error ? (
                        <FlatList
                            data={pedidos}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <ViewPedido {...item} reload={handleReload} />}
                        />
                    ) : (
                        <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '50%' }]}>Nenhum pedido encontrado!</Text>
                    )}
                </View>
            </View>

            <Reload onPress={handleReload} />

        </>
    )
}


