import React, { useState, useEffect, useCallback } from "react";
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import ViewPedido from "../../components/ViewPedido/ViewPedido";
import { useDispatch, useSelector } from "react-redux";
import InputCalendario from "../../components/InputCalendario/InputCalendario";
import { getPedidosByIdClient, resetPedidoCliente } from "../../slices/pedidoSlice";
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import verificarToken from '../../utils/verificarToken';

import styles from "./styles";
import { globalStyles } from "../../globalStyles";





export default ({ route }) => {

    const idCliente = route.params.id;
    const cliente = route.params.razaoSocial;

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { pedidosCliente, loading, sucess, error, messageErroPedido } = useSelector((state) => state.pedido);
    const {tenant, idColaborador} = useSelector((state) => state.configuracao);
    const {codigoVendedor} = useSelector((state) => state.auth);

    const [dataAtual, setDataAtual] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [clearInputDate, setclearInputDate] = useState(false);
    const [reload, setReload] = useState(false);



    useEffect(() => {

        if(isFocused){
            
            verificarToken(navigation, dispatch);

            dispatch(resetPedidoCliente());
            setclearInputDate(true);
            setStartDate('');
            setEndDate('');
            setDataAtual(new Date());
        }
    
    }, [isFocused, idCliente]);


    useEffect(() => {
        
        let data = {
            
            filters: {
                pesquisa: '',
                status: 'A',
                tipoPesquisa: '',
                idFavorecido: idCliente,
                dataInicio: startDate || dataAtual,
                dataFim: endDate || dataAtual,
                idColaborador: codigoVendedor
            },
            page: 0,
            size: 300,
            sorting: {
                undefined: 'desc'
            },
            tenant: tenant
        }
        dispatch(getPedidosByIdClient(data));

    }, [dataAtual, startDate, endDate, reload]);


    const selectDateStart = (date) => {
        setStartDate(date)
    }

    const selectDateEnd = (date) => {
        setEndDate(date)
    }

    const handleReload = useCallback(() => {
        setReload(prevReload => !prevReload);
    }, []);


    return (
        <>

            <View style={styles.containerPrincipal}>

                <View style={styles.containerNomeCliente}>
                    <Text style={[globalStyles.text, {fontSize: 15,fontWeight: '700'}]}>Cliente:</Text>
                    <Text style={[globalStyles.text, { fontSize: 18, fontWeight: '400' }]}>
                       {cliente && cliente}
                    </Text>
                </View>

                <View style={styles.containerInputCalendario}>
                    <View style={{ width: '49%' }}>
                        <Text style={globalStyles.text}>Data incial:</Text>
                        <InputCalendario 
                            choseDate={selectDateStart} 
                            clearInputDate={clearInputDate} 
                            setclearInputDate={() => setclearInputDate(false)} 
                        />
                    </View>
                    <View style={{ width: '49%' }}>
                        <Text style={globalStyles.text}>Data final:</Text>
                        <InputCalendario 
                            choseDate={selectDateEnd} 
                            clearInputDate={clearInputDate} 
                            setclearInputDate={() => setclearInputDate(false)} 
                        />
                    </View>
                </View>

                <View style={styles.containerFlatList}>
                    
                    {loading ? (
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00A0D3" />
                        </View>
                    ) : pedidosCliente && pedidosCliente.length > 0 ? (
                        <FlatList
                            data={pedidosCliente}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <ViewPedido {...item} reload={handleReload} />}
                        />
                    ) : (
                        <Text style={[globalStyles.text, { textAlign: 'center', marginTop:'50%' }]}>Nenhum pedido encontrado!</Text>
                    )}

                </View>
            </View>
        </>

    )
}