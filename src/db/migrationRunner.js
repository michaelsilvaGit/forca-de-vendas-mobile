import MIG_001 from './migrations/001_pedido.sql';
import MIG_002 from './migrations/002_pedido_draft.sql';
import { openDb } from './openDb';


// Lista de migrations em ordem
const MIGRATIONS = [
    {id: 1, sql: MIG_001},
    {id: 2, sql: MIG_002},
]

// Executa todas as migrations pendentes
export const runMigrations = async () => {

    const db = await openDb();

    // Garante tabela meta para controlar versão
    await db.executeSql(`
        CREATE TABLE IF NOT EXISTS meta (
          key   TEXT PRIMARY KEY,
          value TEXT NOT NULL
        );
    `);

    // Lê versão atual
    let currentVersion = 0;
    try {
        const [res] = await db.executeSql(`SELECT value FROM meta WHERE key = 'schema_version'`);
        if (res.rows.length) currentVersion = parseInt(res.rows.item(0).value, 10) || 0;
    } catch (_) {
        currentVersion = 0;
    }

    // Aplica pendentes
    for (const mig of MIGRATIONS) {
        if (mig.id > currentVersion) {
            await applySql(db, mig.sql);
            await db.executeSql(
                `INSERT OR REPLACE INTO meta (key, value) VALUES ('schema_version', ?);`,
                [String(mig.id)]
            );
        }
    }

    console.log('Atualizando tabelas Sqlite!')
    return db; // opcional: devolver a conexão já migrada

}


// Aplica um blob de SQL (múltiplos statements) com segurança
 const applySql = async(db, sqlBlob) => {
    const statements = splitSql(sqlBlob);
    if (!statements.length) return;

    await db.transaction((tx) => {
        for (const stmt of statements) {
            if (stmt) tx.executeSql(stmt);
        }
    });
}

// Remove comentários e quebra por ';'
const splitSql = (sql) => {
    // Remove comentários de linha '-- ...'
    const withoutComments = sql
        .split('\n')
        .map((line) => line.replace(/--.*$/g, '').trim())
        .filter((line) => line.length > 0)
        .join('\n');

    // Quebra por ';' preservando statements válidos
    return withoutComments
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
}


export const verifySchema = async() => {
    const db = await openDb();
  
    // Tabelas criadas?
    const [tablesRes] = await db.executeSql(
      "SELECT name FROM sqlite_master WHERE type='table' AND name IN ('pedido_draft','meta')"
    );
    const tables = [];
    for (let i = 0; i < tablesRes.rows.length; i++) {
      tables.push(tablesRes.rows.item(i).name);
    }
  
    // Colunas da tabela pedidos
    const [colsRes] = await db.executeSql("PRAGMA table_info(pedido_draft)");
    const cols = [];
    for (let i = 0; i < colsRes.rows.length; i++) {
      cols.push({
        name: colsRes.rows.item(i).name,
        type: colsRes.rows.item(i).type,
        notnull: colsRes.rows.item(i).notnull,
        pk: colsRes.rows.item(i).pk,
      });
    }
  
    // Índices da tabela pedidos
    const [idxRes] = await db.executeSql("PRAGMA index_list(pedido_draft)");
    const idx = [];
    for (let i = 0; i < idxRes.rows.length; i++) {
      idx.push({
        name: idxRes.rows.item(i).name,
        unique: idxRes.rows.item(i).unique,
      });
    }
  
    // Versão do schema e lastSync
    const [vRes] = await db.executeSql("SELECT value FROM meta WHERE key='schema_version'");
    const schemaVersion = vRes.rows.length ? vRes.rows.item(0).value : '(não definido)';
  
    const [lsRes] = await db.executeSql("SELECT value FROM meta WHERE key='lastSync.pedido'");
    const lastSync = lsRes.rows.length ? lsRes.rows.item(0).value : '(não definido)';
  
    console.log('--- VERIFICAÇÃO DO SCHEMA ---');
    console.log('Tabelas encontradas:', tables);
    console.log('Colunas de pedidos:', cols);
    console.log('Índices de pedidos:', idx);
    console.log('schema_version:', schemaVersion);
    console.log('lastSync.pedidos:', lastSync);
    console.log('------------------------------');
  }