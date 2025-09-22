import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadUsuarioLoginFromStorage } from "../slices/authSlice";






export const saveStorageUsuarioLogin = async (data, dispatch) => {

    try {

        await AsyncStorage.setItem('nomeUsuario', data.pessoaNomeFantasia || '');
        await AsyncStorage.setItem('fotoUsuario', data.caminhoImagem || '');
        await AsyncStorage.setItem('codigoVendedor', data.codigoVendedor?.toString() || '');
        await AsyncStorage.setItem('nomeLoja', data.lojaNomeFantasia || '');
        await AsyncStorage.setItem('cnpjLoja', data.lojaCnpj || '');
        await AsyncStorage.setItem('idLoja', data.lojaId?.toString() || '');
 

        dispatch(loadUsuarioLoginFromStorage());

        console.log('Salvou usuario Login no storage!')

    } catch (error) {
        console.error('Erro ao salvar usuario Login no storage:', error);
    }

}



export const loadStorageUsuarioLogin = async () => {

    try {

        const nomeUsuario = await AsyncStorage.getItem('nomeUsuario') || '';
        const fotoUsuario = await AsyncStorage.getItem('fotoUsuario') || '';
        const nomeLoja = await AsyncStorage.getItem('nomeLoja') || 'ARAGUAIA SISTEMAS LTDA';
        const cnpjLoja = await AsyncStorage.getItem('cnpjLoja') || '04.005.416/0001-53';
        const idLoja = parseInt(await AsyncStorage.getItem('idLoja'), 10);
        const codigoVendedor = parseInt(await AsyncStorage.getItem('codigoVendedor'), 10);
        const senhaStorage = await AsyncStorage.getItem('senhaStorage') || '';

        return { nomeUsuario, fotoUsuario, nomeLoja, cnpjLoja, idLoja, codigoVendedor, senhaStorage };

      } catch (error) {
        console.error('Erro ao carregar usuario login storage:', error);
        return { nomeUsuario: '', fotoUsuario: '', nomeLoja: 'ARAGUAIA SISTEMAS LTDA', cnpjLoja: '04.005.416/0001-53', idLoja: '', codigoVendedor: 0, senhaStorage: '' };
      }
}