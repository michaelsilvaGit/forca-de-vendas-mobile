import { openDb } from "../openDb";




// Lista pedidos do SQLite (paginação + filtros opcionais)
export const listPedidos = async ({ limit = 20, offset = 0, status = null, search = null } = {}) => {

    const db = await openDb();

    let sql = `
      SELECT 
      id, 
      numero, 
      cliente_nome AS nomeCliente,
      data_venda AS dataVenda,
      data_transacao AS dataTransacao,
      data_liberacao AS dataLiberacao,
      data_sincronizacao AS dataSincronizado,
      data_faturamento AS dataFaturamento,
      tranportadora_nome AS transportadoraPessoaNomeFantasia,
      loja_nome AS lojaPessoaNomeFantasia,
      estado_venda AS estadoVenda,
      sincronizado, 
      codigo_interno_cliente AS codigoInternoCliente,
      status, 
      total AS valorTotal,
      updated_at,
      created_at 
      FROM pedido
    `;
    const where = [];
    const params = [];

    if (status) {
        where.push('status = ?');
        params.push(status);
    }
    if (search && search.trim()) {
        // busca por nome do cliente ou número do pedido
        where.push('(cliente_nome LIKE ? OR CAST(numero AS TEXT) LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
    }

    if (where.length) {
        sql += ' WHERE ' + where.join(' AND ') + ' ';
    }

    // Ordena por data mais “recente” conhecida
    sql += `
      ORDER BY data_venda DESC
      LIMIT ? OFFSET ?
    `;
    params.push(limit, offset);

    const [res] = await db.executeSql(sql, params);
    const out = [];
    for (let i = 0; i < res.rows.length; i++) out.push(res.rows.item(i));
    //console.log('DADOS TABELA PEDIDO: ', out)
    return out;
}


// Conta total (para paginação)
export const countPedidos = async ({ status = null, search = null } = {}) => {
    const db = await openDb();

    let sql = 'SELECT COUNT(*) AS total FROM pedido ';
    const where = [];
    const params = [];

    if (status) {
        where.push('status = ?');
        params.push(status);
    }
    if (search && search.trim()) {
        where.push('(cliente_nome LIKE ? OR CAST(numero AS TEXT) LIKE ?)');
        params.push(`%${search}%`, `%${search}%`);
    }

    if (where.length) {
        sql += 'WHERE ' + where.join(' AND ');
    }

    const [res] = await db.executeSql(sql, params);
    return res.rows.item(0).total;
}



export const countLocalPedidos = async() => {
    const db = await openDb();
    const [res] = await db.executeSql(`SELECT COUNT(*) AS total FROM pedido`);
    
    console.log('TOTAL DE REGISTROS: ', res.rows.item(0).total)
    return res.rows.item(0).total;
}




























//TABELA TESTE

// Seed de pedidos de teste (só roda se a tabela estiver vazia)
export async function seedPedidosTeste() {
    const db = await openDb();

    const [res] = await db.executeSql('SELECT COUNT(*) AS total FROM pedido');
    const total = res.rows.item(0).total;
    if (total > 0) {
        console.log('Seed de pedidos pulado: já existem registros.');
        return;
    }

    const now = new Date().toISOString();
    const pedidos = [
        {
            id: 1001,
            numero: 15,
            cliente_nome: 'JÃO LOCAL',
            data_venda: now,
            data_transacao: now,
            data_liberacao: now,
            data_sincronizacao: now,
            codigo_interno_cliente: 10,
            data_faturamento: now,
            tranportadora_nome: 'LOG LOCAL',
            loja_nome: 'SOPESADOS LOCAL',
            estado_venda: '3',
            sincronizado: 'N',
            status: 'A',
            total: 400,
            updated_at: now,
            created_at: now,
        },
        {
            id: 1002,
            numero: 16,
            cliente_nome: 'MARIA LOCAL',
            data_venda: now,
            data_transacao: now,
            data_liberacao: now,
            data_sincronizacao: now,
            codigo_interno_cliente: 11,
            data_faturamento: now,
            tranportadora_nome: 'LOG LOCAL',
            loja_nome: 'SOPESADOS LOCAL',
            estado_venda: '1',
            sincronizado: 'N',
            status: 'A',
            total: 500,
            updated_at: now,
            created_at: now,
        },
        {
            id: 1003,
            numero: 15,
            cliente_nome: 'PEDRO LOCAL',
            data_venda: now,
            data_transacao: now,
            data_liberacao: now,
            data_sincronizacao: now,
            codigo_interno_cliente: 13,
            data_faturamento: now,
            tranportadora_nome: 'LOG LOCAL',
            loja_nome: 'SOPESADOS LOCAL',
            estado_venda: '2',
            sincronizado: 'N',
            status: 'A',
            total: 600,
            updated_at: now,
            created_at: now,
        },
    ];

    // Transação sem async/await dentro do callback
    await db.transaction((tx) => {
        for (const p of pedidos) {
            tx.executeSql(
                `INSERT OR REPLACE INTO pedido
        (id, numero, cliente_nome, data_venda, data_transacao, data_liberacao, data_sincronizacao, data_faturamento, tranportadora_nome, loja_nome, estado_venda, sincronizado, codigo_interno_cliente, status, total, updated_at, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    p.id,
                    p.numero ?? null,
                    p.cliente_nome ?? null,
                    p.data_venda,
                    p.data_transacao,
                    p.data_liberacao,
                    p.data_sincronizacao,
                    p.data_faturamento,
                    p.tranportadora_nome,
                    p.loja_nome,
                    p.estado_venda,
                    p.sincronizado,
                    p.codigo_interno_cliente ?? null,
                    p.status ?? null,
                    p.total ?? null,
                    p.updated_at,
                    p.created_at,
                ]
            );
        }
    });

    console.log('Seed de pedidos inserido.');
}



export const clearPedidosTable = async () => {
    const db = await openDb();
    const [res] = await db.executeSql('DELETE FROM pedido');
    console.log('Registros apagados de "pedido":', res.rowsAffected);
}


export const resetLastSyncPedidos = async (value = '1970-01-01T00:00:00.000Z') => {
    const db = await openDb();
    await db.executeSql(
        `INSERT OR REPLACE INTO meta (key, value) VALUES ('lastSync.pedidos', ?)`,
        [value]
    );
    console.log('lastSync.pedidos atualizado para:', value);
}