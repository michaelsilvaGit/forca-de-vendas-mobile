import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transportadoraService from "../services/transportadoraService";




const initialState = {
    transportadoras: '',
    transportadoraCloneAndEdit: '',
    error: false,
    sucess: false,
    loading: false,
    message: false
}





// Pega lista de transportadora
export const getTransportadora = createAsyncThunk(
    'transportadora/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await transportadoraService.getTransportadora(data, config);
        return res.data.content;
    }
);


// Transportadora para clonar ou editar
export const transportadoraCloneAndEdit = createAsyncThunk(
    'transportadora/transportadoraCloneAndEdit',
    async(data, thunkApi) => {
        return data;
    }
);





export const transportadoraSlice = createSlice({
    name: 'transportadora',
    initialState,
    reducers: {
        resetMessageTransportadora: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
        resetTransportadoraCloneAndEdit: (state) => {
            state.transportadoraCloneAndEdit = '';
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getTransportadora.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getTransportadora.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.transportadoras = action.payload;
            })
            .addCase(transportadoraCloneAndEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.transportadoraCloneAndEdit = action.payload;
            })
    }
})

export const {resetMessageTransportadora, resetTransportadoraCloneAndEdit} = transportadoraSlice.actions
export default transportadoraSlice.reducer
