
const formatCurrency = (value) => {
  return (typeof value === 'number') ? value.toFixed(2) : '0.00';
};

export const generatePedidoHTML = (listaPedidos, incluirItens = 'nao') => {
  let totalGeral = 0;

  //console.log('LISTA PEDIDOS REL', listaPedidos)

  if (!Array.isArray(listaPedidos)) {
    console.error("Erro: listaPedidos não é um array!");
    return "";
  }


  const rows = listaPedidos.map((pedido, index) => {



    if (!pedido) {
      console.error(`Erro: Pedido na posição ${index} está indefinido.`);
      return "";
    }



    let itensHTML = '';
    let totalPedido = 0;

    let itensRel; 

    if (pedido.itensPedido && pedido.itensPedido.length > 0) {
      itensRel = pedido.itensPedido;
      //console.log('IF RELATORIO', itensRel);
    } else {
      itensRel = pedido.itens;
    };

    if (incluirItens === 'sim' && Array.isArray(itensRel)) {
      itensHTML += itensRel.map((item, itemIndex) => {
        if(!item) {
          console.error(`Erro: Item na posição ${itemIndex} está indefinido para o pedido ${pedido.numero}.`);
          return "";
        }


        totalPedido += item.valorTotal;
        return `
          <tr>
            <td>${item.descricaoProduto}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${formatCurrency(item.valorUnitario)}</td>
            <td>R$ ${formatCurrency(item.valorDescontoItens)}</td>
            <td>R$ ${formatCurrency(item.valorTotal)}</td>
          </tr>
        `;
      }).join('');

      totalGeral += totalPedido;

      return `
        <tr>
          <td colspan="5">
            <strong class='clienteNota'>
              Nº ${pedido.numero}
              - ${new Date(pedido.dataVenda).toLocaleDateString()}
              - ${pedido.nomeCliente}
            </strong>
          </td>
        </tr>
        ${itensHTML ? `
          <tr>
            <th></th>
            <th>Qtd</th>
            <th>Valor Un.</th>
            <th>Desconto</th>
            <th>Total</th>
          </tr>
          ` : '' }
          ${itensHTML}
        <tr>
          <td colspan="4" style="text-align: right;">
            <strong>Total do Pedido:</strong>
          </td>
          <td>
            <strong>R$ ${formatCurrency(totalPedido)}</strong>
          </td>
        </tr>
      `;
    } else {
      totalGeral += pedido.valorTotal;
      return `
        <tr>
          <td>${pedido.numero}</td>
          <td>${pedido.colaboradorPessoaNomeFantasia}</td>
          <td>${pedido.nomeCliente.length > 30 ? pedido.nomeCliente.substring(0, 30) + '...' : pedido.nomeCliente}</td>
          <td>${new Date(pedido.dataVenda).toLocaleDateString()}</td>
          <td>R$ ${formatCurrency(pedido.valorTotal)}</td>
        </tr>
      `;
    }
  }).join('');

  const htmlContent = `
    <html>
      <head>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          td {
            border-bottom: 0.5px solid black;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f2f2f2;
            text-align: left;
          }
          tr {
            border-bottom: 2px solid black;
          }
          .clienteNota {
            word-spacing: 6px;
          }
          .total-geral-container {
            display: table;
            margin-left: auto;
            margin-top: 20px;
          }
          .total-geral td {
            padding: 8px;
            font-weight: bold;
            text-align: right;
          }
          @media print {
            .total-geral {
              page-break-inside: avoid;
              page-break-after: auto;
            }
          }
        </style>
      </head>
      <body>
        <h2>Relatório de Pedidos</h2>
        <table>
          <thead>
            <tr>
              ${incluirItens === 'sim' ? `
                <th class='cliente'>NºVenda - Data - Cliente</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>` : `
                <th>Nº Venda</th>
                <th style="text-align: center;">Vendedor</th>
                <th style="text-align: center;">Cliente</th>
                <th style="text-align: center;">Data</th>
                <th>Valor Total</th>`
              }
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
        <div class="total-geral-container">
          <table class="total-geral">
            <tr>
              <td colspan="4" style="text-align: right;">
                <strong>Total Geral:</strong>
              </td>
              <td style="text-align: right; padding-left: 10px;">
                <strong>R$ ${totalGeral.toFixed(2)}</strong>
              </td>
            </tr>
          </table>
        </div>
      </body>
    </html>
  `;
  return htmlContent;
};
