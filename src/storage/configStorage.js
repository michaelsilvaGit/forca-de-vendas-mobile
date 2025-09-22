import AsyncStorage from '@react-native-async-storage/async-storage';
import { RenderItemsEnum, urlServidor } from '../enum';
import { loadConfigFromStorage } from '../slices/configuracaoSlice'; 




export const saveStorageConfig = async (data, dispatch) => {

    try {

        await AsyncStorage.setItem('qtdTelaProdutos', data.qtdTelaProdutos || '');
        await AsyncStorage.setItem('qtdTelaClientes', data.qtdTelaClientes || '');
        await AsyncStorage.setItem('qtdTelaPedidos', data.qtdTelaPedidos || '');
        await AsyncStorage.setItem('chaveAtivacao', data.chaveAtivacao || '');
        await AsyncStorage.setItem('imei', data.imei || '');
        await AsyncStorage.setItem('meta', data.meta || '');
        await AsyncStorage.setItem('nomeProduto', data.nomeProduto || '');
        await AsyncStorage.setItem('lojaPadrao', JSON.stringify(data.lojaPadrao)  || '');
        

        dispatch(loadConfigFromStorage());

        console.log('Salvou configurações no storage!')

    } catch (error) {
        console.error('Erro ao salvar qtd itens:', error);
    }

}

export const loadStorageConfig = async () => {

    try {
        const qtdTelaProdutos = parseInt(await AsyncStorage.getItem('qtdTelaProdutos'), 10) || parseInt(RenderItemsEnum.QTD_MIN_PRODUTO);
        const qtdTelaClientes = parseInt(await AsyncStorage.getItem('qtdTelaClientes'), 10) || parseInt(RenderItemsEnum.QTD_MIN_CLIENTE);
        const qtdTelaPedidos = parseInt(await AsyncStorage.getItem('qtdTelaPedidos'), 10)   || parseInt(RenderItemsEnum.QTD_MIN_PEDIDO);
        const meta = parseFloat(await AsyncStorage.getItem('meta'), 10) || 0 ;
        const chaveAtivacao = await AsyncStorage.getItem('chaveAtivacao') || '';
        const nomeProduto = await AsyncStorage.getItem('nomeProduto') || 'Aplicação';
        const lojaPadrao = JSON.parse(await AsyncStorage.getItem('lojaPadrao')) || '';
        const imei = await AsyncStorage.getItem('imei') || '';
        const urlRemota = await AsyncStorage.getItem('urlRemota') || urlServidor.URL;
        const tenant = await AsyncStorage.getItem('tenant') || urlServidor.tenant;
        const idOperacao = parseInt(await AsyncStorage.getItem('idOperacao'), 10) || 0;
        const idTransportadora = parseInt(await AsyncStorage.getItem('idTransportadora'), 10) || 0;
        const idColaborador = parseInt(await AsyncStorage.getItem('idColaborador'), 10) || 0;
        const token = await AsyncStorage.getItem('token') || '';
    
        return { qtdTelaProdutos, qtdTelaClientes, qtdTelaPedidos, chaveAtivacao, imei, urlRemota, tenant, meta, idOperacao, idTransportadora, idColaborador, nomeProduto, lojaPadrao, token };
      } catch (error) {
        console.error('Erro ao carregar qtd itens:', error);
        return { qtdTelaProdutos: 0, qtdTelaClientes: 0, qtdTelaPedidos: 0, chaveAtivacao: '', imei: '', urlRemota: urlServidor.URL, tenant: urlServidor.tenant, meta: 0, idOperacao: 0, idTransportadora: 0, idColaborador: 0, nomeProduto: 'Aplicação', lojaPadrao: '', token: '' };
      }
};