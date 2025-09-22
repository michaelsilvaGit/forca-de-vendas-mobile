import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clienteService from "../services/clienteService";


const initialState = {
    clientes: [],
    cliente: '',
    clienteCloneAndEdit: '',
    clienteCnpj: '',
    error: false,
    sucess: false,
    loading: false,
    message: '',
    messageErrorCliente: ''
}





//Pegar todos os clientes
export const getClients = createAsyncThunk(
    'cliente/getAll',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await clienteService.getClients(data, config);
        return res.data.content;

    }
)

//Pegar clientes por Id
export const getClientsById = createAsyncThunk(
    'cliente/getById',
    async (data, thunkAPI) => {
        return data
    }
)

//Salvar cliente
export const saveCliente = createAsyncThunk(
    'cliente/saveCliente',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await clienteService.saveClients(data, config);
        return res.data.message;
    }
)

//Encontrar CNPJ CLIENTE
export const findCnpjCliente = createAsyncThunk(
    'cliente/findCnpj',
    async (data, thunkAPI) => {
        const res = await clienteService.findClients(data);
        return res.data;
    }
)

//Cliente para clonar ou editar
export const clietCloneAndEdit = createAsyncThunk(
    'cliente/clietCloneAndEdit',
    async (data, thunkAPI) => {
        return data;
    }
)




export const clienteSlice = createSlice({
    name: 'cliente',
    initialState,
    reducers: {
        resetMessageCliente: (state) => {
            state.cliente = '';
            state.clienteCloneAndEdit = '';
            state.loading = false;
            state.error = false;
            state.sucess = false;
            state.message = '';
        },

        resetClienteCloneAndEdit: (state) => {
            state.clienteCloneAndEdit = '';
        },

        resetCliente: (state) => {
            state.cliente = '';
        },
    },

    extraReducers: (builder) => {
        builder
        .addCase(getClients.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
            state.messageErrorCliente = '';
        })
        .addCase(getClients.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErrorCliente = '';
            state.clientes = action.payload;      
        })
        .addCase(getClients.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = true;
            state.messageErrorCliente = action.error.message;
        })
        .addCase(getClientsById.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = null;
            state.messageErrorCliente = false;
            state.cliente = state.clientes.find(item => item.id === action.payload.id)
        })
        .addCase(saveCliente.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(saveCliente.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErrorCliente = false;
            state.message = 'Cliente salvo com sucesso!';
 
        })
        .addCase(saveCliente.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.messageErrorCliente = 'Algo de errado aconteceu!';
        })
        .addCase(findCnpjCliente.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(findCnpjCliente.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErrorCliente = false;
            state.clienteCnpj = action.payload;
 
        })
        .addCase(findCnpjCliente.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.messageErrorCliente = 'Algo de errado aconteceu!';
        })
        .addCase(clietCloneAndEdit.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErrorCliente = false;
            state.clienteCloneAndEdit = action.payload;
 
        })

    }
})


export const { resetMessageCliente, resetClienteCloneAndEdit, resetCliente } = clienteSlice.actions
export default clienteSlice.reducer