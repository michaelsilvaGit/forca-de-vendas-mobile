import axios from "axios";


const api = 'apiForcaVenda/transportadora';


const getTransportadora = async (data, config) => {
    
    try {

        const res = await axios.post(config.url + api + '/searchPersonalizado', data, config.header);
        //console.log('RETORNO: ', res.data)
        return res;
        
    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}

transportadoraService = {
    getTransportadora,
}

export default transportadoraService;