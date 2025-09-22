import { openDb } from "../openDb";
import pedidoService from "../../services/pedidoService";


// Escreve chave na meta
const setMeta = async (key, value) => {
    const db = await openDb();
    await db.executeSql(`INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)`, [key, value]);
}

// Adapta o DTO da API para as colunas locais (pedido.*)
function mapApiDtoToLocal(pedidoProp) {

    const nowIso = new Date().toISOString();

    const id = pedidoProp.id ?? pedidoProp.numero; // use id do backend, ou número como fallback

    return {
        id: pedidoProp.id,
        numero: pedidoProp.numero,
        cliente_nome: pedidoProp.nomeCliente ?? null,
        data_venda: pedidoProp.dataVenda ?? null,
        data_transacao: pedidoProp.dataTransacao ?? null,
        data_liberacao: pedidoProp.dataLiberacao ?? null,
        data_sincronizacao: pedidoProp.dataSincronizado ?? null,
        data_faturamento: pedidoProp.dataFaturamento ?? null,
        tranportadora_nome: pedidoProp.transportadoraPessoaNomeFantasia ?? null,
        loja_nome: pedidoProp.lojaPessoaNomeFantasia ?? null,
        estado_venda: pedidoProp.estadoVenda ?? null,
        sincronizado: pedidoProp.sincronizado ?? null,
        codigo_interno_cliente: pedidoProp.codigoInternoCliente ?? null,
        status: pedidoProp.status ?? 'DESCONHECIDO',
        total: pedidoProp.valorTotal ?? 0,
        updated_at: pedidoProp.dataFaturamento,
        created_at: pedidoProp.dataTransacao,
    };
}


async function upsertPedidos(pedidosPage) {
    const db = await openDb();
    await db.transaction((tx) => {
        for (const p of pedidosPage) {
            const dbProp = mapApiDtoToLocal(p);
            tx.executeSql(
                `INSERT OR REPLACE INTO pedido
            (id, numero, cliente_nome, data_venda, data_transacao, data_liberacao, data_sincronizacao,
             data_faturamento, tranportadora_nome, loja_nome, estado_venda, sincronizado,
             codigo_interno_cliente, status, total, updated_at, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    dbProp.id,
                    dbProp.numero,
                    dbProp.cliente_nome,
                    dbProp.data_venda,
                    dbProp.data_transacao,
                    dbProp.data_liberacao,
                    dbProp.data_sincronizacao,
                    dbProp.data_faturamento,
                    dbProp.tranportadora_nome,
                    dbProp.loja_nome,
                    dbProp.estado_venda,
                    dbProp.sincronizado,
                    dbProp.codigo_interno_cliente,
                    dbProp.status,
                    dbProp.total,
                    dbProp.updated_at,
                    dbProp.created_at,
                ]
            );
        }
    });
}


export const seedPedidos = async(data, config) => {

    if (!config?.url) throw new Error('seedPedidosOneShot: config.url é obrigatório');
  
    const items = await pedidoService.getPedidos(data, config); 

    if (!items || items.length === 0) {
        console.log('[Seed] nada recebido; lastSync mantido');
        return;
    }
  
    await upsertPedidos(items);
  
    let maiorUpdatedAt = null;
    for (const p of items) {
      const m = mapApiDtoToLocal(p);
      if (m.updated_at && (!maiorUpdatedAt || m.updated_at > maiorUpdatedAt)) {
        maiorUpdatedAt = m.updated_at;
      }
    }

    const lastSync = maiorUpdatedAt || new Date().toISOString();
    await setMeta('lastSync.pedido', lastSync);
  
    console.log(`[SeedOneShot] Inseridos/atualizado: ${items.length}. lastSync.pedido=${lastSync}`);
}