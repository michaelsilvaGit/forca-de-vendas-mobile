import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formaPagamentoService from "../services/formaPagamentoService";

const initialState = {
    prazos: '',
    prazoCloneAndEdit: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
}


// Forma de Pagamento
export const getFormaPagamento = createAsyncThunk(
    'formaPagamento/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await formaPagamentoService.getFormaPagamento(data, config);
        return res.data.content;
    }
);


// Pagamento para clonar ou editar
export const pagamentoCloneAndEdit = createAsyncThunk(
    'formaPagamento/pagamentoCloneAndEdit',
    async(data, thunkApi) => {
        return data;
    }
);





export const formaPagamentoSlice = createSlice({
    name: 'tipoPagamento',
    initialState,
    reducers: {
        resetMessageFormaPagamento: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
        resetpagamentoCloneAndEdit: (state) => {
            state.prazoCloneAndEdit = '';
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getFormaPagamento.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getFormaPagamento.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.prazos = action.payload;
            })
            .addCase(pagamentoCloneAndEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.prazoCloneAndEdit = action.payload;
            })
    }
})

export const {resetMessageFormaPagamento, resetpagamentoCloneAndEdit} = formaPagamentoSlice.actions
export default formaPagamentoSlice.reducer
