import axios from "axios";
import { limitTimeRequisicao } from "../enum";


const api = 'apiForcaVenda/produto';



const getProducts = async(data, config) => {

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

const searchEquivalentes = async(data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 


    try {

        const res = await axios.post(config.url + api + '/produtoEquivalente', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        clearTimeout(timeout);
        return res;
        
    } catch (error) {
        clearTimeout(timeout);
        if (axios.isCancel(error)) {
            throw new Error(error.message);
            
        } else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Verifique sua conexão com a internet!');
        }
    }
}





produtoService = {
    getProducts,
    searchEquivalentes
}


export default produtoService;