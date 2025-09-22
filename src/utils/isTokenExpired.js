import AsyncStorage from '@react-native-async-storage/async-storage';



const isTokenExpired = async () => {

    const today = new Date().toISOString().split('T')[0];
    const currentTime = new Date().getTime();

    const expiryTime = await AsyncStorage.getItem('expiryTime');
    const expiryDate = await AsyncStorage.getItem('expiryDate');

    if(expiryTime !== null && currentTime > parseInt(expiryTime, 10)){
        console.log('Tempo expirado!')
        return true
    }else if(expiryDate !== today){
        console.log('Renovação diaria do login!')
        return true
    }else{
        if(expiryTime){
            await AsyncStorage.removeItem('expiryTime');
            console.log('Voltou antes do tempo de inativação!')
        }
        return false;
    }
};


export default isTokenExpired;