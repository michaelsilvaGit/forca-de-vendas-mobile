import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadValidacaoChaveFromStorage } from '../slices/validacaoSlice';
import { loadConfigFromStorage } from '../slices/configuracaoSlice';
import { urlServidor } from '../enum';





export const saveStorageValidacaoChave = async (data, dispatch) => {

    try {

        await AsyncStorage.setItem('ativado', data.ativado?.toString() || '');
        await AsyncStorage.setItem('bloqueado', data.bloqueado?.toString() || '');
        await AsyncStorage.setItem('usuarioLogin', data.usuarioLogin || '');
        await AsyncStorage.setItem('chaveAtivacaoValidada', data.chaveAtivacao);
        await AsyncStorage.setItem('primeiroAcesso', 'false');
        await AsyncStorage.setItem('urlRemota', data.urlRemota || '');
        await AsyncStorage.setItem('tenant', data.tenant || '');
        await AsyncStorage.setItem('idOperacao', data.idOperacao?.toString() || '');
        await AsyncStorage.setItem('idTransportadora', data.idTransportadora?.toString() || '');
        await AsyncStorage.setItem('idColaborador', data.idColaborador?.toString() || '');

        dispatch(loadValidacaoChaveFromStorage());
        dispatch(loadConfigFromStorage());

        console.log('Salvou validação chave no storage!')

    } catch (error) {
        console.error('Erro ao salvar validação chave no storage:', error);
    }

}



export const loadStorageValidacaoChave = async () => {

    try {

        const ativado = await AsyncStorage.getItem('ativado') || '';
        const bloqueado = await AsyncStorage.getItem('bloqueado') || '';
        const usuarioLogin = await AsyncStorage.getItem('usuarioLogin') || '';
        const primeiroAcesso = await AsyncStorage.getItem('primeiroAcesso') || 'true';
        const chaveAtivacaoValidada = await AsyncStorage.getItem('chaveAtivacaoValidada') || '';

        return { ativado, bloqueado, usuarioLogin, primeiroAcesso, chaveAtivacaoValidada };

      } catch (error) {
        console.error('Erro ao carregar validação chave storage:', error);
        return { usuarioLogin: '', bloqueado: '', ativado: '', primeiroAcesso: 'true', chaveAtivacaoValidada: '' };
      }
};