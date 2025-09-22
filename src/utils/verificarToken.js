import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import isTokenExpired from './isTokenExpired';
import { resetAuth } from '../slices/authSlice';





const verificarToken = async (navigation, dispatch) => {

    const expired = await isTokenExpired();
    const token = await AsyncStorage.getItem('token');
    

    if (token && !expired) {

        console.log('Token verificado e validado!');
        return false;

    } else {

        dispatch(resetAuth());
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('expiryTime');

        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        });

        console.log('Token expirado!');
        return true;
    }
}


export default verificarToken;