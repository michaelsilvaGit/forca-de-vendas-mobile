
import NetInfo from '@react-native-community/netinfo';



const checkConexao = async  () => {

    const state = await NetInfo.fetch();

    if (state.isConnected && state.isInternetReachable) {
        return true;
    } else {
        return false;
    }
}

export default checkConexao;