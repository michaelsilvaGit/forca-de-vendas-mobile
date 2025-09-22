import axios from "axios";



const api = 'apiForcaVenda/listaPreco';


const getListPrice = async(data, config) => {

    try {
        
        const res = await axios.post(config.url + api + '/searchPersonalizado', data, config.header);
    
        return res;
        
    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }

}



listaPrecoService = {
    getListPrice,

}


export default listaPrecoService;