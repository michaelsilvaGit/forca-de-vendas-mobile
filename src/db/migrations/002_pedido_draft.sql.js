

const MIG_002 = `
CREATE TABLE IF NOT EXISTS pedido_draft (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  form_json   TEXT NOT NULL,                      -- estado completo do formulário em JSON
  created_at  TEXT NOT NULL,                      -- ISO 8601
  updated_at  TEXT NOT NULL                       -- ISO 8601
);

CREATE INDEX IF NOT EXISTS idx_pedido_draft_updated_at
  ON pedido_draft (updated_at DESC);
`;
export default MIG_002;