import AsyncStorage from '@react-native-async-storage/async-storage';






const limparBaseDeDados = async  (chaveOnly) => {


    try {

        if(chaveOnly){

            await AsyncStorage.removeItem('chaveAtivacao');
            await AsyncStorage.removeItem('chaveAtivacaoValidada');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('senhaStorage');
            await AsyncStorage.removeItem('usuarioLogin');
            await AsyncStorage.removeItem('imei');
            await AsyncStorage.removeItem('urlRemota');
            await AsyncStorage.removeItem('tenant');

            console.log('CHAVE RESETADA COM SUCESSO');

        }else{
            
            await AsyncStorage.removeItem('chaveAtivacao');
            await AsyncStorage.removeItem('chaveAtivacaoValidada');
            await AsyncStorage.removeItem('urlRemota');
            await AsyncStorage.removeItem('tenant');
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('senhaStorage');
            await AsyncStorage.removeItem('imei');
            await AsyncStorage.removeItem('lojaPadrao');

            await AsyncStorage.removeItem('ativado');
            await AsyncStorage.removeItem('bloqueado');
            await AsyncStorage.removeItem('usuarioLogin');
            await AsyncStorage.removeItem('nomeUsuario');
            await AsyncStorage.removeItem('fotoUsuario');
            await AsyncStorage.removeItem('codigoVendedor');
            await AsyncStorage.removeItem('nomeLoja');
            await AsyncStorage.removeItem('cnpjLoja');
            await AsyncStorage.removeItem('idLoja');

            await AsyncStorage.removeItem('qtdTelaProdutos');
            await AsyncStorage.removeItem('qtdTelaClientes');
            await AsyncStorage.removeItem('qtdTelaPedidos');
            await AsyncStorage.removeItem('meta');
            await AsyncStorage.removeItem('nomeProduto');

            await AsyncStorage.removeItem('idOperacao');
            await AsyncStorage.removeItem('idTransportadora');
            await AsyncStorage.removeItem('idColaborador');

            

            console.log('BASE RESETADO COM SUCESSO')
        }

        

    } catch (error) {
        console.error('ERRO AO RESETAR BASE', error);
    }


}



export default limparBaseDeDados