import axios from "axios";


const api = 'apiForcaVenda/loja';


const getLoja = async (data, config) => {
    
    try {

        const res = await axios.post(config.url + api + '/searchPersonalizado', data, config.header);

        return res;
        
    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}


lojaService = {
    getLoja,
}

export default lojaService;