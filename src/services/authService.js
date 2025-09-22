import axios from "axios";
import { limitTimeRequisicao } from "../enum";


const api = '/auth';

//novo endpoint /loginAplicativo;


const login = async(data, config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time);

    options = {
        params: data,
        headers: config.header.headers
    };

    //console.log('ENVIO AUTH: ', config)


    try {
        
        const res = await axios.get(config.url + api + '/loginAplicativo', options);
        //console.log('RESPOSTA: ', res.data)

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

        }else if(error.message === 'Network Error') {

            //throw new Error(error.message = 'Verifique sua conexão com a internet!');

        }else if(error.response && error.response.data){

            throw (error.response.data);
            
        }else{

            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }

}




authService = {
    login
}


export default authService;