import axios from "axios";
import { limitTimeRequisicao } from "../enum";



const api = 'apiForcaVenda/pedidos';


const getPedidos = async (data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 


    try {

        const res = await axios.post(config.url + api + '/searchPersonalizado', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        if (res && res.data) {
            return res.data.content;
        } else {
            throw new Error("Algo deu errado. Tente novamente!");
        }

    } catch (error) {
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }

}

const getPedidosByIdClient = async (data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 

    try {

        const res = await axios.post(config.url + api + '/listByCliente', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        if (res && res.data) {
            return res;
        } else {
            throw new Error("Algo deu errado. Tente novamente!");
        }

    } catch (error) {
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }

}

const getPedidoById = async (data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 

    try {
        const res = await axios.post(config.url + api + '/listById', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        if (res && res.data) {
            return res;
        } else {
            throw new Error("Algo deu errado. Tente novamente!");
        }

    } catch (error) {
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }
}

const savePedido = async (data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time);

    try {

        const res = await axios.post(config.url + api + '/savePedido', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        if (res && res.data) {
            return res;
        } else {
            throw new Error("Algo deu errado. Tente novamente!");
        }

    } catch (error) {
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            console.log(error.message)
            throw new Error(error.message);          
        } else if(error.message === 'Network Error') {
            console.log(error.message)
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }

}


const getValorVendaMes = async (idVendedor, config) => {

    const source = axios.CancelToken.source();


    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 

    try {

        const res = await axios.post(config.url + api + '/listValorVendaMes', JSON.stringify(idVendedor), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        if (res && res.data) {
            
            return res;
        } else {
            throw new Error("Algo deu errado. Tente novamente!");
        }

    } catch (error) {
        console.log(error)
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }
}



const sincronizarPedido = async (idPedido, config) => {

    const source = axios.CancelToken.source();


    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 


    try {

        const res = await axios.put(config.url + api + '/sincronizacao/' + idPedido, {} ,  {
            ...config.header,
            cancelToken: source.token,
        });


        clearTimeout(timeout);
        if (res && res.data) {
            
            return res;
        } else {
            throw new Error("Algo deu errado retorna na resposta. Tente novamente!");
        }

    } catch (error) {
        console.log(error)
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }
}


const inativarPedido = async (idPedido, config) => {

    const source = axios.CancelToken.source();


    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 


    try {

        const res = await axios.put(config.url + api + '/inativar/' + idPedido, {} ,  {
            ...config.header,
            cancelToken: source.token,
        });


        clearTimeout(timeout);
        if (res && res.data) {
            
            return res;
        } else {
            throw new Error("Algo deu errado retorna na resposta. Tente novamente!");
        }

    } catch (error) {
        console.log(error)
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }
}





pedidoService = {
    getPedidos,
    getPedidosByIdClient,
    savePedido,
    getPedidoById,
    getValorVendaMes,
    sincronizarPedido,
    inativarPedido
}


export default pedidoService;