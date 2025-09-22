import { validarChave } from "../slices/validacaoSlice";



const validarChaveAcesso = (dispatch) => {
    
    dispatch(validarChave());

}



export default validarChaveAcesso;