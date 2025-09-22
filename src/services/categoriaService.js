import axios from "axios";


const api = '/apiForcaVenda/categorias';


const getCategoria = async (data, config) => {

    try {

        const res = await axios.post(config.url + api + '/search', data, config.header);

        return res;
        
    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}

categoriaService = {
    getCategoria,
}

export default categoriaService;