import React, { useReducer, useState, useContext, useEffect, useCallback, useLayoutEffect, useRef } from 'react'
import { View, StyleSheet, ScrollView, FlatList, Button, TextInput, Text, TouchableOpacity, TouchableWithoutFeedback, Modal, Alert } from 'react-native'
import Styles from './styles'
import moment from 'moment'
import DropdownRequired from '../../components/Dropdowns/DropdownRequired'
import ItemPedido from '../../components/ItemsPedido/ItemPedido'
import EditarItem from '../../components/ItemsPedido/EditarItem'
import Icon from 'react-native-vector-icons/FontAwesome'
import IconDraft from 'react-native-vector-icons/Foundation'
import { useNavigation, useIsFocused, useRoute } from '@react-navigation/native'
import { resetMessageProduto, resetItemProduto } from '../../slices/produtoSlice'
import { resetMessageCliente } from '../../slices/clienteSlice'
import { savePedido, resetForRelatorioPedido } from '../../slices/pedidoSlice'
import { useSelector, useDispatch } from 'react-redux'
import { pedidoModel } from './pedido.model'
import { itensPedidoModel } from './pedido.model'
import { getFormaPagamento, resetpagamentoCloneAndEdit } from '../../slices/formaPagamentoSlice'
import { getTransportadora, resetTransportadoraCloneAndEdit, transportadoraCloneAndEdit } from '../../slices/transportadoraSlice'
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import RNPrint from 'react-native-print';
import styles from './styles'
import numberFormatBRL from '../../utils/numberFormatBRL'
import formatValueInputDesconto from '../../utils/formatValueInputDesconto'
import { globalStyles } from '../../globalStyles';
import { generatePedidoHTML } from '../../components/Relatorio/RelatorioPedidosUtils';
import { generateSavePedido } from '../../components/Relatorio/RelatorioSavePedido'
import DropdownPesquisa from '../../components/Dropdowns/DropdownPesquisa'
import { getLoja, resetLojaCloneAndEdit } from '../../slices/lojaSlice'
import ModalSelect from '../../components/ModalSelect/ModalSelect'
import validarFormaPagamento from '../../utils/validarFormaPagamento'
import { getDraft, mergeAndSaveDraft, updateItemInDraft, deleteDraftById, removeItemFromDraft } from '../../db/repository/pedidoRepositoryDraft'
import { ensureDraftId, setCurrentDraftId, getCurrentDraftId, clearCurrentDraftId} from '../../db/repository/pedidoRepositoryDraft'


import ModalDraft from '../../components/ModalDraft/ModalDraft'

export default () => {

    const route = useRoute();
    const paramsRef = useRef(null);
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const dispatch = useDispatch();


    useLayoutEffect(() => {

        const isEdit = Number(route?.params?.idPedido);

        navigation.setOptions({
            title: isEdit > 0 ? `Editando pedido Nº ${route?.params?.numero}` : "Novo pedido",
      
            headerRight: () => (
                <TouchableOpacity onPress={() => setOpenModalDraft(true)}>
                    <IconDraft name='clipboard-pencil' size={36} color='#FFF'/>
                </TouchableOpacity>
            ),
      
            headerRightContainerStyle: { marginRight: 16},
          });
        

    }, [navigation, editPedidoData, paramsRef, route]);

    const dateString = moment(date).format('DD[/]MM[/]YYYY');

    const { items } = useSelector((state) => state.produto);
    const { cliente: clientePesquisa, clienteCloneAndEdit } = useSelector((state) => state.cliente);
    const { message, messageErroPedido, numeroPedido, sucess, loading, error } = useSelector((state) => state.pedido);
    const { prazos, prazoCloneAndEdit } = useSelector((state) => state.formaPagamento);
    const { transportadoras, transportadoraCloneAndEdit } = useSelector((state) => state.transportadora);
    const { codigoVendedor, nomeUsuario, idLoja: idLojaUsuario, nomeLoja: nomeLojaUsuario } = useSelector((state) => state.auth);
    const { tenant, idColaborador, lojaPadrao, idOperacao } = useSelector((state) => state.configuracao);
    const { listaLoja, lojaCloneAndEdit } = useSelector((state) => state.loja);

    const [date, setDate] = useState(new Date());
    const [dateNow, setDateNow] = useState(dateString);
    const [cliente, setCliente] = useState({});
    const [observacao, setObservacao] = useState('');
    const [openEditarItem, setOpenEditarItem] = useState(false);
    const [itemsPedido, setItemsPedido] = useState([]);
    const [valorTotalItem, setValorTotalItems] = useState(0);
    const [precoVendaEdit, setPrecoVendaEdit] = useState(0);
    const [valorDesconto, setValorDesconto] = useState(0);
    const [qtd, setQtd] = useState(0);
    const [qtdProdutos, setQtdProdutos] = useState(0);
    const [clearStates, setClearStates] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [listaTransportadoras, setListaTransportadoras] = useState([]);
    const [prazoId, setPrazoId] = useState('');
    const [editPedidoData, setEditPedidoData] = useState({});
    const [nomePrazo, setNomePrazo] = useState('');
    const [transportadoraId, setTransportadoraId] = useState('');
    const [nometransportadora, setNomeTransportadora] = useState('');
    const [listaLojas, setListaLojas] = useState('');
    const [lojaId, setLojaId] = useState('');
    const [nomeLoja, setNomeLoja] = useState('');
    const [openModalSelectPagamento, setOpenModalSelectPagamento] = useState(false);
    const [openModalSelectTransportadora, setOpenModalSelectTransportadora] = useState(false);
    const [openModalSelectLoja, setOpenModalSelectLoja] = useState(false);
    const [openModalDraft, setOpenModalDraft] = useState(false);
    const [listaPrazos, setListaPrazos] = useState('');
    const [prazo, setPrazo] = useState('');
    const [transportadora, setTransportadora] = useState('');
    const [loja, setLoja] = useState('');
    const [refreshModalDraft, setRefreshModalDraft] = useState(false);
    const [draftId, setDraftId] = useState(null);

    const isFilledCliente = cliente && cliente?.razaoSocial && cliente?.razaoSocial.trim() !== '';
    const isFilledPrazo = nomePrazo && nomePrazo.trim() !== '';
    const isFilledTransportadora = nometransportadora && nometransportadora.trim() !== '';
    const isFfilledLoja = loja && loja?.name?.trim() != '';



    const [form, setForm] = useState({
        loja: '',
        cliente: '',
        transportadora: '',
        formaPagamento: '',
        observacao: '',
        itens: [],
    });

    const draftIdFromRoute = route?.params?.drafRoutetId ?? null;

    // Se veio de "continuar rascunho", carrega e fixa o id na sessão
    useEffect(() => {
        (async () => {
            if (draftIdFromRoute) {
                setCurrentDraftId(draftIdFromRoute);
                const d = await getDraft(draftIdFromRoute);
                if (d?.form) setForm(d.form);
            }
        })();
    }, [isFocused, draftIdFromRoute]);



    //CHAMA FORMA DE PAGAMENTO
    useEffect(() => {

        if (isFocused) {

            let data = {

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

            if (prazos) {

                setListaPrazos([]);

                const novoArray = prazos.map(prazo => ({
                    id: prazo.id,
                    name: `${prazo.descricao} | Acima ${numberFormatBRL(prazo.ate)}`,
                    ate: prazo.ate
                }));

                setListaPrazos(novoArray);

            } else {
                dispatch(getFormaPagamento(data))
            }
        }

    }, [isFocused, prazos]);



    //CHAMA A LOJA 
    useEffect(() => {

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

        if (listaLoja) {

            setListaLojas([]);

            listaLoja.map((item) => {
                setListaLojas(prevState => [...prevState, { id: item.id, name: item.pessoaRazaoSocial }]);
            });

            if (lojaCloneAndEdit) {
                setLoja('');
                setLoja(lojaCloneAndEdit);
            }

        } else {

            dispatch(getLoja(data))
        }

    }, [listaLoja, clearStates]);


    //clone do cliente
    useEffect(() => {
        if (clienteCloneAndEdit) {
            setCliente('');
            setObservacao('');
            setObservacao(clienteCloneAndEdit?.observacao);
            clienteCloneAndEdit?.id != null && clienteCloneAndEdit?.id != undefined && setCliente(clienteCloneAndEdit);
        }
    }, [clienteCloneAndEdit]);


    //loja Padrão e clone
    useEffect(() => {
        lojaPadraoEclone();
    }, [isFocused, lojaCloneAndEdit]);


    //Clone dos prazos
    useEffect(() => {
        if (prazoCloneAndEdit) {
            setPrazoId('');
            setNomePrazo('');
            setPrazoId(prazoCloneAndEdit.id);
            setNomePrazo(prazoCloneAndEdit.name);
            setPrazo(prazoCloneAndEdit);
        }
    }, [prazoCloneAndEdit]);

    //clone transportadora
    useEffect(() => {
        if (transportadoraCloneAndEdit) {
            setTransportadoraId('');
            setNomeTransportadora('');
            setTransportadoraId(transportadoraCloneAndEdit.id);
            setNomeTransportadora(transportadoraCloneAndEdit.name);
            setTransportadora(transportadoraCloneAndEdit);
        }
    }, [transportadoraCloneAndEdit]);


    //Ao entrar na pagina e quando tiver alteração de itens coloca eles no state
    useEffect(() => {
        if (isFocused) {
            items && setItemsPedido(items);
            //items && addItem(items);
        }
    }, [isFocused, items])


    //Coloca o search params do clone do pedido e ID rascunho no stateh
    useEffect(() => {
        if (isFocused) {

            const p = route?.params ?? null;
            paramsRef.current = p;        // snapshot sempre atual
            setEditPedidoData(paramsRef.current);

            //setDraftId(undefined);
            //setDraftId(draftIdFromRoute);
            // console.log('ROTA USEeFECT: ', route);
            // console.log('ID RASCUNHO: ', draftIdFromRoute);
            // console.log('ID RASCUNHO: ',  paramsRef.current);
            // console.log('ID EDITE PEDIDO: ', editPedidoData);
        }
    }, [isFocused, route?.params, draftIdFromRoute, editPedidoData])

    //Coloca o cliente selecionado da pesquisa no state cliente
    useEffect(() => {
        if (clientePesquisa) {
            setCliente('');
            setCliente(clientePesquisa);
            let id = clientePesquisa.id;
            let name = clientePesquisa.razaoSocial;
            let listaPreco = clientePesquisa.listaPreco;
            let overPrice = clientePesquisa.overPrice;
            onChangeField('cliente', { id, name, listaPreco, overPrice });
        }
    }, [clientePesquisa])


    //Soma os valores toda vez que entrar na pagina ou mudar os itens
    useEffect(() => {
        if (isFocused) {
            somaValorTotalItems();
            somaValorBrutoitems();
            somaValorDescontoItems();
            somaQuantidadeItens();
            somaQuantidadeProdutos();
        }

    }, [isFocused, itemsPedido])

    //Fecha o modal de editar um item/produto
    const onCanceModalDraft = useCallback(() => {
        setOpenModalDraft(false);
    }, []);

    //Fecha o modal de editar um item/produto
    const onCancelEditItem = useCallback(() => {
        setOpenEditarItem(false);
    }, []);

    //Fecha o modal selecionar pagamento
    const onCancelModalSelectPagamento = useCallback(() => {
        setOpenModalSelectPagamento(false);
    }, []);

    //Fecha o modal selecionar transportadora
    const onCancelModalSelectTransportadora = useCallback(() => {
        setOpenModalSelectTransportadora(false);
    }, []);

    //Fecha o modal selecionar loja
    const onCancelModalSelectLoja = useCallback(() => {
        setOpenModalSelectLoja(false);
    }, []);

    //Abre o modal loja
    const handleOpenModalSelectLoja = useCallback(() => {
        setOpenModalSelectLoja(true);
    }, []);

    //Abre o modal pagamento
    const handleOpenModalSelectPagamento = useCallback(() => {
        setOpenModalSelectPagamento(true);
    }, []);

    //Abre o modal transportadora
    const handleOpenModalSelectTransportadora = useCallback(() => {
        setOpenModalSelectTransportadora(true);
    }, []);

    //Abre o modal de editar um item/produto
    const handleOpenEditarItem = useCallback(() => {
        setOpenEditarItem(true)
    }, []);

    //CALCULOS DOS VALORES PARA O RESUMO DA VENDA
    const somaValorTotalItems = () => {
        const total = itemsPedido.length > 0 && itemsPedido.reduce((acc, item) => acc + item.valorTotalItem, 0);
        setValorTotalItems(total)
    }

    const somaValorBrutoitems = () => {
        const totalBruto = itemsPedido.length > 0 && itemsPedido.reduce((acc, item) => acc +( item.precoVendaEdit * item.qtdVendaEdit), 0);
        setPrecoVendaEdit(totalBruto);
    }

    const somaValorDescontoItems = () => {
        const totalDescontoItems = itemsPedido.length > 0 && itemsPedido.reduce((acc, item) => acc + formatValueInputDesconto(item.valorDesconto), 0);
        setValorDesconto(totalDescontoItems);
    };

    const somaQuantidadeItens = () => {
        const totalQtd = itemsPedido.length > 0 && itemsPedido.reduce((acc, item) => acc + item.qtdVendaEdit, 0);
        setQtd(totalQtd);
    };

    const somaQuantidadeProdutos = () => {
        const totalProdutos = itemsPedido.length;  // Cada item no array representa um produto distinto
        setQtdProdutos(totalProdutos);
    };

    //Fecha o loading de confirmação ou erro de salvar o pedido no back
    const oncanceLoading = useCallback(() => {
        setOpenLoading(false);
    }, []);


    //Seleciona o prazo
    const selectPrazo = useCallback(({ id, name }) => {
        setPrazoId(id);
        setNomePrazo(name);
        setPrazo({ id, name });
        onChangeField('formaPagamento', { id, name });
        onCancelModalSelectPagamento();
    }, []);

    //Seleciona a loja
    const selectLoja = useCallback(({ id, name }) => {
        setLoja('');
        setLoja({ id, name });
        onChangeField('loja', { id, name });
        onCancelModalSelectLoja();
    }, []);

    //Seleciona a transportadora
    const selectTransportadora = useCallback(({ id, name }) => {
        setTransportadoraId(id);
        setNomeTransportadora(name);
        setTransportadora({ id, name });
        onChangeField('transportadora', { id, name });
        onCancelModalSelectTransportadora();
    }, []);


    //TextInput campo observação
    const handleTextInputObservacao = useCallback((text) => {
        setObservacao(text);
        onChangeField('observacao', text);
    }, []);

    const lojaPadraoEclone = () => {
        setLoja('');
        setLoja(lojaCloneAndEdit);
        lojaCloneAndEdit === '' && setLoja(lojaPadrao !== undefined && lojaPadrao !== '' ? lojaPadrao : { id: idLojaUsuario, name: nomeLojaUsuario });
    }


    //Limpa todos os states
    const limpar = () => {
        setCliente('');
        setObservacao('');
        setLojaId('');
        setTransportadoraId('');
        setNomeTransportadora('');
        setPrazoId('');
        setNomePrazo('');
        dispatch(resetItemProduto());
        dispatch(resetMessageCliente());
        dispatch(resetpagamentoCloneAndEdit());
        dispatch(resetTransportadoraCloneAndEdit());
        dispatch(resetLojaCloneAndEdit());
        dispatch(resetForRelatorioPedido());
        resetPedidoModel();
        setEditPedidoData({});
        setClearStates(!clearStates);
        setLoja('');
        clearCurrentDraftId();
        setDraftId(null);
        setForm({
            loja: '',
            cliente: '',
            transportadora: '',
            formaPagamento: '',
            observacao: '',
            itens: [],
        });
        lojaPadraoEclone();
        limparRota();
    }

    const descartarDraft = async() => {
        await deleteDraftById(draftIdFromRoute || draftId);
        limpar();
        setRefreshModalDraft(!refreshModalDraft);
    }

    const limparRota = () => {
        navigation.setParams({
            drafRoutetId: undefined, 
            idPedido: undefined,
            numero: undefined,
        });

        console.log('Limpando parametros da rota');
        console.log('ROTA: ', route);
    }

    //Preenche e gera o relatorio pedido
    useEffect(() => {

        if (numeroPedido && sucess) {
            const dataRel = {
                nomeCliente: pedidoModel.nomeCliente,
                numero: numeroPedido,
                totalPedido: pedidoModel.total,
                totalBruto: pedidoModel.totalBrutoProduto,
                valorDescontoItens: pedidoModel.valorDescontoProdutoItens,
                observacao: pedidoModel.observacao,
                prazo: nomePrazo.split(" | ")[0],
                transportadora: nometransportadora,
                itensPedido: pedidoModel.itensPedido,
                loja: loja.name,
                dataVenda: new Date(),
            }

            generateAndPrintPDF(dataRel);
            limpar();
        }

    }, [numeroPedido, sucess]);


    //Monta o todas as informações do pedido para envio
    const onBeforeSave = () => {

        pedidoModel.cancelado = 'N';
        pedidoModel.colaboradorId = idColaborador;
        pedidoModel.codigoVendedor = codigoVendedor;
        pedidoModel.convenio = 'N';
        pedidoModel.cotacao = 'N';
        pedidoModel.cupom = 'N';
        pedidoModel.estadoVenda = '1';
        pedidoModel.operacaoId = idOperacao;
        pedidoModel.favorecidoId = cliente.id;
        pedidoModel.lojaId = loja.id;
        pedidoModel.nomeCliente = cliente.razaoSocial;
        pedidoModel.prazoId = prazoId;
        pedidoModel.transportadoraId = transportadoraId;
        pedidoModel.status = 'A';
        pedidoModel.tenant = tenant;
        pedidoModel.total = valorTotalItem;
        pedidoModel.totalBrutoProduto = precoVendaEdit;
        pedidoModel.valorDescontoProdutoItens = valorDesconto;
        pedidoModel.sincronizado = 'N';
        pedidoModel.grupoMovimento = '1';
        pedidoModel.observacao = observacao ? observacao : '';
        pedidoModel.nomeVendedor = nomeUsuario;

        itemsPedido.map((item) => {

            const novoItem = JSON.parse(JSON.stringify(itensPedidoModel));

            if (editPedidoData?.idPedido > 0) {
                novoItem.id = item.idItem;
            }
            novoItem.idProduto = item.id;
            novoItem.descricaoProduto = item.descricaoEdit;
            novoItem.codigoProduto = item.codigoInternoEdit;
            novoItem.codigoReferencia = item.codigoReferenciaEdit;
            novoItem.quantidade = item.qtdVendaEdit;
            novoItem.valorUnitario = item.precoVendaEdit;
            novoItem.percentualDescontoItens = item.porcentagemDesconto;
            novoItem.valorDescontoItens = item.valorDesconto;
            novoItem.valorTotal = item.valorTotalItem;
            novoItem.baixouEstoque = 'S';
            novoItem.produtoServico = 'P';
            novoItem.status = 'A';
            novoItem.tenant = tenant;

            const itemExistente = pedidoModel.itensPedido.some(
                (existingItem) => existingItem.idProduto === novoItem.idProduto
            );

            if (!itemExistente) {
                pedidoModel.itensPedido = [...pedidoModel.itensPedido, novoItem];
            }


        })
    }

    //Gera o relatório do pedido
    const generateAndPrintPDF = (dataRel) => {
        const htmlContent = generateSavePedido([dataRel], 'sim');
        try {
            RNPrint.print({ html: htmlContent });
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
        }
    };



    //Salva o pedido
    const save = () => {

        onBeforeSave();

        if (loja && nometransportadora && nomePrazo && itemsPedido.length > 0 && Object.keys(cliente).length !== 0) {

            const validacaoPagamento = validarFormaPagamento(listaPrazos, pedidoModel);

            if (validacaoPagamento.validado) {

                if (editPedidoData?.idPedido > 0) {

                    pedidoModel.id = editPedidoData.idPedido;
                    pedidoModel.numero = editPedidoData.numero;
                }

                setOpenLoading(true);
                dispatch(savePedido(pedidoModel));

            } else {
                Alert.alert('Atenção!', `A forma de pagamento selecionada "${validacaoPagamento.nomePrazo}" é permitida somente para vendas igual ou acima de ${validacaoPagamento.valorPrazo}!`);
                resetPedidoModel();
            }

        } else {
            Alert.alert('Atenção!', 'Verifique os campos obrigatórios e se há itens adicionado!');
            resetPedidoModel();
        }

    }


    //Resta o model do pedido para o proximo envio
    const resetPedidoModel = () => {
        for (let prop in pedidoModel) {
            if (Array.isArray(pedidoModel[prop])) {
                pedidoModel[prop] = [];
            } else {
                pedidoModel[prop] = null;
            }
        }
    };


     //EDIÇÃO DE CAMPOS RASCUNHO (cria no 1º edit, depois só atualiza)
     const onChangeField = async(field, value) => {

        const snapshot = paramsRef.current;
        console.log('route.params snapshot:', snapshot ?? '<sem params>');
    
        const temId = Number(snapshot?.idPedido) > 0;

        if (!temId) {
            const seed = { ...form, [field]: value };
            const id = await ensureDraftId(seed);           // cria se ainda não existir
            const saved = await mergeAndSaveDraft(id, { [field]: value });
            setForm(saved.next);
            setDraftId(saved.id);
            setRefreshModalDraft((prev) => !prev);
        }

    };

    //Atualiza o item no SQLITE
    const onUpdateItem = async (index, patch) => {
        const snapshot = paramsRef.current;
        console.log('route.params snapshot:', snapshot ?? '<sem params>');
        const temId = Number(snapshot?.idPedido) > 0;

        if(!temId){
            const id = await ensureDraftId(form);
            const savedForm = await updateItemInDraft(id, index, patch);
            setForm(savedForm.formSalvo);
            setDraftId(savedForm.id);
            setRefreshModalDraft((prev) => !prev);
        }
    };

    //Remove o item no SQLITE
    const onRemoveItem = async (index) => {
        const snapshot = paramsRef.current;
        console.log('route.params snapshot:', snapshot ?? '<sem params>');
        const temId = Number(snapshot?.idPedido) > 0;
        
        if(!temId){
            const id = await ensureDraftId(form);
            const saved = await removeItemFromDraft(id, index);
            setForm(saved);
        }
    };


    return (
        <>
            <EditarItem isVisible={openEditarItem} onCancel={onCancelEditItem} onUpdateItem={onUpdateItem}/>

            <ModalDraft isVisible={openModalDraft} onCancel={onCanceModalDraft} limpar={limpar} refresh={refreshModalDraft}/>

            <ModalSelect onCancel={onCancelModalSelectPagamento} isVisible={openModalSelectPagamento} data={listaPrazos} titulo={'Pagamento'} dataSelect={selectPrazo} selected={prazo} />

            <ModalSelect onCancel={onCancelModalSelectTransportadora} isVisible={openModalSelectTransportadora} titulo={'Transportadora'} dataSelect={selectTransportadora} selected={transportadora} origem={'transportadora'} />

            <ModalSelect onCancel={onCancelModalSelectLoja} isVisible={openModalSelectLoja} data={listaLojas} titulo={'Loja'} dataSelect={selectLoja} />

            <LoadingComponent isVisibleLoading={openLoading} loading={loading} sucess={sucess} error={error} messageLoading={'Salvando Pedido...'} messageSucess={message} messageError={messageErroPedido} oncanceLoading={oncanceLoading} />

            <ScrollView contentContainerStyle={Styles.scrollViewContainer}>
                <View style={Styles.containerPedido}>
                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Data:</Text>
                        </View>

                        <View style={Styles.inputDisable}>
                            <TextInput
                                style={{ fontWeight: '600', color: '#868686' }}
                                value={dateNow}
                                editable={false}
                            />
                        </View>
                    </View>

                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Loja:</Text>
                        </View>
                        <View style={styles.containerCliente}>
                            <TouchableWithoutFeedback onPress={handleOpenModalSelectLoja}>
                                <View style={[styles.containerInputCliente, isFfilledLoja ? Styles.inputContainerOk : styles.inputContainerError]}>
                                    <Text
                                        style={styles.inputCliente}
                                        numberOfLines={1}
                                    >
                                        {loja?.name ? loja?.name : 'Selecione a loja'}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    </View>

                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Cliente:</Text>
                        </View>
                        <View style={styles.containerCliente}>

                            <TouchableWithoutFeedback onPress={() => {
                                let idDraftSeed = draftIdFromRoute ? draftIdFromRoute : draftId;
                                navigation.navigate({name: 'PesquisarCliente', params: {pedido: true, draftId: idDraftSeed}, merge: true})
                            }}>
                                <View style={[styles.containerInputCliente, isFilledCliente ? Styles.inputContainerOk : styles.inputContainerError]}>
                                    <Icon name='search' size={20} color='#0a6c91' style={{ marginRight: 3, marginLeft: 6 }} />
                                    <Text
                                        style={styles.inputCliente}
                                        numberOfLines={1}
                                    >
                                        {Object.keys(cliente).length !== 0 ? cliente.razaoSocial : 'Pesquisar cliente'}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    </View>

                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Transportadora:</Text>
                        </View>
                        <View style={styles.containerCliente}>

                            <TouchableWithoutFeedback onPress={handleOpenModalSelectTransportadora}>
                                <View style={[styles.containerInputCliente, isFilledTransportadora ? Styles.inputContainerOk : styles.inputContainerError]}>
                                    <Text
                                        style={styles.inputCliente}
                                        numberOfLines={1}
                                    >
                                        {nometransportadora ? nometransportadora : 'Selecione a transportadora'}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    </View>


                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Forma de pagamento:</Text>
                        </View>
                        <View style={styles.containerCliente}>

                            <TouchableWithoutFeedback onPress={handleOpenModalSelectPagamento}>
                                <View style={[styles.containerInputCliente, isFilledPrazo ? Styles.inputContainerOk : styles.inputContainerError]}>
                                    <Text
                                        style={styles.inputCliente}
                                        numberOfLines={1}
                                    >
                                        {nomePrazo ? nomePrazo.split(" | ")[0] : 'Selecione o pagamento'}
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                        </View>
                    </View>

                    <View style={Styles.containerInfo}>
                        <View>
                            <Text style={[globalStyles.text, Styles.labelBold]}>Observações: </Text>
                            <TextInput
                                placeholderTextColor={'#999999'}
                                style={[globalStyles.text, { marginTop: -3 }]}
                                multiline
                                onChangeText={(text) => handleTextInputObservacao(text)}
                                value={observacao ? observacao : ''}
                            />
                        </View>
                    </View>

                    <View style={Styles.containerInfo}>

                        <TouchableOpacity onPress={() => {
                            let idDraftSeed = draftIdFromRoute ? draftIdFromRoute : draftId;
                            {
                                Object.keys(cliente).length !== 0 ? (
                                    navigation.navigate('AdicionarProduto', { cliente, loja, idDraftSeed, editPedidoData })
                                ) : (
                                Alert.alert('Atenção!', 'Selecione o cliente primeiro!')
                            )
                            }
                        }}
                            style={styles.botaoAddProdutos}>
                            <Text style={{ color: '#FFF', fontSize: 17 }}>Adicionar produtos</Text>
                        </TouchableOpacity>

                        <View style={Styles.ContainerItens}>

                            {itemsPedido && itemsPedido.length > 0 ? (
                                itemsPedido.map((item) => (
                                    <ItemPedido key={item.id} {...item} onOpenEditarItem={handleOpenEditarItem} onRemoveItem={onRemoveItem}/>
                                ))

                            ) : (

                                <Text style={[globalStyles.text, { textAlign: 'center', paddingVertical: 15 }]}>Nenhum produto adicionado</Text>
                            )}

                        </View>
                    </View>

                    <View>
                        <Text style={[globalStyles.text, Styles.labelBold, { textAlign: 'center', marginTop: 5 }]}>Resumo da venda</Text>

                        <View style={[Styles.containerInfo, { alignItems: 'flex-end' }]}>
                            <View style={styles.containerValorTotal}>
                                <Text style={{ fontSize: 15, fontWeight: '400', color: '#000' }}>Quantidade de produtos: </Text>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>{qtdProdutos}</Text>
                            </View>

                            <View style={styles.containerValorTotal}>
                                <Text style={{ fontSize: 15, fontWeight: '400', color: '#000' }}>Quantidade de itens: </Text>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>{qtd ? qtd : 0}</Text>
                            </View>

                            <View style={styles.containerValorTotal}>
                                <Text style={{ fontSize: 15, fontWeight: '400', color: '#000' }}>Valor total bruto: </Text>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>{numberFormatBRL(precoVendaEdit)}</Text>
                            </View>

                            <View style={styles.containerValorTotal}>
                                <Text style={{ fontSize: 15, fontWeight: '400', color: '#000' }}>Valor total desconto: </Text>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>{numberFormatBRL(valorDesconto)}</Text>
                            </View>

                            <View style={styles.containerValorTotal}>
                                <Text style={{ fontSize: 20, fontWeight: '500', color: '#000' }}>Total: </Text>
                                <Text style={[globalStyles.text, { fontSize: 18, fontWeight: '500', color: '#000' }]}>{numberFormatBRL(valorTotalItem)}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={Styles.ContainerButtons}>
                        <TouchableOpacity style={Styles.buttonLimpar} onPress={limpar}>
                            <Text style={Styles.textButtonLimpar}>Limpar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={Styles.buttonSalvar} onPress={save}>
                            <Text style={Styles.textButtonSalvar}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                    {(draftIdFromRoute || draftId) && (
                        <View style={{ width: '100%', marginTop: 6 }}>
                            <TouchableOpacity style={{
                                display: 'flex',
                                backgroundColor: '#0a6c91',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                                paddingVertical: 12,
                                borderRadius: 6
                            }} onPress={descartarDraft}
                            >
                                <Text style={{
                                    fontSize: 17,
                                    fontWeight: 'bold',
                                    color: '#FFF',
                                }}
                                >Descartar Rascunho{draftIdFromRoute || draftId ? `_${draftIdFromRoute || draftId}` : ''}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
        </>
    )

}