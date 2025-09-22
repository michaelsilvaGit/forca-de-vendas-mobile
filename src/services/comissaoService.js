import axios from "axios";

const api = 'apiForcaVenda/comissaoPrestador';



const getComissao = async (data, config) => {

    try {
        
        const res = await axios.post(config.url + api + '/searchPersonalizado', data, config.header);

        return res;

    } catch (error) {
        console.log('ERRO', error);
        throw error;
    }
}

const comissaoService = {
    getComissao,
};

export default comissaoService;
