
import axios from "axios";
import { limitTimeRequisicao } from "../enum";



const api = 'app/aplicativo-usuario';


const validarChave = async(config) => {

    const source = axios.CancelToken.source();

    const timeout = setTimeout(() => {
        source.cancel('O servidor demorou para responder!');
    }, limitTimeRequisicao.time); 

    const data = {
        chaveAtivacao: config.chaveAtivacao,
    }

    //console.log('ENVIO 1: ' + 'URL1 ' + config.url + ' DATA ' + config.chaveAtivacao, config.header);
    try {

        const res1 = await axios.post(config.url + api + '/findByChaveAtivacao', JSON.stringify(data), {
            ...config.header,
            cancelToken: source.token,
        });

        const data2 = {
            chaveAtivacao: res1.data.chaveAtivacao,
            imei: config.imei
        }

        const header2 = { headers : {'tenant': res1.data.tenant,
                                     'Content-Type': 'application/json',
                        }}

        //console.log('RETORNO RSPOSTA 1: ', res1.data);
        //console.log('ENVIO 2: ' + 'URL2 ' + res1.data.urlRemota + ' DATA ' + res1.data.chaveAtivacao, config.imei, header2);


        const res2 = await axios.post(res1.data.urlRemota + api + '/validarChaveAtivacao', JSON.stringify(data2), {
            ...header2,
            cancelToken: source.token,
        });


        clearTimeout(timeout);
        
        if (res2 && res2.data) {
            //console.log('RETORNO RSPOSTA 2: ', res2.data);
            return res2;
        } else {
            throw new Error("Algo deu errado. Tente novamente resposta!");
        }     



    } catch (error) {
        clearTimeout(timeout);

        if (axios.isCancel(error)) {
            throw new Error(error.message);
        }else if(error.message === 'Network Error') {
            throw new Error(error.message = 'Sem conexão!');
        }else if(error.response && error.response.data){
            throw (error.response.data); 
        }else{
            throw new Error(error.message = 'Algo deu errado. Tente novamente!');
        }
    }

}


validacaoService = {
    validarChave
}


export default validacaoService;