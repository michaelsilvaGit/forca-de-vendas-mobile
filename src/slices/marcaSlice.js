import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import marcaService from "../services/marcaService";

const initialState = {
    marca: '',
    marcas: [],
    error: false,
    sucess: false,
    loading: false,
    message: false
}


// Forma de Pagamento
export const getMarca = createAsyncThunk(
    'marca/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await marcaService.getMarca(data, config);
        return res.data.content;
    }
);





export const marcaSlice = createSlice({
    name: 'marca',
    initialState,
    reducers: {
        resetMarca: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMarca.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getMarca.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.marcas = action.payload;
            })
    }
})

export const {resetMarca} = marcaSlice.actions
export default marcaSlice.reducer
