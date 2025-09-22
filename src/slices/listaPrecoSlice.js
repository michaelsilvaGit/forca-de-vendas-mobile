import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import listaPrecoService from "../services/listaPrecoService";



const initialState = {
    listaPreco: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
}



//Pegar lista de preços
export const getListPrice = createAsyncThunk(
    'listaPreco/getAll',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await listaPrecoService.getListPrice(data, config);
        return res.data.content;

    }
)





export const listaPrecoSlice = createSlice({
    name: 'listaPreco',
    initialState,
    reducers: {
        resetMessageListaPreco: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getListPrice.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getListPrice.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.listaPreco = action.payload;
            })

    }
})


export const { resetMessageListaPreco } = listaPrecoSlice.actions
export default listaPrecoSlice.reducer