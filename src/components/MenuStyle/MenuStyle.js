import React from "react"
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"
import { View, Text, Image, TouchableNativeFeedback } from "react-native"
import UserImageDefault from '../../assets/images/user.jpg'
import { useDispatch, useSelector } from "react-redux"
import { resetAuth } from "../../slices/authSlice"
import AsyncStorage from '@react-native-async-storage/async-storage';

import Styles from "./Styles"
import { globalStyles } from "../../globalStyles"




const MenuStyle = (props) => {

    const dispatch = useDispatch();
    
    const {nomeUsuario, fotoUsuario} = useSelector((state) => state.auth)


    const exit = () => {

        dispatch(resetAuth())
        removeToken()
    }

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('token');

            props.navigation.reset({
                index: 0,
                routes: [{ name: 'SignIn' }],
            });

            console.log('Token removido com sucesso!');
        } catch (error) {
            console.error('Erro ao remover o token:', error);
        }
    };

    return (

        <DrawerContentScrollView {...props}>
            <View style={Styles.containerMenuUser}>
                <Image source={fotoUsuario ? {uri: fotoUsuario} : UserImageDefault} style={{height: 70, width: 70, borderRadius: 35}}/>
                <Text style={{color: '#FFF', marginTop: 5}}>{nomeUsuario}</Text>
            </View>
            <DrawerItemList {...props} />
            <View style={Styles.logout}>
                <TouchableNativeFeedback onPress={() => exit()}>
                    <Text style={{fontSize: 17, color: '#0a6c91'}}>Sair</Text>
                </TouchableNativeFeedback>
            </View>
        </DrawerContentScrollView>
    )
}




export default MenuStyle