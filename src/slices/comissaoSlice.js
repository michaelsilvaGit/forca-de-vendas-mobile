import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import comissaoService from "../services/comissaoService";



const initialState = {
    comissaoPrestador: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
};




// Comissao Prestador
export const getComissaoPrestador = createAsyncThunk(
    'comissaoPrestador/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await comissaoService.getComissao(data, config);
        return res.data.content;
    }
);





export const comissaoPrestadorSlice = createSlice({
    name: 'comissao',
    initialState,
    reducers: {
        resetMessageComissaoPrestador: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getComissaoPrestador.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getComissaoPrestador.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.comissaoPrestador = action.payload;
            })
            
    }
})

export const {resetMessageComissaoPrestador} = comissaoPrestadorSlice.actions
export default comissaoPrestadorSlice.reducer