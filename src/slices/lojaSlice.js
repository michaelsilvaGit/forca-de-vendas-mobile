import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import lojaService from "../services/lojaService"; 




const initialState = {
    listaLoja: '',
    lojaCloneAndEdit: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
}





// Pega lista de lojas
export const getLoja = createAsyncThunk(
    'loja/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await lojaService.getLoja(data, config);
        return res.data.content;
    }
);


// Loja para clonar ou editar
export const lojaCloneAndEdit = createAsyncThunk(
    'loja/lojaCloneAndEdit',
    async(data, thunkApi) => {
        return data;
    }
);





export const lojaSlice = createSlice({
    name: 'loja',
    initialState,
    reducers: {
        resetMessageLoja: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
        resetLojaCloneAndEdit: (state) => {
            state.lojaCloneAndEdit = '';
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getLoja.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getLoja.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.listaLoja = action.payload;
            })
            .addCase(lojaCloneAndEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                const semValor = Object.values(action.payload).every(v => v === undefined);
                console.log('TEM VALOR: ', semValor)
                state.lojaCloneAndEdit =  !semValor ? action.payload : '';
            })
    }
})

export const {resetMessageLoja, resetLojaCloneAndEdit} = lojaSlice.actions
export default lojaSlice.reducer
