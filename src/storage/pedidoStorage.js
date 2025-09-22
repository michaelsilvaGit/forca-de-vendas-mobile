import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadValorVendaMesFromStorage } from '../slices/pedidoSlice';



export const saveStorageValorVendaMes = async (data, dispatch) => {

    try {

        await AsyncStorage.setItem('arrayValorVendaMes', JSON.stringify(data) || '');

        dispatch(loadValorVendaMesFromStorage());

        console.log('Salvou valores de venda mês no storage!')

    } catch (error) {
        console.error('Erro ao salvar valores de venda mês:', error);
    }
}



export const loadStorageValorVendaMes = async () => {

    try {

        const valorVendaMes = JSON.parse(await AsyncStorage.getItem('arrayValorVendaMes')) || [0];

        return {valorVendaMes};
      } catch (error) {
        console.error('Erro ao salvar valores de venda mês:', error);
        return { valorVendaMes: [0]};
      }
};