import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList} from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { getComissaoPrestador } from '../../slices/comissaoSlice';
import numberFormatBRL from '../../utils/numberFormatBRL';
import { useIsFocused } from '@react-navigation/native';
import ViewComissao from '../../components/ViewComissao/ViewComissao';
import { globalStyles } from '../../globalStyles';


export default () => {

    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const {tenant, idColaborador} = useSelector((state) => state.configuracao);
    const { comissaoPrestador, loading } = useSelector((state) => state.comissaoPrestador);

    const [mes, setMes] = useState([]);
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [valorTotalMes, setValorTotalMes] = useState(0);
    


    //CHAMA COMISSAO
    useEffect(() => {

        if(isFocused){

            let data = {

                filters: {
                    idColabrador: idColaborador,
                    dataInicial: dataInicial,
                    dataFinal: dataFinal
    
                },
                page: 0,
                size: 500,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            }
    
            dispatch(getComissaoPrestador(data));
        }
    }, [isFocused, dataFinal]);


    useEffect(() => {
        if(isFocused){
            getLastSixMonths();
        }  
    }, [isFocused])


    useEffect(() => {
        if(comissaoPrestador){
            somarComissaoMes();
        }
    },[comissaoPrestador])


    const getLastSixMonths = () => {

        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1;
        const months = [];


        for (let i = 5; i >= 0; i--) {
            let month = currentMonth - i;
            let year = currentYear;

            if (month <= 0) {
                month += 12;
                year -= 1;
            }

            let firstDay = new Date(year, month - 1, 1)
            let lastDay = new Date(year, month, 0)

            let monthStr = month.toString().padStart(2, '0');
            let yearStr = year.toString().slice(2);

            months.push({ yearStr, monthStr, firstDay, lastDay });
        }

        setMes(months);

    };


    const handleDateInState = (firstDay, lastDay) => {
        setDataInicial(firstDay);
        setDataFinal(lastDay);
    }


    const somarComissaoMes = () => {
        const total = comissaoPrestador.length > 0 && comissaoPrestador.reduce((acc, item) => acc + item.valorLiquido, 0);
        setValorTotalMes(total)
    }




    return (
        <>
            <View style={{ backgroundColor: '#0a6c91' }}>
                <View style={{ paddingVertical: 10 }}>

                    <Text style={styles.titulo}>Comissões últimos 6 meses</Text>

                    <View style={styles.containerData}>
                        {mes && mes.map((item, index) => (
                            <TouchableOpacity key={index} onPress={() => handleDateInState(item.firstDay, item.lastDay)}>
                                <Text style={{ color: '#FFF', backgroundColor: '#0a6f95', paddingHorizontal: 8, paddingVertical: 15, borderRadius: 50}}>{`${item.monthStr}/${item.yearStr}`}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: '#FFF' }}>Total do mês</Text>
                        <Text style={{ fontSize: 30, color: '#FFF' }}>{numberFormatBRL(valorTotalMes ? valorTotalMes : 0)}</Text>
                    </View>
                </View>
            </View>

            <View style={{borderBottomWidth: 1,paddingVertical: 5, width: '100%', display: 'flex', flexDirection: 'row', backgroundColor: '#d7d7d7'}}>
                <Text style={[globalStyles.text, {width: '25%', paddingLeft: 8}]}>Data</Text>
                <Text style={[globalStyles.text, {borderLeftWidth: 1, width: '20%', paddingLeft: 8}]}>N° pedido</Text>
                <Text style={[globalStyles.text, {borderLeftWidth: 1, paddingLeft: 8}]}>Comissão</Text>
            </View>

            <View>
                {comissaoPrestador && comissaoPrestador.length > 0 ? (
                    <FlatList
                        data={comissaoPrestador}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <ViewComissao {...item} />}
                    />
                ) : (
                    <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '10%' }]}>Nenhuma comissão encontrada!</Text>
                )}
            </View>
        </>




    )
}