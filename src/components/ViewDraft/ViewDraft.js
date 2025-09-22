import React, { useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { formatIsoToBRDateTime } from "../../utils/formatDateIsoToBr";
import { useSelector, useDispatch } from "react-redux";
import { clietCloneAndEdit, resetCliente } from "../../slices/clienteSlice";
import { pagamentoCloneAndEdit } from "../../slices/formaPagamentoSlice";
import { itemsCloneAndEdit } from "../../slices/produtoSlice";
import { transportadoraCloneAndEdit } from "../../slices/transportadoraSlice";
import { lojaCloneAndEdit } from "../../slices/lojaSlice";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Styles from "./Styles";


const ViewDraft = ({ form, created_at, id, onCancel, deleteDraft }) => {

    // console.log('FORM: ', form)
    // console.log('ITENS CADA PEDIDO: ', form.itens);
    // console.log('ID ITENS CADA PEDIDO: ', id);


    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getLeftContent = useCallback(() => {
        return (
            <View style={Styles.excluirContainer}>
                <Icon name='trash' size={35} color='red' />
                <Text style={{ fontSize: 18, color: 'red' }}>Excluir...</Text>
            </View>
        )
    }, []);


    const handleDispach = () => {

        const cliente = {
            id: form.cliente.id,
            razaoSocial: form.cliente.name,
            listaPreco: form.cliente.listaPreco,
            overPrice: form.cliente.overPrice,
            observacao: form.observacao
        }

        const pagamento = {
            id: form.formaPagamento.id,
            name: form.formaPagamento.name
        }

        const transportadora = {
            id: form.transportadora.id,
            name: form.transportadora.name
        }

        const loja = {
            id: form.loja.id,
            name: form.loja.name
        }


        const items = form.itens.map((item) => {
            return {
                idItem: item.id,
                id: item.id,
                caminhoImagemEdit: item.caminhoImagemEdit,
                saldoEstoqueEdit: item.saldoEstoqueEdit,
                descricaoEdit: item.descricaoEdit,
                aplicacaoEdit: item.aplicacaoEdit || item.descricaoEdit,
                codigoInternoEdit: item.codigoInternoEdit,
                codigoReferenciaEdit: item.codigoReferenciaEdit,
                qtdVendaEdit: item.qtdVendaEdit,
                marcaDescricaoEdit: item.marcaDescricaoEdit,
                precoVendaEdit: item.precoVendaEdit,
                porcentagemDesconto: item.porcentagemDesconto,
                valorDesconto: item.valorDesconto,
                valorTotalItem: item.valorTotalItem,
            };
        });


        dispatch(clietCloneAndEdit(cliente));
        dispatch(pagamentoCloneAndEdit(pagamento));
        dispatch(itemsCloneAndEdit(items));
        dispatch(transportadoraCloneAndEdit(transportadora));
        dispatch(lojaCloneAndEdit(loja));

        dispatch(resetCliente());

        navigation.navigate('NovoPedido', { drafRoutetId: id });

        onCancel();
    }


    return (
        <GestureHandlerRootView style={{
            paddingRight: 6,
            paddingLeft: 6,
            marginBottom: 10,
            backgroundColor: '#FFF'
        }}>
            <Swipeable
                renderLeftActions={getLeftContent}
                onSwipeableOpen={(direction) => {
                    if (direction === 'left') {
                        deleteDraft(id);
                    }
                }}
                onSwipeableClose={() => { }}
            >
                <View
                    
                >
                    <TouchableOpacity style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        padding: 10,
                        width: '100%',
                        backgroundColor: '#E8E8E8',
                    }} onPress={handleDispach}>

                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ width: 80 }}>
                                <Text style={{ fontSize: 19, color: '#0a6c91' }}>ID:</Text>
                                <Text style={{ fontSize: 19, color: '#0a6c91' }}>Cliente: </Text>
                                <Text style={{ fontSize: 19, color: '#0a6c91' }}>Data:</Text>
                            </View>
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 19, color: '#000' }}>RASCUNHO_{id}</Text>
                                <Text style={{ fontSize: 19, color: '#000', width: '80%' }} numberOfLines={1}>{form.cliente.name}</Text>
                                <Text style={{ fontSize: 19, color: '#000' }}>{formatIsoToBRDateTime(created_at)}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>
            </Swipeable>

        </GestureHandlerRootView>
    )
}


export default ViewDraft;