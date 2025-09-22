import { configureStore, isImmutableDefault } from "@reduxjs/toolkit"


import produtoReducer from './slices/produtoSlice'
import clienteReducer from './slices/clienteSlice'
import pedidoReducer from './slices/pedidoSlice'
import listaPrecoReducer  from './slices/listaPrecoSlice';
import formaPagamentoReducer from './slices/formaPagamentoSlice';
import comissaoPrestadorReducer from './slices/comissaoSlice';
import configuracaoReducer from "./slices/configuracaoSlice";
import marcaSlice from "./slices/marcaSlice";
import categoriaSlice from "./slices/categoriaSlice";
import authSlice from "./slices/authSlice";
import validacaoSlice from "./slices/validacaoSlice";
import transportadoraSlice from './slices/transportadoraSlice';
import lojaSlice  from "./slices/lojaSlice";
import duplicataSlice from "./slices/duplicataSlice";

const isDevelopment  = process.env.NODE_ENV === 'development';



export const store = configureStore({

    reducer: {
        produto: produtoReducer,
        cliente: clienteReducer,
        pedido: pedidoReducer,
        listaPreco: listaPrecoReducer,
        formaPagamento: formaPagamentoReducer,
        comissaoPrestador: comissaoPrestadorReducer,
        configuracao: configuracaoReducer,
        marca: marcaSlice,
        categoria: categoriaSlice,
        auth: authSlice,
        validacao: validacaoSlice,
        transportadora: transportadoraSlice,
        loja: lojaSlice,
        duplicata: duplicataSlice
    },

    middleware:  (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})