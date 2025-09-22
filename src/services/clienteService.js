import axios from "axios";
import { limitTimeRequisicao } from "../enum";

const api = 'apiForcaVenda/clientes';





const getClients = async(data, config) => {

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

const saveClients = async (data, config) => {


    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 



    try {
        
        const res = await axios.post(config.url + api + '/saveCliente', JSON.stringify(data), {
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


const findClients = async (data) => {
    try {

        const res = await axios.get(`https://www.receitaws.com.br/v1/cnpj/${data}`);
        return res;

    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}



clienteService = {
    getClients,
    saveClients,
    findClients,
}


export default clienteService;