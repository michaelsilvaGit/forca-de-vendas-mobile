import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform, PermissionsAndroid, Alert, Linking, ActivityIndicator, Modal } from "react-native"
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import { globalStyles } from '../../globalStyles';
import { App } from '../../enum';
import limparBaseDeDados from '../../utils/limparBaseDeDados';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';








export default () => {

    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [deviceInfo, setDeviceInfo] = useState({
        uniqueId: '',
        model: '',
        systemVersion: '',
        platform: Platform.OS,
        version: ''
    });

    const [chaveOnly, setChaveOnly] = useState(false);
    const [openConfirmacao, setOpenConfirmacao] = useState(false);
    // const [baixando, setBaixando] = useState(false);
    // const [nomeProcesso, setNomeProcesso] = useState('');




    useEffect(() => {
        if (isFocused) {
            getDeviceInfo();
        }
    }, [isFocused]);


    const getDeviceInfo = async () => {

        try {
            const uniqueId = await DeviceInfo.getUniqueId();
            const model = await DeviceInfo.getModel();
            const systemVersion = await DeviceInfo.getSystemVersion();
            const version = await DeviceInfo.getVersion();

            setDeviceInfo({
                uniqueId,
                model,
                systemVersion,
                platform: Platform.OS,
                version
            });

        } catch (err) {
            console.warn(err);
        }
    };


    const confirmation = (chaveOnly) => {

        setChaveOnly(chaveOnly);
        setOpenConfirmacao(true);
    }

    const handleLimparDados = async () => {

        await limparBaseDeDados(chaveOnly);
        navigation.navigate('Preloader');
    }

    const handleOnCancel = () => {
        setOpenConfirmacao(false);
    }


    


    return (

        <>

            <View style={{ width: '100%', paddingHorizontal: 6 }}>
{/* 
                <Modal visible={baixando} transparent animationType="fade">
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <ActivityIndicator size="large" color="#fff" />
                        <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>{nomeProcesso}</Text>
                    </View>
                </Modal> */}

                <ConfirmationModal isVisible={openConfirmacao} confirmed={handleLimparDados} text={'Deseja limpar '} onCancel={handleOnCancel} data={chaveOnly ? 'a CHAVE DE ACESSO' : 'a BASE DE DADOS'} />

                <View style={{ width: '100%' }}>
                    <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, paddingBottom: 13, width: '100%', display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Text style={[globalStyles.text, { fontSize: 19 }]}>Atualização Força de Vendas:</Text>
                        <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 17 }]}>{App.versaoAtualizacao}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, paddingBottom: 13, width: '100%', display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Text style={[globalStyles.text, { fontSize: 19 }]}>Plataforma:</Text>
                        <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 17 }]}>{deviceInfo.platform}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, paddingBottom: 13, width: '100%', display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Text style={[globalStyles.text, { fontSize: 19 }]}>UUID:</Text>
                        <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 17 }]}>{deviceInfo.uniqueId}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, paddingBottom: 13, width: '100%', display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Text style={[globalStyles.text, { fontSize: 19 }]}>Modelo:</Text>
                        <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 17 }]}>{deviceInfo.model}</Text>
                    </View>
                    <View style={{ borderBottomColor: '#CCC', borderBottomWidth: 1, paddingBottom: 13, width: '100%', display: 'flex', flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                        <Text style={[globalStyles.text, { fontSize: 19 }]}>Versão:</Text>
                        <Text style={[globalStyles.text, { marginLeft: 10, fontSize: 17 }]}>{deviceInfo.systemVersion}</Text>
                    </View>
                </View>

                {/* <TouchableOpacity style={{ marginTop: 20, borderRadius: 6, paddingVertical: 10, backgroundColor: '#0a6c91' }} onPress={verificarAtualizacao}>
                    <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF' }}>Atualizar Aplicativo</Text>
                </TouchableOpacity> */}

            </View>

            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, alignItems: 'center' }}>

                <View style={{ width: '97%' }}>

                    <TouchableOpacity activeOpacity={0.9} onPress={() => confirmation(true)} style={{ backgroundColor: '#549cd5', width: '100%', paddingVertical: 9, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Remover chave de acesso</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ width: '97%' }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => confirmation()} style={{ marginTop: 5, marginBottom: 20, backgroundColor: '#f86666', width: '100%', paddingVertical: 9, borderRadius: 6 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Limpar base de dados</Text>
                    </TouchableOpacity>
                </View>
            </View>


        </>

    )
}