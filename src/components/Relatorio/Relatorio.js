import React, { useState } from 'react';
import { TouchableOpacity, View, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPrint from 'react-native-print';
import { RadioButton as PaperRadioButton, Text as PaperText } from 'react-native-paper';
import Styles from './Styles';
import { globalStyles } from '../../globalStyles';
import { generatePedidoHTML } from './RelatorioPedidosUtils';

export default RelatorioPedidos = ({ pedidos, pedidoIndividual  }) => {


   const [incluirItens, setIncluirItens] = useState('nao');
   const [tipoPedido, setTipoPedido] = useState('todos');

  // const dispatch = useDispatch();

   const pedidosAbertos = pedidos.filter(pedido => pedido.sincronizado === 'N'); // Pedidos ABERTOS

   const pedidosSincronizados = pedidos.filter(pedido => pedido.sincronizado === 'S'); // Pedidos SINCRONIZADOS

  // // GERAR O HTML DOS PEDIDOS
  //  const generateHTML = (listaPedidos) => {

  //   const pedidosParaGerar = pedidoIndividual ? [pedidoIndividual] : pedidos; // Se for feito pedido novo gera o pdf individual, se não, lista os pedidos.

  //   let totalGeral = 0;

  //   const rows = pedidosParaGerar.map((pedido, index) => {
  //     let itensHTML = '';
  //     let totalPedido = 0;


  //     if (incluirItens === 'sim') {

  //       itensHTML = `
  //       <tr>
  //         <th></th>
  //         <th>Qtd</th>
  //         <th>Valor Un.</th>
  //         <th>Desconto</th>
  //         <th>Total</th>
  //       </tr>
  //     `;

  //       itensHTML = pedido.itens.map((item) => {
  //         totalPedido += item.valorTotal;
  //         return `
  //         <tr>
  //          <td>${item.descricaoProduto}</td>
  //          <td>${item.quantidade}</td>
  //          <td>R$ ${item.valorUnitario.toFixed(2)}</td>
  //          <td>R$ ${item.valorDescontoItens.toFixed(2)}</td>
  //          <td>R$ ${item.valorTotal.toFixed(2)}</td>
  //        </tr>
  //       `;
  //       }).join('');

  //       totalGeral += totalPedido;

  //       return `
  //         <tr>
  //           <td colspan="5">
  //             <strong class='clienteNota'>
  //               Nº ${pedido.numero}
  //               - ${new Date(pedido.dataVenda).toLocaleDateString()}
  //               - ${pedido.nomeCliente.length > 30 ? pedido.nomeCliente.substring(0, 30) + '...' : pedido.nomeCliente}
  //             </strong>
  //           </td>
  //         </tr>
  //         ${itensHTML}
  //           <tr>
  //             <td colspan="4" style="text-align: right;">
  //               <strong>Total do Pedido:</strong>
  //             </td>
  //             <td>
  //               <strong>R$ ${totalPedido.toFixed(2)}</strong>
  //             </td>
  //           </tr>
  //         `;
  //     } else {

  //       totalGeral += pedido.valorTotal;
  //       return `
  //           <tr>
  //             <td>${pedido.numero}</td>
  //             <td>${pedido.colaboradorPessoaNomeFantasia}</td>
  //             <td>${pedido.nomeCliente.length > 30 ? pedido.nomeCliente.substring(0, 30) + '...' : pedido.nomeCliente}</td>
  //             <td>${new Date(pedido.dataVenda).toLocaleDateString()}</td>
  //             <td>R$ ${pedido.valorTotal.toFixed(2)}</td>
  //           </tr>
  //         `;

  //     }
  //   }).join('');


  //   const htmlContent = `
  //   <html>
  //     <head>
  //       <style>
  //         table {
  //           width: 100%;
  //           border-collapse: collapse;
  //         }
  //         td {
  //           border-bottom: 0.5px solid black;
  //           padding: 8px;
  //           text-align: left;
  //         }
  //         th {

  //           background-color: #f2f2f2;
  //           text-align: left;
  //         }
  //         tr {
  //           border-bottom: 2px solid black;
  //         }
  //         .cliente {
  //           padding: 8px;
  //           margin: 10px;
  //           word-spacing: 15px;
  //         }
  //         .clienteNota {
  //           word-spacing: 6px;
  //         }
  //         .total-geral-container {
  //           display: table;
  //           margin-left: auto;
  //           margin-top: 20px;
  //         }
  //         .total-geral {
  //           page-break-before: avoid;
  //         }
  //         .total-geral tr {
  //           border: none;
  //         }
  //         .total-geral td {
  //           padding: 8px;
  //           font-weight: bold;
  //           text-align: right;
  //           border: none;
  //         }

  //         @media print {
  //           .total-geral {
  //             page-break-inside: avoid;
  //             page-break-after: auto;

  //           }
  //         }

  //       </style>
  //     </head>
  //     <body>
  //       <h2>Relatório de Pedidos</h2>
  //       <table>
  //         <thead>
  //           <tr>
  //            ${incluirItens === 'sim' ? `
  //               <th class='cliente'>NºVenda - Data - Cliente</th>
  //               <th>Qtd</th>
  //               <th>Valor Un.</th>
  //               <th>Desconto</th>
  //               <th>Valor Total</th>` : `
  //               <th>Nº Venda</th>
  //               <th style="text-align: center;">Vendedor</th>
  //               <th style="text-align: center;">Cliente</th>
  //               <th style="text-align: center;">Data</th>
  //               <th>Valor Total</th>`
  //     }
  //           </tr>
  //         </thead>
  //         <tbody>
  //           ${rows}
  //         </tbody>
  //         </table>
  //         <div class="total-geral-container">
  //           <table class="total-geral">
  //             <tr>
  //               <td colspan = "4" style="text-align: right;"> 
  //                 <strong>Total Geral:</strong>
  //               </td>
  //               <td style="text-align: right; padding-left: 10px;">
  //                 <strong>R$ ${totalGeral.toFixed(2)}</strong>
  //               </td>
  //             </tr>
  //           </table>
  //         </div>
  //     </body>
  //   </html>
  // `;
  //   return htmlContent;
  // };




  // // IMPRIMIR PDF
  // const handleImprimirPDF = async () => {

  //   //console.log('Pedidos abertos:', pedidosAbertos);

  //   let listaPedidos;

  //   switch (tipoPedido) {
  //     case 'aberto':
  //       listaPedidos = pedidosAbertos;
  //       break;
    
  //     case 'sincronizado':
  //       listaPedidos = pedidosSincronizados;
  //       break;

  //     default:
  //       listaPedidos = pedidos;
  //   }

  //   if (listaPedidos.length > 0) {
  //     const htmlContent = generateHTML(listaPedidos);
  //     try {
  //       await RNPrint.print({ html: htmlContent });
  //     } catch (error) {
  //       console.error('Erro ao gerar PDF:', error);
  //     }
  //   } else {
  //     Alert.alert('Não há pedidos concluídos para gerar o PDF.');
  //   }
  // };


  const handleImprimirPDF = async () => {
    const listaPedidos = tipoPedido === 'aberto' ? pedidosAbertos : tipoPedido === 'sincronizado' ? pedidosSincronizados : pedidos;
    const htmlContent = generatePedidoHTML(listaPedidos, incluirItens);
    await RNPrint.print({ html: htmlContent });
  };





  //console.log('Pedidos abertos:', pedidosAbertos);

  return (

    <>
      <View style={{ width: '100%', backgroundColor: '#fcfcfc', paddingHorizontal: 8, paddingTop: 8, paddingBottom: 4 }}>
        <PaperRadioButton.Group onValueChange={itens => setIncluirItens(itens)} value={incluirItens}>
          <View style={Styles.itensContainer}>
            <Text style={globalStyles.text}>Adicionar Itens:</Text>
            <View style={Styles.radioButton}>
              <PaperRadioButton color='#2eaed6' value="sim" />
              <PaperText style={{ fontSize: 15 }}>Sim</PaperText>
            </View>
            <View style={Styles.radioButton}>
              <PaperRadioButton color='#2eaed6' value="nao" />
              <PaperText style={{ fontSize: 15 }}>Não</PaperText>
            </View>
          </View>
        </PaperRadioButton.Group>


        <TouchableOpacity onPress={() => handleImprimirPDF(pedidosAbertos)} style={Styles.pdfButton}>
          <Icon name="file-pdf-o" size={30} color="red" />
          <Text style={[globalStyles.text, { marginLeft: 7, fontWeight: '500' }]}>Gerar PDF</Text>
        </TouchableOpacity>

      </View>
    </>
  );
}

