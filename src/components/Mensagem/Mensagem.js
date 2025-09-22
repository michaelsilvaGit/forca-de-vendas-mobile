import React from "react"
import { View, Text } from "react-native"
import Toast from 'react-native-toast-message';
import IconWar from 'react-native-vector-icons/Ionicons'

import Styles from "./Styles"




export const showMensagem = (sucess, message) => {
    Toast.show({
      type: sucess ? 'success' : 'error',
      //text1: sucess ? 'Sucesso!' : 'Atenção!',
      text2: message,
      visibilityTime: 3000,
    });
  };



  export const mensagemConfig = {

    // Configuração de erro
    error: ({ text1, text2 }) => (
        <View style={{
            position: 'absolute',
            top: 0,
            height: 50,
            width: '80%',
            backgroundColor: '#f3b801',  // Vermelho para erro
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            elevation: 5,
        }}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <IconWar name='warning' size={30} color='#FFF' />
                {text2 ? <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>{text2}</Text> : null}
            </View>
            
        </View>
    ),

    // Configuração de sucesso
    success: ({ text1, text2 }) => (
        <View style={{
            position: 'absolute',
            top: 0,
            height: 50,
            width: '80%',
            backgroundColor: '#4CAF50',  // Verde para sucesso
            borderRadius: 10,
            padding: 10,
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.5,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            elevation: 5,
            zIndex: 5
        }}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', zIndex: 5}}>
                <IconWar name='checkmark-circle' size={30} color='#FFF' />
                {text2 ? <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>{text2}</Text> : null}
            </View>
        </View>
    ),
};



    

