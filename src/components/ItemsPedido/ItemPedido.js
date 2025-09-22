import React, {useCallback} from "react";
import { Text, View, TouchableWithoutFeedback } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from "react-redux";
import { getItemById, deleteItem } from "../../slices/produtoSlice";
import { useSelector } from "react-redux";

import Styles from "./Styles";
import numberFormatBRL from "../../utils/numberFormatBRL";
import { globalStyles } from "../../globalStyles";




const ItemPedido = ({ id,
    codigoInternoEdit,
    descricaoEdit,
    aplicacaoEdit,
    qtdVendaEdit,
    valorTotalItem,
    precoVendaEdit,
    onOpenEditarItem,
    onRemoveItem
}) => {



    dispatch = useDispatch()

    const { nomeProduto } = useSelector((state) => state.configuracao);


    const getLeftContent = useCallback(() => {
        return (
            <View style={Styles.excluirContainer}>
                <Icon name='trash' size={35} color='red' />
                <Text style={{ fontSize: 18, color: 'red' }}>Excluir...</Text>
            </View>
        )
    }, []);



    return (

        <GestureHandlerRootView>
            <Swipeable
                renderLeftActions={getLeftContent}
                onSwipeableOpen={(direction) => {
                    if (direction === 'left') {
                        dispatch(deleteItem(id));
                        onRemoveItem(id);
                    }
                }}

                onSwipeableClose={() => { }}
            >
                <TouchableWithoutFeedback onPress={() => {

                    dispatch(getItemById(id))
                    onOpenEditarItem()

                }}>
                    <View style={Styles.containerItems}>
                        <Text style={[globalStyles.text, Styles.textItems]}>{nomeProduto === 'Descrição' ? descricaoEdit : aplicacaoEdit || descricaoEdit}</Text>
                        <View style={Styles.viewItems}>
                            <Text style={globalStyles.text}>{codigoInternoEdit}</Text>
                            <Text style={[globalStyles.text, { marginRight: 5 }]}>Quantidade: {qtdVendaEdit}</Text>
                        </View>


                        <View style={Styles.viewItems}>
                            <View style={Styles.viewValue}>
                                <Text style={[globalStyles.text, { fontSize: 15, fontWeight: '700' }]}>Valor bruto: </Text>
                                <Text style={[globalStyles.text, { fontSize: 13 }]}>{numberFormatBRL(precoVendaEdit * qtdVendaEdit)}</Text>
                            </View>
                            <View style={Styles.viewValue}>
                                <Text style={[globalStyles.text, { fontSize: 15, fontWeight: '700' }]}>Valor líquido: </Text>
                                <Text style={[globalStyles.text, { fontSize: 13 }]}>{numberFormatBRL(valorTotalItem)}</Text>
                            </View>
                        </View>


                    </View>
                </TouchableWithoutFeedback>
            </Swipeable>

        </GestureHandlerRootView>

    )
}




export default ItemPedido