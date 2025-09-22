import React, { useEffect, useState, useCallback } from "react";
import { FlatList, Text, TouchableOpacity, View, ScrollView, SectionList, ActivityIndicator } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { getPedidoById, resetVisualizarPedido } from "../../slices/pedidoSlice";
import { clietCloneAndEdit, resetCliente } from "../../slices/clienteSlice";
import { pagamentoCloneAndEdit } from "../../slices/formaPagamentoSlice";
import { itemsCloneAndEdit } from "../../slices/produtoSlice";
import { useNavigation } from '@react-navigation/native';
import { transportadoraCloneAndEdit } from "../../slices/transportadoraSlice";
import { lojaCloneAndEdit } from "../../slices/lojaSlice";
import ItemsPedido from "./ItemsPedido";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import verificarToken from "../../utils/verificarToken";
import LabelDescricao from "../../components/LabelDescricao/LabelDescricao";
import { sincronizarPedido } from "../../slices/pedidoSlice";
import Icon from 'react-native-vector-icons/Octicons';
import * as Animatable from 'react-native-animatable';
import styles from "./styles";
import numberFormatBRL from "../../utils/numberFormatBRL";
import { globalStyles } from "../../globalStyles";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
import LoadingLayoutVisualizarPedido from "../../components/LoadingLayoutVisualizarPedido/LoadingLayoutVisualizarPedido";
import { createDraft, clearCurrentDraftId } from "../../db/repository/pedidoRepositoryDraft";


export default ({ route }) => {

    const idPedido = route.params.id;

    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const { pedido } = useSelector((state) => state.pedido);
    const { tenant } = useSelector((state) => state.configuracao);

    const [items, setItems] = useState([]);
    const [openConfirmacao, setOpenConfirmacao] = useState(false);
    const [estado, setEstado] = useState('');
    const [reload, setReload] = useState(false);


    useEffect(() => {
        if (isFocused) {
            setItems(pedido.itensPedido);
            setEstado(pedido.sincronizado);
        }
    }, [pedido, items])


    useEffect(() => {

        setItems([]);

        if (isFocused) {
            let data = {
                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idPedido: idPedido
                },
                page: 0,
                size: 1,
                sorting: {
                    undefined: 'desc'
                },
                tenant: tenant
            }
            dispatch(getPedidoById(data));
        }
    }, [isFocused, reload])



    const handledirection = (direction) => {

        const cliente = {
            id: pedido.favorecidoId,
            razaoSocial: pedido.favorecidoPessoaRazaoSocial,
            listaPreco: pedido.favorecidoClienteListaPrecoId,
            overPrice: pedido.overPriceCliente,
            observacao: direction === 'editar' ? pedido.observacao : ''
        }

        const pagamento = {
            id: pedido.prazoId,
            name: pedido.prazoDescricao
        }

        const transportadora = {
            id: pedido.transportadoraId,
            name: pedido.transportadoraPessoaNomeFantasia
        }

        const loja = {
            id: pedido.lojaId,
            name: pedido.lojaPessoaNomeFantasia
        }


        const itemsClone = items.map((item) => {
            return {
                idItem: item.id,
                id: item.idProduto,
                caminhoImagemEdit: item.caminhoImagem,
                saldoEstoqueEdit: item.saldoEstoque,
                descricaoEdit: item.descricaoProduto,
                aplicacaoEdit: item.aplicacao || item.descricaoProduto,
                codigoInternoEdit: item.codigoProduto,
                codigoReferenciaEdit: item.codigoReferencia,
                qtdVendaEdit: item.quantidade,
                marcaDescricaoEdit: item.marcaDescricao,
                precoVendaEdit: item.valorUnitario,
                porcentagemDesconto: item.percentualDescontoItens,
                valorDesconto: item.valorDescontoItens?.toFixed(2),
                valorTotalItem: item.valorTotal,
            };
        });

        const form = {
            loja: {id: pedido.lojaId, name: pedido.lojaPessoaNomeFantasia},
            cliente: {id: pedido.favorecidoId,
                name: pedido.favorecidoPessoaRazaoSocial,
                listaPreco: pedido.favorecidoClienteListaPrecoId,
                overPrice: pedido.overPriceCliente,
            },
            transportadora: {id: pedido.transportadoraId, name: pedido.transportadoraPessoaNomeFantasia},
            formaPagamento: {id: pedido.prazoId, name: pedido.prazoDescricao},
            observacao: pedido.observacao,
            itens: itemsClone,
        }

        dispatch(clietCloneAndEdit(cliente));
        dispatch(pagamentoCloneAndEdit(pagamento));
        dispatch(itemsCloneAndEdit(itemsClone));
        dispatch(transportadoraCloneAndEdit(transportadora));
        dispatch(lojaCloneAndEdit(loja));

        dispatch(resetCliente());

        salvarRascunhoCloneRedirect(form, direction);
    }

    const salvarRascunhoCloneRedirect = async(form, direction) => {
        if(direction === 'clonar'){
            limparRota();
            clearCurrentDraftId()
            const saved = await createDraft(form);
            navigation.navigate('NovoPedido', { drafRoutetId: saved.id, idPedido:  0, numero: 0 });
        }else if(direction === 'editar'){
            limparRota();
            clearCurrentDraftId()
            navigation.navigate('NovoPedido', {drafRoutetId: undefined, idPedido: idPedido, numero: pedido.numero });
        }
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

    const handleSync = useCallback(() => {
        dispatch(sincronizarPedido(pedido.id));
        handleOnCancel();
        dispatch(resetVisualizarPedido());
        handleReload();
    }, []); 

    const handleOnCancel = useCallback(() => {
        setOpenConfirmacao(false);
    }, []);

    const handleReload = () => {
        setReload(!reload);
    }




    return (
        <>

            {pedido ? (
                <ScrollView>

                    <ConfirmationModal isVisible={openConfirmacao} confirmed={handleSync} text={'Deseja sincronizar esse pedido'} onCancel={handleOnCancel} data={null} />

                    {estado === 'N' && (
                        <TouchableOpacity style={{paddingTop: 15, width: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => setOpenConfirmacao(true)}>
                            <Text><Icon name='sync' size={28} color='green' /></Text>
                        </TouchableOpacity>
                    )}

                    {estado === 'L' && (
                        <View style={{paddingTop: 15, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center'}}>

                            <Text style={{fontSize: 17, color: '#e3650d'}}>Aguardando sincronização</Text>

                            <View style={styles.dotsContainer}>
                                <Animatable.Text
                                    animation="fadeIn"
                                    iterationCount="infinite"
                                    direction="alternate"
                                    duration={500}
                                    delay={0}
                                    style={styles.dot}
                                >
                                    .
                                </Animatable.Text>
                                <Animatable.Text
                                    animation="fadeIn"
                                    iterationCount="infinite"
                                    direction="alternate"
                                    duration={500}
                                    delay={300}
                                    style={styles.dot}
                                >
                                    .
                                </Animatable.Text>
                                <Animatable.Text
                                    animation="fadeIn"
                                    iterationCount="infinite"
                                    direction="alternate"
                                    duration={500}
                                    delay={600}
                                    style={styles.dot}
                                >
                                    .
                                </Animatable.Text>
                            </View>
                        </View>
                    )}
                    
                    
            
                    <View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>

                        <LabelDescricao label={'Data Pedido:'} descricao={pedido.dataVenda} />

                        <LabelDescricao label={'Loja:'} descricao={pedido.lojaPessoaNomeFantasia} />

                        <LabelDescricao label={'Cliente:'} descricao={pedido.favorecidoPessoaRazaoSocial} />

                        <LabelDescricao label={'Vendedor:'} descricao={pedido.nomeVendedor} />

                        <LabelDescricao label={'Forma de pagamento:'} descricao={pedido.prazoDescricao} />

                        <LabelDescricao label={'Transportadora:'} descricao={pedido.transportadoraPessoaNomeFantasia} />

                        <LabelDescricao label={'Observação:'} descricao={pedido.observacao} campoObservacao={true}/>

                    </View>

                    <View style={{width: '100%', alignItems: 'center'}}>
                        <View style={styles.containerInfoItens}>

                            <Text style={[styles.label, styles.labelItensPedido]}>Itens Pedido</Text>

                            {items && items.length > 0 && (
                                <View style={{}}>
                                    {items.map((item) => (
                                        <ItemsPedido key={item.id} {...item} />
                                    ))}
                                </View>
                            )}
                        </View>

                        <View style={{ width: '95%', marginTop: 8, marginBottom: 12, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Text style={[{ color: '#0a6c91', fontSize: 20, fontWeight: 'bold' }]}>Valor Total: </Text>
                            <Text style={[globalStyles.text, { fontSize: 20 }]}>{numberFormatBRL(pedido.total)}</Text>
                        </View>

                        <View style={styles.containerButtons}>
                            {estado === 'N' && (
                                <TouchableOpacity onPress={() => handledirection('editar')} style={{ marginBottom: 20, backgroundColor: '#f9a950', width: '48%', paddingVertical: 7, borderRadius: 6 }}>
                                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Editar</Text>
                                </TouchableOpacity>
                            )}
                            <TouchableOpacity onPress={() => handledirection('clonar')} style={estado === 'N' ? styles.buttonClonar : styles.buttonClonarOnly}>
                                <Text style={styles.textButtonClonar}>Clonar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            ) : (
                
                <LoadingLayoutVisualizarPedido />

            )}

        </>

    )

}