

function formatarData(data) {

    const [diaMesAno, horaMinutoSegundo] = data.split(' ');
    const [dia, mes, ano] = diaMesAno.split('/');
  
    const dataObj = new Date(`${ano}-${mes}-${dia}T${horaMinutoSegundo}`);
  
    if (isNaN(dataObj.getTime())) {
      return 'Data inválida';
    }
  
    return `${dia}/${mes}/${ano}`;
  }

export default formatarData;