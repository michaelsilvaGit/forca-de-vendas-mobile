import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import CardHome from '../../components/CardHome/CardHome';
import Grafico from '../../components/Grafico/Grafico';

import IconeCliente from '../../assets/cliente.svg';
import IconeNovoPedido from '../../assets/novoPedido.svg';
import IconePesquisarPedido from '../../assets/search.svg';
import IconeNovoCliente from '../../assets/person.svg';
import IconeProdutos from '../../assets/produtos.svg';
import LinearGradient from 'react-native-linear-gradient';
import IconeRelatorio from '../../assets/relatorioPedido.svg';
import verificarToken from '../../utils/verificarToken';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loadConfigFromStorage } from '../../slices/configuracaoSlice';
import { getValorVendaMes } from '../../slices/pedidoSlice';

import styles from './styles'




export default () => {


    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {codigoVendedor} = useSelector((state) => state.auth);

    const [isTablet, setIsTablet] = useState(false);


    useEffect(() => {
        
        if(isFocused){
            const { width } = Dimensions.get('window');
            if (width >= 600) {
              setIsTablet(true);
            }

            dispatch(getValorVendaMes(codigoVendedor));
        }
        
    }, [isFocused]);




    return (
        <>
            <ScrollView style={{ flexGrow: 1 }}>

                <LinearGradient
                    colors={['#0a6c91', '#FFF', '#FFF']}
                    style={styles.gradient}
                >
                    <View style={{ padding: 10 }}>

                        <View style={isTablet ? [styles.containerButton, {justifyContent: "space-around"}] : styles.containerButton}>
                            <CardHome tela="cliente" nomeTela="Clientes" IconSvg={IconeCliente} />
                            <CardHome tela="produtos" nomeTela="Produtos" IconSvg={IconeProdutos} />
                            <CardHome tela="pedido" nomeTela="Novo Pedido" IconSvg={IconeNovoPedido} />
                            <CardHome tela="novoCliente" nomeTela="Novo Cliente" IconSvg={IconeNovoCliente} />
                            <CardHome tela="pesquisarPedido" nomeTela="Pedidos" IconSvg={IconePesquisarPedido} />
                            <CardHome tela="relatorioPedido" nomeTela="Relatorio Pedido" IconSvg={IconeRelatorio} />
                        </View>

                        <View style={styles.containerGrafico}>                            
                            <View style={styles.grafico}>
                                <Grafico />
                            </View>
                        </View>

                    </View>
                </LinearGradient>

            </ScrollView>
        </>
    )
}