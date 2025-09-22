import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { saveConfig } from '../../slices/configuracaoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton as PaperRadioButton, Text as PaperText } from 'react-native-paper';
import { RenderItemsEnum } from '../../enum';
import Mensagem from 'react-native-toast-message';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import { TextInputMask } from 'react-native-masked-text';
import formatValueInputDesconto from '../../utils/formatValueInputDesconto';
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import { globalStyles } from '../../globalStyles';
import MarcadorLabel from '../../components/MarcadorLabel/MarcadorLabel';
import DropdownPesquisa from '../../components/Dropdowns/DropdownPesquisa';
import { getLoja } from '../../slices/lojaSlice';
import ModalSelect from '../../components/ModalSelect/ModalSelect';

export default () => {

    const isFocused = useIsFocused();
    const route = useRoute();

    const telaLogin = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { qtdTelaProdutos, qtdTelaClientes, qtdTelaPedidos, chaveAtivacao: chaveStorage, loading, sucess, message, meta: metaConfig, nomeProduto: nomeProdutoConfig, lojaPadrao: lojaPadraoConfig, tenant } = useSelector((state => state.configuracao));
    const { usuarioLogin, ativado, bloqueado, primeiroAcesso, chaveAtivacaoValidada } = useSelector((state) => state.validacao);
    const { idLoja: idLojaUsuario, nomeLoja: nomeLojaUsuario } = useSelector((state) => state.auth);
    const { listaLoja } = useSelector((state) => state.loja);

    const [chave, setChave] = useState('');
    const [telaProduto, setTelaProduto] = useState('');
    const [telaCliente, setTelaCliente] = useState('');
    const [telaPedidos, setTelaPedidos] = useState('');
    const [meta, setMeta] = useState(0);
    const [nomeProduto, setNomeProduto] = useState('');
    const [openModalSelectLoja, setOpenModalSelectLoja] = useState(false);
    const [listaLojas, setListaLojas] = useState([]);
    const [lojaPadrao, setLojaPadrao] = useState('');


    React.useLayoutEffect(() => {
        if (telaLogin) {
            navigation.setOptions({
                headerLeft: () => null,
                gestureEnabled: false
            });
        }
    }, [navigation, telaLogin]);


    useEffect(() => {
        if (isFocused) {
            setChave(chaveStorage !== undefined && chaveStorage !== '' ? chaveStorage : chaveAtivacaoValidada);
            setTelaProduto(qtdTelaProdutos > 0 ? qtdTelaProdutos.toString() : RenderItemsEnum.QTD_MIN_PRODUTO);
            setTelaCliente(qtdTelaClientes > 0 ? qtdTelaClientes.toString() : RenderItemsEnum.QTD_MIN_CLIENTE);
            setTelaPedidos(qtdTelaPedidos > 0 ? qtdTelaPedidos.toString() : RenderItemsEnum.QTD_MIN_PEDIDO);
            setMeta(metaConfig > 0 ? metaConfig.toFixed(2) : 0);
            setNomeProduto(nomeProdutoConfig !== undefined && nomeProdutoConfig !== '' ? nomeProdutoConfig : 'Aplicação');

            setLojaPadrao(lojaPadraoConfig !== undefined && lojaPadraoConfig !== '' ? lojaPadraoConfig : idLojaUsuario && nomeLojaUsuario ? {id: idLojaUsuario, name: nomeLojaUsuario} : '');
        }
    }, [isFocused, chaveStorage, qtdTelaProdutos, qtdTelaClientes, qtdTelaPedidos, metaConfig, nomeProdutoConfig, lojaPadraoConfig]);

    useEffect(() => {
        if (message !== '' && !loading) {
            showMensagem(true, message);
        }
    }, [message, sucess, loading]);



    //CHAMA A LOJA 
    useEffect(() => {

        if(isFocused && !telaLogin){

            const data = {

                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idProdutoEquivalente: '0',
                    idListaPreco: '',
                    idFormaPagamento: ''
    
                },
                page: 0,
                size: 500,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
    
            }
    
            if(listaLoja){
    
                setListaLojas([]);
    
                listaLoja.map((item) => {
                    setListaLojas(prevState => [...prevState, { id: item.id, name: item.pessoaRazaoSocial }]);
                });
    
            }else{
                dispatch(getLoja(data))
            }
        }
        
    }, [isFocused, listaLoja]);


    // useEffect(() => {
    //     if(isFocused){
    //         console.log('CONGIGURAÇÃO');
    //         console.log('CHAVE STORAGE: ', chaveStorage);
    //         console.log('IMEI STORAGE: ', imei);
    //         console.log('URL SERVIDOR: ', url);
    //         console.log('----------------------------');
    //     }
    // }, [isFocused, imei, chaveStorage, url])


    const saveConfiguration = () => {

        let data = {
            chaveAtivacao: chave.replace(/[\s.]+/g, ''),
            qtdTelaProdutos: telaProduto,
            qtdTelaClientes: telaCliente,
            qtdTelaPedidos: telaPedidos,
            meta: formatValueInputDesconto(meta).toString(),
            nomeProduto: nomeProduto,
            lojaPadrao: lojaPadrao || ''
            
        }
        dispatch(saveConfig(data))

    }


    const selectLoja = ({id, name}) => {
        setLojaPadrao({id, name});
        setOpenModalSelectLoja(false);
    }

    


    return (

        <>
            <Mensagem config={mensagemConfig} />

            <ModalSelect onCancel={() => setOpenModalSelectLoja(false)} isVisible={openModalSelectLoja} data={listaLojas} titulo={'Loja'} dataSelect={selectLoja} selected={lojaPadrao}/>

            <ScrollView style={{ zIndex: -1 }}>
                <View style={{ paddingHorizontal: 10, marginTop: 20 }}>

                    <Text style={[globalStyles.text, { fontSize: 18, marginBottom: 3, textAlign: 'center' }]}>Chave de ativação</Text>
                    <View style={[styles.inputSearch, { marginBottom: 40, zIndex: -1 }]} >
                        <TextInput
                            style={[globalStyles.text, {width: '95%', textAlign: 'center' }]}
                            value={chave}
                            onChangeText={(text) => {
                                setChave(text);
                            }}
                            editable={chaveAtivacaoValidada === ''}
                        />
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: '100%', paddingVertical: 8, backgroundColor: '#dbdbdb', paddingHorizontal: 9, marginBottom: 12 }}>
                            <Text style={[globalStyles.text, { fontSize: 15 }]}>Configurações aplicativo</Text>
                        </View>
                        
                        <View style={{ marginBottom: 10, backgroundColor: '#FFF', width: '99%', paddingVertical: 5, paddingHorizontal: 8, elevation: 2 }}>
                        
                            <MarcadorLabel text={'Quantidade itens'}/>

                            <View>
                                <Text style={[globalStyles.text, { fontSize: 18, marginBottom: 3 }]}>Produtos:</Text>
                                <View style={{ width: '100%', marginBottom: 8 }}>
                                    <PaperRadioButton.Group onValueChange={status => setTelaProduto(status)} value={telaProduto}>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MIN_PRODUTO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MIN_PRODUTO}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MED_PRODUTO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MED_PRODUTO}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MAX_PRODUTO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MAX_PRODUTO}</PaperText>
                                            </View>
                                        </View>
                                    </PaperRadioButton.Group>
                                </View>

                                <Text style={[globalStyles.text, { fontSize: 18, marginBottom: 3 }]}>Clientes:</Text>
                                <View style={{ width: '100%', marginBottom: 8 }}>
                                    <PaperRadioButton.Group onValueChange={status => setTelaCliente(status)} value={telaCliente}>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MIN_CLIENTE} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MIN_CLIENTE}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MED_CLIENTE} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MED_CLIENTE}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MAX_CLIENTE} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MAX_CLIENTE}</PaperText>
                                            </View>
                                        </View>
                                    </PaperRadioButton.Group>
                                </View>

                                <Text style={[globalStyles.text, { fontSize: 18, marginBottom: 3 }]}>Pedidos:</Text>
                                <View style={{ width: '100%', marginBottom: 8 }}>
                                    <PaperRadioButton.Group onValueChange={status => setTelaPedidos(status)} value={telaPedidos}>
                                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MIN_PEDIDO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MIN_PEDIDO}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MED_PEDIDO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MED_PEDIDO}</PaperText>
                                            </View>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <PaperRadioButton color='#2eaed6' value={RenderItemsEnum.QTD_MAX_PEDIDO} />
                                                <PaperText style={{ fontSize: 15 }}>{RenderItemsEnum.QTD_MAX_PEDIDO}</PaperText>
                                            </View>
                                        </View>
                                    </PaperRadioButton.Group>
                                </View>
                            </View>

                        </View>


                        <View style={{ marginBottom: 10, backgroundColor: '#FFF', width: '99%', paddingVertical: 15, paddingHorizontal: 8, elevation: 3 }}>

                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                                <MarcadorLabel text={'Loja padrão'}/>
                                <MarcadorLabel text={'Meta de vendas'}/>                 
                            </View>
                            
                            
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                
                                <View style={{ width: '47%' }}>
                                    <TouchableWithoutFeedback onPress={() => !telaLogin && setOpenModalSelectLoja(true)}>
                                        <View style={styles.containerInputLoja}>
                                            <Text
                                                style={styles.inputLoja}
                                                numberOfLines={1}
                                            >
                                                {lojaPadrao.name ? lojaPadrao.name : 'Selecione'}
                                            </Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <View style={{
                                    paddingLeft: 10,
                                    width: '47%',
                                    height: 45,
                                    backgroundColor: '#FFF',
                                    borderRadius: 5,
                                    elevation: 5,
                                    alignItems: 'center',
                                }} >

                                    <TextInputMask
                                        style={[globalStyles.text, { width: '100%' }]}
                                        type='money'
                                        options={{
                                            precision: 2,
                                            separator: '.',
                                            unit: '',
                                            suffixUnit: ''
                                        }}
                                        onChangeText={(text) => setMeta(text)}
                                        value={meta.toString()}
                                        keyboardType="numeric"
                                        onBlur={() => {

                                            if (meta === '0' || meta === '') {
                                                let valor = 0
                                                setMeta(valor.toFixed(2));
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: '#FFF', width: '99%', paddingVertical: 15, paddingHorizontal: 8, elevation: 3 }}>
                            <MarcadorLabel text={'Nome do produto'}/>

                            <View style={{ width: '100%', marginBottom: 8 }}>
                                <PaperRadioButton.Group onValueChange={status => setNomeProduto(status)} value={nomeProduto}>
                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <PaperRadioButton color='#2eaed6' value='Descrição' />
                                            <PaperText style={{ fontSize: 15 }}>Descrição</PaperText>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                                            <PaperRadioButton color='#2eaed6' value='Aplicação' />
                                            <PaperText style={{ fontSize: 15 }}>Aplicação</PaperText>
                                        </View>
                                    </View>
                                </PaperRadioButton.Group>
                            </View>

                        </View>
                    </View>

                    <TouchableOpacity activeOpacity={0.9} onPress={() => saveConfiguration()} style={{ marginTop: 30, marginBottom: 20, backgroundColor: '#34a18d', width: '100%', paddingVertical: 9, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Salvar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </>
    )


}

