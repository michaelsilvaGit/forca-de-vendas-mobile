



const formatValueInputDesconto = (valor) => {

    const partes = valor && valor.toString().split('.');

    const inteiros = partes && partes.slice(0, -1);
    const centavos = partes && partes[partes.length - 1];

    const interiosFormatado = inteiros && inteiros.join('');
    
    return Number(`${interiosFormatado}.${centavos}`);
}




export default formatValueInputDesconto;