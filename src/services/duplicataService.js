import axios from "axios";


const api = 'apiForcaVenda/parcelaReceber';


const getDuplicataByIdCliente = async (data, config) => {

    try {

        const res = await axios.post(config.url + api + '/searchByFavorecido', data, config.header);
        return res;
        
    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}

duplicataService = {
    getDuplicataByIdCliente,
}

export default duplicataService;