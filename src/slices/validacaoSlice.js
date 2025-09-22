import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import validacaoService from "../services/validacaoService";

import { saveStorageValidacaoChave, loadStorageValidacaoChave } from "../storage/validacaoChaveStorage";


const initialState = {
    ativado: '',
    bloqueado: '',
    usuarioLogin: '',
    loading: false,
    error: false,
    sucess: false,
    message: '',
    primeiroAcesso: 'true',
    chaveAtivacaoValidada: '',
}




export const validarChave = createAsyncThunk(
    'validacao/validarChave',
    async(_, thunkApi) => {

        const config = thunkApi.getState().configuracao;
        const { dispatch } = thunkApi;
        
        const res = await validacaoService.validarChave(config);

        await saveStorageValidacaoChave(res.data, dispatch);
        
        return res.data;
    }
);


export const loadValidacaoChaveFromStorage = createAsyncThunk(
    'validacao/loadValidacaoChaveFromStorage',
    async (_, thunkApi) => {

        const loadedData = await loadStorageValidacaoChave();
        return loadedData;
    }
);





export const validacaoSlice = createSlice({
    name: 'validacao',
    initialState,
    reducers: {
        resetValidacao: (state) => {
            state.chaveAtivacao = '',
            state.imei = '',
            state.loading = false,
            state.error = false,
            state.sucess = false
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(validarChave.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.message = ''
            state.sucess = false
        })
        .addCase(validarChave.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.message = 'Chave validada com sucesso!';
        })
        .addCase(validarChave.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = true;
            state.message = action.error.message;
            console.log('MENSAGEM DO SLICE: ', state.message);
        })
        .addCase(loadValidacaoChaveFromStorage.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.message = ''
            state.sucess = false
        })
        .addCase(loadValidacaoChaveFromStorage.fulfilled, (state, action) => {

            state.ativado = action.payload.ativado;
            state.bloqueado = action.payload.bloqueado;
            state.usuarioLogin = action.payload.usuarioLogin;
            state.primeiroAcesso = action.payload.primeiroAcesso;
            state.chaveAtivacaoValidada = action.payload.chaveAtivacaoValidada;
            state.loading = false;

            console.log('carregou validação chave do storage!')
        })
    }
})

export const {resetValidacao, updateStateWithLoadedStorage} = validacaoSlice.actions
export default validacaoSlice.reducer
