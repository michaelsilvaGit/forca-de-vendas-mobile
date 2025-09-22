import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import duplicataService from "../services/duplicataService";

const initialState = {
    duplicatas: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
}





// Forma de Pagamento
export const getDuplicataByIdCliente = createAsyncThunk(
    'Duplicata/getDuplicataByIdCliente',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await duplicataService.getDuplicataByIdCliente(data, config);
        return res.data;
    }
);




export const duplicataSlice = createSlice({
    name: 'Duplicata',
    initialState,
    reducers: {
        resetMessageDuplicata: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getDuplicataByIdCliente.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getDuplicataByIdCliente.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = false;
                state.duplicatas = action.payload;
            })
    }
})

export const {resetMessageDuplicata} = duplicataSlice.actions
export default duplicataSlice.reducer