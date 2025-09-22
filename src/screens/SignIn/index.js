import React, { useEffect, useState } from 'react';
import { Alert, View, Text, TouchableOpacity, Button, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import IconEye from 'react-native-vector-icons/Ionicons';
import LogoAraguaia from '../../assets/logo-araguaia.svg';
import UserIcon from '../../assets/account.svg';
import LockIcon from '../../assets/lock.svg';
import SignInput from '../../components/SearchSiginInputs/SignInput';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validarChave } from '../../slices/validacaoSlice';
import { loadConfigFromStorage } from '../../slices/configuracaoSlice';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import validarChaveAcesso from '../../utils/validarChaveAcesso';
import Mensagem from 'react-native-toast-message';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import { CheckBox } from 'react-native-elements';
import Tooltip from 'react-native-walkthrough-tooltip';
import DeviceInfo from 'react-native-device-info';
import { App } from '../../enum';
import styles from './styles';
import { globalStyles } from '../../globalStyles';



export default () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const appVersion = App.versaoAtualizacao;

    const { usuario: usuarioAuth, token, message: messageErroAuth, loading, error: errorAuth, nomeLoja, cnpjLoja, senhaStorage } = useSelector((state) => state.auth);
    const { usuarioLogin, ativado, bloqueado, primeiroAcesso, loading: loadingValidacao, chaveAtivacaoValidada, sucess, error, message } = useSelector((state) => state.validacao);
    const { chaveAtivacao: chaveStorage, imei, url, tenant, loading: loadingConfig } = useSelector((state) => state.configuracao);
    
    const [usuario, setUsuario] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [openLoading, setOpenLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [lembrarSenha, setLembrarSenha] = useState(false);
    const [senhaStorageState, setSenhaStorageState] = useState();

    const [visibleInfo, setVisibleInfo] = useState(true);


    // useEffect(() => {
    //     if(isFocused){
    //         console.log('SINGIN');
    //         console.log('CHAVE STORAGE: ', chaveStorage);
    //         console.log('URL ATIVAÇÃO VALIDADA STORAGE: ', chaveAtivacaoValidada);
    //         console.log('PRIMEIRO ACESSO STORAGE: ', primeiroAcesso);
    //         console.log('IMEI STORAGE: ', imei);
    //         console.log('URL SERVIDOR: ', url);
    //         console.log('TENANT SERVIDOR: ', tenant);
    //         console.log('----------------------------');
    //     } 
    // }, [isFocused, imei, chaveStorage, primeiroAcesso])



    useEffect(() => {

        if (isFocused) {
            if (chaveAtivacaoValidada === '' && chaveStorage !== '') {
                setOpenLoading(true);
                validarChaveAcesso(dispatch);
                setVisibleInfo(false);
            }
        }

    }, [isFocused, chaveAtivacaoValidada, chaveStorage])



    useEffect(() => {

        if (!errorAuth && errorAuth !== null) {
            saveToken(token);
        } else {
            if (messageErroAuth !== '') {
                showMensagem(false, messageErroAuth);
            }
        }

    }, [usuarioAuth, messageErroAuth, errorAuth])


    useEffect(() => {

        if (isFocused) {
            setUsuario(usuarioLogin);
            setPasswordField(senhaStorage);
            if(senhaStorage !== ''){
                setLembrarSenha(true);
                setSenhaStorageState(senhaStorage);
            }else{
                setLembrarSenha(false);
                setSenhaStorageState('');
            } 
        }

    }, [isFocused, usuarioLogin, senhaStorage])




    const saveToken = async (token) => {

        try {

            const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD

            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('expiryDate', today);
            
            dispatch(loadConfigFromStorage());

            console.log('Token salvo com sucesso!');
            console.log('-----------------------');

            if(lembrarSenha){
                await AsyncStorage.setItem('senhaStorage', passwordField);
            }else{
                await AsyncStorage.setItem('senhaStorage', '');  
            }

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            });

        } catch (error) {
            console.error('Erro ao salvar o token:', error);
        }

    };


    const singIn = () => {

        let data = {
            login: usuario,
            password: passwordField.toUpperCase(),
        }

        if (usuario && passwordField) {
            dispatch(login(data));
        } else {
            Alert.alert('Atenção', 'Necessario ter usuario e senha!')
        }

    }


    const oncanceLoading = () => {
        setOpenLoading(false);
    }


    const handleLembraSenha = () => {
        setLembrarSenha(!lembrarSenha)
    }

    const handleSetPassword = (text) => {

        setPasswordField(text);
        
        if(text === ''){
            setSenhaStorageState('')
        }
    }
 




    return (
        <>
            <LoadingComponent
                isVisibleLoading={openLoading}
                loading={loadingValidacao}
                sucess={sucess}
                error={error}
                messageLoading={'validando ativação!'}
                messageSucess={message}
                messageError={message}
                oncanceLoading={oncanceLoading}
            />

            <View style={styles.container}>

                <Mensagem config={mensagemConfig} />
     
                <View style={{ width: '100%', padding: 8, position: 'absolute', bottom: 0, backgroundColor: '#1f404f', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        
                    <View>
                        <Text style={{ color: '#FFF' }}>{nomeLoja}</Text>
                        <Text style={{ color: '#FFF' }}>{`CNPJ: ${cnpjLoja}`}</Text>
                    </View>

                    <Tooltip
                        isVisible={visibleInfo && chaveStorage === ''}
                        content={
                            <View style={{}}>
                                <Text style={{color: '#FFF', fontSize: 15, fontWeight: '500', textAlign: 'center'}}>
                                    Primeiro acesso? Adicione a chave de ativação aqui!
                                </Text>
                            </View>
                        }
                        placement="top"
                        onClose={() => setVisibleInfo(false)}
                        displayInsets={{right: 0}}
                        contentStyle={{backgroundColor: '#2f9fec'}}                        
                        
                    >
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Configuracoes', true)}
                        >
                            <Icon name='settings' size={25} color='#FFF' />
                        </TouchableOpacity>
    
                    </Tooltip>
                </View>

                <View style={{width: '80%', zIndex: -1, marginBottom: 50}}>
                    <LogoAraguaia width="100%" height="160" />
                </View>
               
                <View style={styles.inputArea}>

                    <SignInput
                        IconSvg={UserIcon}
                        placeholder="usuario não vinculado"
                        value={usuario}
                        habilitarInput={false}
                        onChangeText={text => setUsuario(text)}
                        showPassword={false}
                    />

                    <SignInput
                        IconSvg={LockIcon}
                        IconShowPass={IconEye}
                        placeholder="Digite sua senha"
                        value={passwordField}
                        habilitarInput={true}
                        showPassword={showPassword}
                        habilitarShowPassword={() => setShowPassword(!showPassword)}
                        onChangeText={text => handleSetPassword(text)}
                        senhaStorageState={senhaStorageState}
                    />

                    <TouchableOpacity style={chaveAtivacaoValidada !== '' ? styles.buttonLogin : styles.buttonLoginDisable} activeOpacity={0.9} onPress={() => { chaveAtivacaoValidada !== '' && (singIn()) }}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#FFF" />
                        ) : (
                            <Text style={chaveAtivacaoValidada !== '' ? styles.textButtonLogin : styles.textButtonLoginDisable}>Entrar</Text>
                        )}
                    </TouchableOpacity>
                    <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', zIndex: -1}}>
                           
                                <Text style={{fontSize: 16, fontWeight: '500', color: '#4693c7'}}>Lembrar senha</Text>
                                <CheckBox
                                    checked={lembrarSenha}
                                    onPress={() => handleLembraSenha()}
                                    containerStyle={{marginTop: 8, marginLeft: 0, marginRight: 0, paddingRight: 0 }}
                                    uncheckedColor="#4693c7"
                                    checkedColor="#4693c7"
                                />
                    </View>
                    
                    <Text style={{ color: '#6c777b', textAlign: 'center', marginTop: 40 }}>Versão {appVersion}</Text>
                  
                </View>
            </View>
        </>

    );
}