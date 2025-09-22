import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

import produtoService from "../services/produtoService"



const initialState = {
    produtos: '',
    produtosEquivalentes: '',
    item: '',
    items: [],
    error: false,
    sucess: false,
    sucessItem: false,
    loading: false,
    loadingEequivalente: false,
    message: ''
}




//Pegar todos os produtos
export const getProducts = createAsyncThunk(
    'produto/getAll',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await produtoService.getProducts(data, config);
        return res.data.content;
    }
)


//Buscar produtos equivalentes
export const seachEquivalentes = createAsyncThunk(
    'produto/seachEquivalentes',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await produtoService.searchEquivalentes(data, config);
        return res.data.content;

    }
);


//Adicionar produto na lista de items
export const addItems = createAsyncThunk(
    'produto/addItems',
    async (data, thunkAPI) => {
        return data
    }
)

//Editar Item
export const updateItem = createAsyncThunk(
    'produto/editItem',
    async (data, thunkAPI) => {
        return data
    }
)

//Buscar Item pelo Id
export const getItemById = createAsyncThunk(
    'produto/getItembyId',
    async (id, thunkAPI) => {
        return id
    }
)

//Deletar Item
export const deleteItem = createAsyncThunk(
    'produto/deleteItem',
    async (id, thunkAPI) => {
        return id
    }
)


//Cliente para clonar ou editar
export const itemsCloneAndEdit = createAsyncThunk(
    'produto/itemsCloneAndEdit',
    async (data, thunkAPI) => {
        return data;
    }
)




export const produtoSlice = createSlice({
    name: 'produto',
    initialState,
    reducers: {
        resetMessageProduto: (state) => {
            state.message = '';
            state.loading = false;
            state.error = false;
            state.sucess = false;
        },
        resetItemProduto: (state) => {
            state.items = []
        },
        resetProdutoEquivalentes: (state) => {
            state.produtosEquivalentes = '';
        },
        resetProdutos: (state) => {
            state.produtos = '';
            
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.sucess = false;
                state.message = '';
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = false;
                state.message = '';
                state.produtos = action.payload;
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.loading = false;
                state.sucess = false;
                state.error = true;
                state.message = action.error.message;
            })
            .addCase(seachEquivalentes.pending, (state) => {
                state.loading = true;
                state.loadingEequivalente = true;
                state.error = false;
                state.sucess = false;
                state.message = '';
            })
            .addCase(seachEquivalentes.fulfilled, (state, action) => {
                state.loading = false;
                state.loadingEequivalente = false;
                state.sucess = true;
                state.error = false;
                state.messageErrorProduto = false;
                state.produtosEquivalentes = action.payload;
                state.message = '';
            })
            .addCase(seachEquivalentes.rejected, (state, action) => {
                state.loading = false;
                state.loadingEequivalente = false;
                state.sucess = false;
                state.error = true;
                state.message = action.error.message;
            })
            .addCase(addItems.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;

                let finded = state.items.find(item => item.id === action.payload.id)

                finded ? (
                    state.sucessItem = true,
                    state.sucess = false,
                    state.message = 'O produto já foi adicionado!',
                    state.error = true
                   
                ) : (
                    
                    state.items.push(action.payload),
                    state.message = 'Produto adicionado!',
                    state.sucess = true,
                    state.sucessItem = true,
                    state.error = false
                )

            })
            .addCase(updateItem.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.items = state.items.map(item => item.id === action.payload.id ? action.payload : item)

            })
            .addCase(getItemById.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.item = state.items.find(item => item.id === action.payload)

            })
            .addCase(deleteItem.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.items = state.items.filter(item => item.id !== action.payload)
            })
            .addCase(itemsCloneAndEdit.fulfilled, (state, action) => {
                state.loading = false;
                state.sucess = true;
                state.error = null;
                state.items = action.payload;
            })
    }
})


export const { resetMessageProduto, resetItemProduto, resetProdutoEquivalentes, resetProdutos } = produtoSlice.actions
export default produtoSlice.reducer