import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveStorageUsuarioLogin, loadStorageUsuarioLogin } from "../storage/usuarioLoginStorage";
import authService from "../services/authService";



const initialState = {
    usuario: '',
    nomeUsuario: '',
    fotoUsuario: '',
    codigoVendedor: '',
    idLoja: '',
    nomeLoja: '',
    cnpjLoja: '',
    error: null,
    sucess: false,
    loading: false,
    message: '',
    token: '',
    senhaStorage: ''
}



export const login = createAsyncThunk(
    'auth/login',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;
        const { dispatch } = thunkAPI;

        const res = await authService.login(data, config);

        await saveStorageUsuarioLogin(res.data, dispatch);

        console.log('RETORNO USUARIO: ', res.data)

        return  res.data; 

    }
)


export const loadUsuarioLoginFromStorage = createAsyncThunk(
    'auth/loadUsuarioLoginFromStorage',
    async (_, thunkApi) => {

        const loadedData = await loadStorageUsuarioLogin();
        return loadedData;
    }
);







export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.usuario = ''
            state.loading = false;
            state.error = null;
            state.sucess = false;
            state.message = '';
            state.token = '';
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.message = '';
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.message = '';
                state.loading = false;
                state.sucess = true;
                state.error = false;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.sucess = false;
                state.error = true;
                state.message = action.error.message;
                console.log('MENSAGEM ERRO SLICE LOGIN: ', state.message);
            })
            .addCase(loadUsuarioLoginFromStorage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.message = ''
                state.sucess = false
            })
            .addCase(loadUsuarioLoginFromStorage.fulfilled, (state, action) => {
                state.nomeUsuario = action.payload.nomeUsuario;
                state.fotoUsuario = action.payload.fotoUsuario;
                state.nomeLoja = action.payload.nomeLoja;
                state.cnpjLoja = action.payload.cnpjLoja;
                state.idLoja = action.payload.idLoja;
                state.codigoVendedor = action.payload.codigoVendedor;
                state.senhaStorage = action.payload.senhaStorage;

                console.log('carregou usuario login do storage!')
            })
    }
})


export const { resetAuth } = authSlice.actions
export default authSlice.reducer