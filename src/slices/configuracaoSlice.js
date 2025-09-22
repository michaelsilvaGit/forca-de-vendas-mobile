import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import DeviceInfo from 'react-native-device-info';
import { saveStorageConfig, loadStorageConfig } from "../storage/configStorage";



const initialState = {
    tenant: '',
    url: '',
    header: {
        headers: {

        }
    },
    token: '',
    qtdTelaProdutos: '',
    qtdTelaClientes: '',
    qtdTelaPedidos: '',
    chaveAtivacao: '',
    imei: '',
    meta: '',
    nomeProduto: '',
    lojaPadrao: '',
    loading: false,
    message: '',
    sucess: false,
    idTransportadora: '',
    idOperacao: '',
    idColaborador: ''
}


export const saveConfig = createAsyncThunk(
    'configuracao/saveConfig',
    async(data, thunkApi) => {

        const { dispatch } = thunkApi;

        data.imei = await getUniqueIdDevice();
        await saveStorageConfig(data, dispatch);
        return data;
    }
);


export const loadConfigFromStorage = createAsyncThunk(
    'configuracao/loadConfigFromStorage',
    async (_, thunkApi) => {

        const loadedData = await loadStorageConfig();
        return loadedData;
    }
);



//Funções complementares

const getUniqueIdDevice = async () => {
    try {
      const id = await DeviceInfo.getUniqueId();
      return id;

    } catch (err) {
      console.warn(err);
    }
};






export const configuracaoSlice = createSlice({
    name: 'configuracao',
    initialState,
    reducers: {
        resetConfiguracao: (state) => {
            state.idColaboradorConfig = '';
            state.tenant = '';
            state.url = '';
            state.header = '';
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(saveConfig.pending, (state) => {
            state.loading = true;
            state.sucess = false;
            state.message = '';
        })
        .addCase(saveConfig.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.message = 'Configurações salvas com sucesso!'
        })
        .addCase(loadConfigFromStorage.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loadConfigFromStorage.fulfilled, (state, action) => {
            state.qtdTelaProdutos = action.payload.qtdTelaProdutos;
            state.qtdTelaClientes = action.payload.qtdTelaClientes;
            state.qtdTelaPedidos = action.payload.qtdTelaPedidos;
            state.chaveAtivacao = action.payload.chaveAtivacao;
            state.imei = action.payload.imei;
            state.meta = action.payload.meta;
            state.nomeProduto = action.payload.nomeProduto;
            state.lojaPadrao = action.payload.lojaPadrao;
            state.url = action.payload.urlRemota;
            state.tenant = action.payload.tenant;
            state.idColaborador = action.payload.idColaborador;
            state.idOperacao = action.payload.idOperacao;
            state.idTransportadora = action.payload.idTransportadora;
            state.loading = false;
            state.message = '';
            state.token = action.payload.token;
            state.header.headers = {'tenant': state.tenant,
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${state.token}`,
                                   }

            console.log('carregou configurações do storage!');
        })
    }
})

export const {resetConfiguracao, updateStateWithLoadedStorage } = configuracaoSlice.actions
export default configuracaoSlice.reducer

