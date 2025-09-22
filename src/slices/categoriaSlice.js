import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriaService from "../services/categoriaService";

const initialState = {
    categoria: '',
    categorias: [],
    categoriasFilhas: [],
    error: false,
    sucess: false,
    loading: false,
    message: false
}


// chama as categorias Pai
export const getCategoria = createAsyncThunk(
    'categoria/getAll',
    async(data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await categoriaService.getCategoria(data, config);
        return res.data.content;
    }
);




export const categoriaSlice = createSlice({
    name: 'categoria',
    initialState,
    reducers: {
        resetCategoria: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getCategoria.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(getCategoria.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;

                state.categorias = [];
                state.categoriasFilhas = [];

                action.payload.map(item => {
                    if (item.idPai === 0) {
                        state.categorias.push(item); 
                    } else {
                        state.categoriasFilhas.push(item); 
                    }
                })
            })
    }


})

export const {resetCategoria} = categoriaSlice.actions
export default categoriaSlice.reducer
