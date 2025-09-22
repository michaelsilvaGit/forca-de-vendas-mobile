
const formatCurrency = (value) => {
  const num = parseFloat(value); // Converte strings numéricas para número
  return !isNaN(num) ? num.toFixed(2) : '0.00';
};

export const generateSavePedido = (listaPedidos, incluirItens = 'nao') => {
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
        if (!item) {
          console.error(`Erro: Item na posição ${itemIndex} está indefinido para o pedido ${pedido.numero}.`);
          return "";
        }


        totalPedido += item.valorTotal;
        return `
            <tr>
              <td>${item.codigoProduto}</td>
              <td>${item.codigoReferencia || ''}</td>
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
                ${pedido.nomeCliente}
              </strong>
            </td>
          </tr>
          ${itensHTML ? `
            <tr>
              <th>Código</th>
              <th>Catálogo</th>
              <th style="text-align: center;">Descrição</th>
              <th>Qtd</th>
              <th>Valor Un.</th>
              <th>Desconto</th>
              <th>Total</th>
            </tr>
            ` : ''}
            ${itensHTML}
            ${pedido.observacao ? `
                <tr>
                    <td colspan="6" style="padding-top: 10px;">
                        <strong>Observações:</strong> ${pedido.observacao}
                    </td>
                </tr>
            ` : `
                <tr>
                   <td colspan="6" style="padding-top: 10px;">
                       <strong>Observações:</strong>
                   </td>
                </tr>
            `}
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
          ${pedido.observacao ? `
               <tr>
                   <td colspan="5" style="padding-top: 10px;">
                       <strong>Observações:</strong> ${pedido.observacao || 'N/A'}
                   </td>
               </tr>
          ` : ''}
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
              margin-left: auto;
              margin-top: 20px;
              display: flex;
              flex-direction: column;
              width: 100%;
              padding: 0 10px;
            }
            .linha-1,
            .linha-2 {
              display: flex;
              justify-content: flex-start;
              width: 100%;
            }
            .linha-1 div,
            .linha-2 div {
              margin-right: 10px;
              flex: 1;
            }
            .linha-1 {
              margin-bottom: 10px;
            }
            .linha-2 div {
              display: flex;
              align-items: flex-start;
            }
            @media print {
              .total-geral {
                page-break-inside: avoid;
                page-break-after: auto;
              }
            }
            .header {
                text-align: center;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .header-title {
                flex: 1;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .header-info {
                font-size: 16px;
                margin-right: 60px;
                text-align: left;
            }
          </style>
        </head>
          <div class="header">
                <h2 class="header-title">Pedido</h2>
                  <div class="header-info">
                    <strong>Nº Pedido:</strong> ${listaPedidos[0]?.numero || 'N/A'}<br>
                    <strong>Emissão:</strong> ${new Date(listaPedidos[0]?.dataVenda || Date.now()).toLocaleDateString()}<br>
                    <strong>Loja:</strong> ${listaPedidos[0]?.loja || ''}
                    
                  </div>
          </div>
          <table>
            <thead>
              <tr>
                ${incluirItens === 'sim' ? `
                  <th class='cliente'>Cliente</th>
                  <th></th>
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
              <div class="linha-1">
                 <div><strong>Transportadora: </strong>${listaPedidos[0]?.transportadora || 'Padrão'}</div>
                 <div><strong>Prazo: </strong> ${listaPedidos[0]?.prazo || 'N/A'}</div>
              </div>

              <div class="linha-2">
                <div><strong>Desconto: </strong> R$ ${formatCurrency(listaPedidos[0]?.valorDescontoItens || '0,00')}</div>
                <div><strong>Valor Bruto: </strong> R$ ${formatCurrency(listaPedidos[0]?.totalBruto)}</div>
                <div><strong>Total:</strong> R$ ${totalGeral.toFixed(2)}</div>
              </div>
          </div>
        </body>
      </html>
    `;
  return htmlContent;
};
