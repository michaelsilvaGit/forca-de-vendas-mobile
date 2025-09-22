import 'react-native-gesture-handler';

import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, AppState} from "react-native";
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
//import { createSwitchNavigator } from "@react-navigation/compat";
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import Home from "./screens/Home";
import Cliente from "./screens/PesquisarCliente";
import PesquisarPedido from "./screens/PesquisarPedido";
import NovoCliente from "./screens/NovoCliente";
import Pedido from "./screens/NovoPedido";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import MenuStyle from './components/MenuStyle/MenuStyle';
import Produtos from "./screens/Produtos";
import AdicionarProduto from './screens/AdicionarProduto';
import historicoPedido from './screens/historicoPedido';
import Financeiro from './screens/Financeiro';
import Comissao from './screens/Comissao';
import VisualizarPedido from './screens/VisualizarPedido';
import DuplicataCliente from './screens/DuplicataCliente';
import Relatorio from './screens/RelatorioPedido';
import Configuracao from './screens/Configuracao';
import Preloader from './screens/Preloader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TimeExpired } from './enum';
import About from "./screens/About"


const Drawer = createDrawerNavigator()

const MenuDrawer = () => {


    return (

        <Drawer.Navigator

            backBehavior='history'
            initialRouteName='Preloader'

            drawerContent={(props) => <MenuStyle {...props} />}

            screenOptions={({ route }) => ({

                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#0a6c91' },

                drawerLabelStyle: { color: '#0a6c91', textAlign: 'left', marginLeft: -15 },
                drawerInactiveTintColor: '#0a6c91',
                drawerActiveTintColor: 'tomato',

                drawerIcon: ({ color }) => {

                    let iconName;
                    let sizeIcon;

                    if (route.name === 'Home') {
                        iconName = 'home-outline'
                        sizeIcon = 28

                    } else if (route.name === 'PesquisarCliente') {
                        iconName = 'users'
                        sizeIcon = 28

                    } else if (route.name === 'PesquisarPedido') {
                        iconName = 'list'
                        sizeIcon = 28
                    }
                    else if (route.name === 'NovoCliente') {
                        iconName = 'user-plus'
                        sizeIcon = 28
                    }
                    else if (route.name === 'NovoPedido') {
                        iconName = 'shopping-cart'
                        sizeIcon = 28
                    }
                    else if (route.name === 'Produtos') {
                        iconName = 'box'
                        sizeIcon = 28
                    }
                    else if (route.name === 'RelatorioPedido') {
                        iconName = 'file-text'
                        sizeIcon = 28

                    } else if (route.name === 'Comissoes') {
                        iconName = 'graph'
                        sizeIcon = 28

                    } else if (route.name === 'Configuracoes') {
                        iconName = 'settings'
                        sizeIcon = 28
                    }

                    


                    return (
                        <View style={{ width: 35, alignItems: 'center' }}>
                            {iconName === 'home-outline' ? (
                                <Icon2 name={iconName} size={sizeIcon} color={color} />
                            ) : iconName === 'graph' ? (
                                <Icon3 name={iconName} size={sizeIcon} color={color} />
                            ) : (
                                <Icon name={iconName} size={sizeIcon} color={color} />
                            )}
                        </View>
                    )
                },
            })}
        >

            <Drawer.Screen name='Home' component={Home} options={{
                title: 'Inicio',
            }} />
            <Drawer.Screen name='PesquisarCliente' component={Cliente} options={{
                title: 'Clientes',
            }} />
            {/* <Drawer.Screen name='Produtos' component={Produtos} options={{
                title: 'Produtos',
            }} /> */}
            <Drawer.Screen name='PesquisarPedido' component={PesquisarPedido} options={{
                title: 'Pedidos',
            }} />
            <Drawer.Screen name='NovoCliente' component={NovoCliente} options={{
                title: 'Novo cliente',
            }} />
            <Drawer.Screen name='NovoPedido' component={Pedido} options={{
                title: 'Novo pedido',
            }} />
           
            <Drawer.Screen name='RelatorioPedido' component={Relatorio} options={{
                title: 'Relatorio Pedido',
            }} />
            <Drawer.Screen name='Comissoes' component={Comissao} options={{
                title: 'Comissões',
            }} />
            <Drawer.Screen name='Configuracoes' component={Configuracao} options={{
                title: 'Configurações',
                headerRight: HeaderPageAbout
            }} />
            <Drawer.Screen name='About' component={About} options={{
                title: 'Sobre',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerLeft: HeaderPageDrawer
            }} />
            <Drawer.Screen name='VisualizarPedido' component={VisualizarPedido} options={{
                title: 'Visualizar Pedido',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerLeft: HeaderPageDrawer
            }} />

            <Drawer.Screen name='AdicionarProduto' component={AdicionarProduto} options={{
                title: 'Adicionar produto',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerLeft: HeaderPageDrawer

            }} />
            <Drawer.Screen name='HistoricoPedido' component={historicoPedido} options={{
                title: 'Histórico Pedido',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerLeft: HeaderPageDrawer

            }} />
            <Drawer.Screen name='DuplicataCliente' component={DuplicataCliente} options={{
                title: 'Duplicatas Cliente',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerLeft: HeaderPageDrawer

            }} />
            <Drawer.Screen name='SignIn' component={SignIn} options={{
                title: '',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerShown: false

            }} />
            <Drawer.Screen name='Preloader' component={Preloader} options={{
                title: '',
                drawerItemStyle: { height: 0, marginTop: -4 },
                headerShown: false

            }} />

        </Drawer.Navigator>
    )
}



const HeaderPageDrawer = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const pedido = route.params && route.params

    return (

        <TouchableOpacity onPress={() => navigation.goBack({pedido})} >
            <Icon3 name='arrow-left-circle' size={30} color='#FFF' marginLeft={20} />
        </TouchableOpacity>
    )
}

const HeaderPageAbout = () => {

    const navigation = useNavigation()

    return (

        <TouchableOpacity onPress={() => navigation.navigate('About')} >
            <Icon3 name='options-vertical' size={20} color='#FFF' marginRight={15} />
        </TouchableOpacity>
    )
}



// const AuthStack = createSwitchNavigator(
//     {
//         //VerificarToken: VerificarToken,
//         AuthSignIn: SignIn,
//         Configuracao: Configuracao,
//         HomeSwitch: MenuDrawer,
//     },

//     {
//         initialRouteName: 'HomeSwitch',
//         backBehavior: 'none'    
//     }
// )


//Redux
import { Provider } from 'react-redux'
import { store } from './store'
import { resetAuth } from './slices/authSlice';
import { useDispatch } from 'react-redux';



const AppWithAuth = () => {

    useEffect(() => {

      const handleAppStateChange = async (nextAppState) => {

        if (nextAppState === 'background') {

            const token = await AsyncStorage.getItem('token');

            if(token){
                const expiryTime = new Date().getTime() + TimeExpired.TIME_EXPIRED * 1000; 
                await AsyncStorage.setItem('expiryTime', expiryTime.toString());

                console.log(`Inativação de ${TimeExpired.TIME_EXPIRED / 60} minutos iniciado.`);
                console.log("----------------");
            }
        }
      };
  
      const appStateListener = AppState.addEventListener('change', handleAppStateChange);
  
      return () => {
        appStateListener.remove();
      };
    }, []);
  
    return <MenuDrawer />;
};




const AppContainer = () => {

    return (
        
        <Provider store={store}>
            <NavigationContainer>
                <AppWithAuth />
            </NavigationContainer>
        </Provider>
    )
}


export default AppContainer;