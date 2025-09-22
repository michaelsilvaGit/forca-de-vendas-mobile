import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, Platform, PermissionsAndroid, Alert, Linking, ActivityIndicator, Modal } from "react-native"
import { loadConfigFromStorage } from '../../slices/configuracaoSlice'
import { useIsFocused } from '@react-navigation/native';
import verificarToken from '../../utils/verificarToken';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loadValidacaoChaveFromStorage } from '../../slices/validacaoSlice';
import { loadUsuarioLoginFromStorage } from '../../slices/authSlice';
import { loadValorVendaMesFromStorage } from '../../slices/pedidoSlice';
//import CodePush from 'react-native-code-push';
import { globalStyles } from '../../globalStyles';
import { App, Atualizacao } from '../../enum';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { runMigrations, verifySchema } from '../../db/migrationRunner';
import { clearCurrentDraftId, purgeOldDraftsLast30Days } from '../../db/repository/pedidoRepositoryDraft';

export default () => {


  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);
  const [baixando, setBaixando] = useState(false);
  const [nomeProcesso, setNomeProcesso] = useState('');


  useEffect(() => {
    if (isFocused) {
      //verificarAutenticacao();
      verificarAtualizacao();
      limparRota();
      clearCurrentDraftId();
    }
  }, [isFocused]);


  //RODAR O SCHEMA
  useEffect(() => {
    if (isFocused) {

      (async () => {
        try {
          await runMigrations(); // cria/atualiza o schema BD
          const result = await purgeOldDraftsLast30Days(); //Deixa somente os rasquinhos do mês atual
          console.log('Rascunhos apagados mês anterior: ', result.rowsAffected);
        } catch (e) {
          console.log('Erro ao migrar:', e);
        }
      })();

    }
  }, [isFocused]);


  const verificarAtualizacao = async () => {

    try {
      const response = await fetch(Atualizacao.api);
      const data = await response.json();

      console.log('DATA: ', data)

      if (data && data.error) {
        console.log('Envie os dois arquivos para o servidor de atualização! versao.Json e apk.', data.error);
        verificarAutenticacao();
        return;
      }

      const novaVersao = data.versao;
      const apkUrl = data.url;
      const apKName = data.url.split('/').pop();
      const destPath = `${RNFS.DocumentDirectoryPath}/${apKName}`;

      if (App.versaoAtualizacao !== novaVersao) {
        console.log('Atualizando o app...')
        baixarEInstalar(apkUrl, destPath);
      } else {
        console.log('O app já tem a versão mais recente!');
        verificarAutenticacao();
      }
    } catch (error) {
      console.error('Erro ao verificar atualização:', error);
      Alert.alert('Erro ao verificar versão', error.message);
    }

  }


  const baixarEInstalar = async (apkUrl, destPath) => {

    const temPermissao = await solicitarPermissao();

    if (!temPermissao) {
      Alert.alert('Permissão negada', 'Permissão de leitura não foi concedida.');
      verificarAutenticacao();
      return;
    }

    try {
      // Deleta se já existir
      if (await RNFS.exists(destPath)) {
        await RNFS.unlink(destPath);
      }

      setBaixando(true); // 👈 mostra loading
      setNomeProcesso('Baixando e Instalando o APK...');

      const result = await RNFS.downloadFile({
        fromUrl: apkUrl,
        toFile: destPath,
      }).promise;

      if (result.statusCode === 200) {
        FileViewer.open(destPath, { showOpenWithDialog: true }).catch((error) => {
          console.error('Erro ao abrir o APK:', error);
          Alert.alert('Erro', 'Não foi possível abrir o instalador.');
          verificarAutenticacao();
        });
        setBaixando(false);
        verificarAutenticacao();
      } else {
        verificarAutenticacao();
        throw new Error(`Erro no download (status ${result.statusCode})`);
      }
    } catch (err) {
      console.error('Erro geral:', err);
      Alert.alert('Erro ao baixar o APK', err.message);
      verificarAutenticacao();
    }
  };


  const solicitarPermissao = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.log('Erro ao solicitar permissão:', err);
      verificarAutenticacao();
      return false;
    }
  };

  // const checkForUpdates = async () => {

  //   try {
  //     console.log("Iniciando verificação de atualização...");
  //     await CodePush.sync(
  //       {
  //         updateDialog: false,
  //         installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  //       },
  //       (status) => {
  //         switch (status) {
  //           case CodePush.SyncStatus.UP_TO_DATE:
  //             console.log('App está atualizado!');
  //             setIsUpdating(false);
  //             verificarAutenticacao();
  //             break;
  //           case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
  //             console.log('Procurando por atualizações...');
  //             break;
  //           case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
  //             console.log('Baixando atualização...');
  //             setIsUpdating(true);
  //             break;
  //           case CodePush.SyncStatus.INSTALLING_UPDATE:
  //             console.log('Instalando atualização...');
  //             setIsUpdating(false);
  //             setUpdateDownloaded(true);
  //             break;
  //           case CodePush.SyncStatus.SYNC_IN_PROGRESS:
  //             console.log('Atualização já está em progresso...');
  //             break;
  //           case CodePush.SyncStatus.UPDATE_IGNORED:
  //             console.log('Atualização ignorada.');
  //             setIsUpdating(false);
  //             verificarAutenticacao();
  //             break;
  //           case CodePush.SyncStatus.UPDATE_INSTALLED:
  //             console.log('Atualização instalada.');
  //             setIsUpdating(false);
  //             break;
  //           case CodePush.SyncStatus.UNKNOWN_ERROR:
  //             console.log('Erro desconhecido.');
  //             setIsUpdating(false);
  //             verificarAutenticacao();
  //             break;
  //           default:
  //             console.log('Status desconhecido:', status);
  //             setIsUpdating(false);
  //             verificarAutenticacao();
  //             break;
  //         }
  //       },
  //       (progress) => {
  //         const percentage = (progress.receivedBytes / progress.totalBytes) * 100;
  //         setProgress(percentage);
  //       }
  //     );

  //     console.log("----------------------------");

  //   } catch (error) {
  //     console.error('Erro ao verificar por atualizações:', error);
  //   }
  // };


  const verificarAutenticacao = async () => {

    await loadingSlices();

    const isNotAuthorized = await verificarToken(navigation, dispatch);

    if (!isNotAuthorized) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };


  const loadingSlices = async () => {

    await dispatch(loadConfigFromStorage());
    await dispatch(loadValidacaoChaveFromStorage());
    await dispatch(loadUsuarioLoginFromStorage());
    await dispatch(loadValorVendaMesFromStorage());

    console.log("----------------------------");
  }

  const limparRota = () => {
    navigation.setParams({
        drafRoutetId: undefined, 
        idPedido: undefined,
        numero: undefined,
    });
    console.log('Limpando parametro da rota')
}
  return (



    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Modal visible={baixando} transparent animationType="fade">
        <View style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>Atualizando!</Text>
          <Text style={{ fontSize: 18, color: '#fff', marginTop: 10 }}>{nomeProcesso}</Text>
        </View>
      </Modal>
      <View>
        <ActivityIndicator size="large" color="#00A0D3" />
      </View>
    </View>

    // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    //   {isUpdating && ( 
    //     <View>
    //       <Text style={[globalStyles.text, { fontSize: 19 }]}>Baixando atualizações... {progress.toFixed(2)}%</Text>
    //     </View>
    //   )}
    //   {updateDownloaded && ( 
    //     <View style={{ width: '80%' }}>
    //       <Text style={[globalStyles.text, { fontSize: 16, marginBottom: 10, textAlign: 'center' }]}>Atualizado com sucesso!</Text>

    //       <TouchableOpacity activeOpacity={0.9} onPress={() => CodePush.restartApp()} style={{ backgroundColor: '#549cd5', width: '100%', paddingVertical: 9, borderRadius: 6 }}>
    //         <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Reiniciar Aplicativo!</Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}
    //   {!isUpdating && !updateDownloaded && (
    //     <View>
    //       <ActivityIndicator size="large" color="#00A0D3" /> 
    //     </View>

    //   )}

    // </View>
  );
};
