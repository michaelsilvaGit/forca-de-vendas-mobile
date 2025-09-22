import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import pedidoService from "../services/pedidoService";
import { saveStorageValorVendaMes } from "../storage/pedidoStorage";
import { loadStorageValorVendaMes } from "../storage/pedidoStorage";





const initialState = {
    pedidos: [],
    pedido: '',
    pedidosCliente: '',
    quantidadePedidos: '',
    error: false,
    sucess: false,
    loading: false,
    message: false,
    messageErroPedido: '',
    totalVendasMes: '',
    numeroPedido: ''
}




//Pegar todos os pedidos
export const getAllPedidos = createAsyncThunk(
    'pedido/getAll',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await pedidoService.getPedidos(data, config);
        return res;
    
    }
)

//Buscar pedido por cliente
export const getPedidosByIdClient = createAsyncThunk(
    'pedido/getById',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await pedidoService.getPedidosByIdClient(data, config);
        return res.data.content;
    }
)

//Busca o pedido pelo Id para visualizar
export const getPedidoById = createAsyncThunk(
    'pedido/getPedidoById',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;
        
        const res = await pedidoService.getPedidoById(data, config);
        return res.data.content;
    }
)


//Salvar Pedido
export const savePedido = createAsyncThunk(
    'pedido/savePedido',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;

        const res = await pedidoService.savePedido(data, config);
       // console.log('SAVE PEDIDO', res.data);
        return res.data;
    }
)


//Pegar valores de vendas por mês
export const getValorVendaMes = createAsyncThunk(
    'pedido/getValorVendaMes',
    async (data, thunkAPI) => {

        const config = thunkAPI.getState().configuracao;
        const { dispatch } = thunkAPI;

        const res = await pedidoService.getValorVendaMes(data, config);

        await saveStorageValorVendaMes(res.data, dispatch);

        return res.data;
    }
)


export const loadValorVendaMesFromStorage = createAsyncThunk(
    'auth/loadValorVendaMesFromStorage',
    async (_, thunkApi) => {

        const loadedData = await loadStorageValorVendaMes();
        return loadedData;
    }
);

export const sincronizarPedido = createAsyncThunk(
    'auth/sincronizarPedido',
    async (data, thunkApi) => {

        const config = thunkApi.getState().configuracao;

        const res = await pedidoService.sincronizarPedido(data, config);
        
        console.log('RESPOSTA: ', res.data)

        return res.data;
    }
);

export const inativarPedido = createAsyncThunk(
    'auth/inativarPedio',
    async (data, thunkApi) => {

        const config = thunkApi.getState().configuracao;
        
        const res = await pedidoService.inativarPedido(data, config);
        
        console.log('RESPOSTA: ', res.data)

        return res.data;
    }
);







export const pedidoSlice = createSlice({
    name: 'pedido',
    initialState,
    reducers: {
        resetMessagePedido: (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
            state.message = false;
        },
        resetPedidos: (state) => {
            state.pedidos = []
        },
        resetPedidoCliente: (state) => {
            state.pedidosCliente = '';
        },
        resetVisualizarPedido: (state) => {
            state.pedido = '';
        },
        resetForRelatorioPedido: (state) => {
            state.numeroPedido = '';
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(getAllPedidos.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
            state.messageErroPedido = '';
        })
        .addCase(getAllPedidos.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErroPedido = false;
            state.pedidos = action.payload;
            state.quantidadePedidos = action.payload.totalElements;
            state.messageErroPedido = '';

        })
        .addCase(getAllPedidos.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = true;
            state.messageErroPedido = action.error.message;
        })
        .addCase(savePedido.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(savePedido.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErroPedido = false;
            state.numeroPedido = action.payload.numeroPedido;
            state.message = 'Pedido salvo com sucesso!';
        })
        .addCase(savePedido.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            state.sucess = false;
            state.messageErroPedido = action.error.message;
        })
        .addCase(getPedidosByIdClient.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(getPedidosByIdClient.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErroPedido = false;
            state.pedidosCliente = action.payload
        })
        .addCase(getPedidosByIdClient.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = true;
            state.messageErroPedido = action.error.message;
        })
        .addCase(getPedidoById.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(getPedidoById.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErroPedido = false;
            state.pedido = action.payload[0];
        })
        .addCase(getPedidoById.rejected, (state, action) => {
            state.loading = false;
            state.sucess = false;
            state.error = true;
            state.messageErroPedido = action.error.message;
        })
        .addCase(getValorVendaMes.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(getValorVendaMes.fulfilled, (state, action) => {
   
        })
        .addCase(loadValorVendaMesFromStorage.pending, (state) => {
            state.loading = true;
            state.error = false;
            state.sucess = false;
        })
        .addCase(loadValorVendaMesFromStorage.fulfilled, (state, action) => {
            state.loading = false;
            state.sucess = true;
            state.error = false;
            state.messageErroPedido = false;
            state.totalVendasMes = action.payload.valorVendaMes;

            console.log('carregou valor venda mês do storage!')
        })
        .addCase(sincronizarPedido.pending, (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        })
        .addCase(sincronizarPedido.fulfilled, (state, action) => {
            state.sucess = true;
            state.loading = false;
            state.error = false;
        })
        .addCase(inativarPedido.pending, (state) => {
            state.loading = false;
            state.error = false;
            state.sucess = false;
        })
        .addCase(inativarPedido.fulfilled, (state, action) => {
            state.sucess = true;
            state.loading = false;
            state.error = false;
        })
    }
})


export const { resetMessagePedido, resetPedidos, resetPedidoCliente, resetVisualizarPedido, resetForRelatorioPedido } = pedidoSlice.actions
export default pedidoSlice.reducer