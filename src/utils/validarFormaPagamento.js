import numberFormatBRL from "./numberFormatBRL";


const validarFormaPagamento = (listaPrazos, pedidoModel) => {

    const prazo = listaPrazos && listaPrazos.find((prazo) => prazo.id === pedidoModel.prazoId);

    const validado =  pedidoModel.total >= prazo.ate;
    const valorPrazo = numberFormatBRL(prazo.ate);
    const nomePrazo = prazo.name.split(" | ")[0];

    return {validado, nomePrazo, valorPrazo};
}


export default validarFormaPagamento;