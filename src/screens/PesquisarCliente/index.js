import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ViewCliente from '../../components/ViewCliente/ViewCliente';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import DropdownPesquisa from '../../components/Dropdowns/DropdownPesquisa';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, resetMessageCliente } from '../../slices/clienteSlice';
import Reload from '../../components/Reload/Reload';
import styles from './styles'
import verificarToken from '../../utils/verificarToken';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import Mensagem from 'react-native-toast-message';
import { globalStyles } from '../../globalStyles';
import LoadingLayoutCliente from '../../components/LoadingLayoutCliente/LoadingLayoutCliente';
import { debounce } from 'lodash';







export default ({ route }) => {

    const navigation = useNavigation();
    const pedido = route.params?.pedido;
    const draftId = route.params?.draftId;
    const dispatch = useDispatch();
    const isFfocused = useIsFocused();
    
    const {clientes, loading, error, messageErrorCliente} = useSelector((state) => state.cliente);
    const {tenant, qtdTelaClientes} = useSelector((state) => state.configuracao);
    const {codigoVendedor} = useSelector((state) => state.auth);

    const [textSearch, setTextSearch] = useState('');
    const [tipoPesquisa, setTipoPesquisa] = useState('Razão Social');
    const [openLoading, setOpenLoading] = useState(false);
    const [reload, setReload] = useState(false);
    const [page, setPage] = useState(0);

    

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={goBackPage}>
                    {pedido ? (
                        <Icon2 name='arrow-left-circle' size={30} color='#FFF' marginLeft={20} />
                    ) : (
                        <Icon name='menu-sharp' size={24} color='#FFF' marginLeft={14} />
                    )}
                </TouchableOpacity>
            )
        })
    }, [navigation, pedido]);

    const goBackPage = () => {
        if (pedido) {
            navigation.goBack();
            
        } else {
            navigation.openDrawer();
        }
    }

    useEffect(() => {
        if(isFfocused){
            verificarToken(navigation, dispatch);
        }
    }, [isFfocused])

    
    //CHAMA A FUNÇÃO DEBOUCE JUNTO COM OS PRODUTOS
    useEffect(() => {
        if (isFfocused) {
            fetchClients(textSearch);
        }

        return () => {
            fetchClients.cancel();
        };

    }, [textSearch, tipoPesquisa, reload, isFfocused, fetchClients]);


    //FUNÇÃO PARA USAR O DEBOUCE LIMITANDO PESQUISA RAPIDA DE CLIENTES
    const fetchClients = useCallback(
        debounce((searchTerm) => {
            let data = {

                filters: {
                    pesquisa: searchTerm.toUpperCase(),
                    status: 'A',
                    tipoPesquisa: tipoPesquisa,
                    codigoVendedor: codigoVendedor || null
                },
                page: page,
                size: qtdTelaClientes,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            }
    
            dispatch(getClients(data));
        }, 500),
        [tipoPesquisa, codigoVendedor, qtdTelaClientes, tenant]
    );


    useEffect(() => {
        if(error && messageErrorCliente !== ''){
            showMensagem(false, messageErrorCliente);
        }
    }, [messageErrorCliente, error]);


    const handleOnSelectPesquisa = useCallback((item) => {
        setTextSearch('');
        setTipoPesquisa(item.name);
    }, []);


    const handleOnChangeSearchInput = useCallback((text) => {
        setTextSearch(text);
    }, []);


    const handleReload = useCallback(() => {
        setTextSearch('');
        setReload(prevReload => !prevReload);
    }, []);


    const arrayPesquisa = [
        { id: 1, name: 'Razão Social' },
        { id: 2, name: 'Nome Fantasia' },
        { id: 3, name: 'Código', },
        { id: 4, name: 'CNPJ/CPF' }
    ]




    

    return (
        <>   
            <Mensagem config={mensagemConfig}/>

            <View style={{ flex: 1, padding: 10 }}>
                <View style={styles.containerSeachInput}>
                    <View style={[globalStyles.text, styles.inputSeach]}>
                        <Icon3 name='search' size={20} color='#0a6c91' style={{ marginRight: 3 }} />
                        <TextInput
                            style={[globalStyles.text, {width: '100%'}]}
                            placeholderTextColor={'#999999'}
                            placeholder='Pesquisar cliente'
                            keyboardType={tipoPesquisa === 'Código' ? 'numeric' : 'default'}
                            value={textSearch}
                            onChangeText={(text) => {handleOnChangeSearchInput(text)}}
                            autoCorrect={false}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </View>
                </View>

                <View style={{ width: '100%', marginBottom: 40, zIndex: -1 }}>
                    <DropdownPesquisa
                        tipoPesquisa={arrayPesquisa}
                        buttonDefault={'Razão Social'}
                        onSelect={handleOnSelectPesquisa}
                    />
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                    <View style={styles.containerFlatList}>
                        {loading && !textSearch ? (
                           <>
                            <LoadingLayoutCliente />
                            <LoadingLayoutCliente />
                            <LoadingLayoutCliente />
                            <LoadingLayoutCliente />
                            <LoadingLayoutCliente />
                            <LoadingLayoutCliente />
                           </>
                        ) : clientes && clientes.length > 0 && !error ? (
                            <FlatList
                                data={clientes}
                                keyExtractor={item => `${item.id}`}
                                renderItem={({ item }) => <ViewCliente {...item} pedido={pedido} draftId={draftId} />}
                            />
                        ) : (    
                            textSearch ? (
                                <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '30%' }]}>Cliente não encontrado!</Text>
                            ) : (
                                <View />
                            )
                        )}

                    </View>
                </View>
            </View>
            
            <Reload onPress={handleReload}/>
        </>
    )

}


