
const MIG_001 = `
-- Metadados (k/v)
CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

-- Tabela Pedidos (mínimo para listagem)
CREATE TABLE IF NOT EXISTS pedido (
  id                     NUMERIC PRIMARY KEY,
  numero                 NUMERIC NOT NULL,
  cliente_nome           TEXT,
  data_venda             TEXT,
  data_transacao         TEXT,
  data_liberacao         TEXT,
  data_sincronizacao     TEXT,
  data_faturamento       TEXT,
  tranportadora_nome     TEXT,
  loja_nome              TEXT,
  estado_venda           TEXT,
  sincronizado           TEXT,
  codigo_interno_cliente NUMERIC NOT NULL,
  status                 TEXT NOT NULL,
  total                  NUMERIC NOT NULL DEFAULT 0,
  updated_at             TEXT,
  created_at             TEXT
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_pedido_updated_at  ON pedido (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_pedido_status      ON pedido (status);

-- Inicializa controles
INSERT OR REPLACE INTO meta (key, value) VALUES ('schema_version', '1');
INSERT OR REPLACE INTO meta (key, value) VALUES ('lastSync.pedido', '1970-01-01T00:00:00.000Z');
`;

export default MIG_001;