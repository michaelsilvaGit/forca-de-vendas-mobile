import { openDb } from "../openDb";


//GUARDA O ID DO RASCUNHO PARA EDIT QUANDO TIVER
let currentDraftId = null;
let creationPromise = null;

export function getCurrentDraftId() {
    return currentDraftId;
}
export function setCurrentDraftId(id) {
    currentDraftId = id || null;
}
export function clearCurrentDraftId() {
    currentDraftId = null;
    console.log('Limpou o Id rascunho global. ')
}


// Garante um id: cria um rascunho SÓ na 1ª edição
export async function ensureDraftId(seedForm = {}) {

    if (currentDraftId) {
        console.log('EXISTE ID RASCUNHO: ', currentDraftId);
        return currentDraftId;
    }

    if (creationPromise) {
        return await creationPromise; // outras chamadas esperam a mesma criação
    }

    creationPromise = (async () => {
        console.log('CRIANDO UM NOVO!', seedForm)
        const created = await createDraft(seedForm);
        currentDraftId = created.id;
        return currentDraftId;
    })();

    try {
        return await creationPromise;
    } finally {
        creationPromise = null; // libera para usos futuros
    }
}



// Faz merge de campos e salva (ex.: {observacao: '...'})
export async function mergeAndSaveDraft(id, patch) {
    const db = await openDb(); // só pra garantir conexão aberta
    const existing = await getDraft(id);
    const base = existing?.form || {};
    const next = { ...base, ...patch };
    await saveDraft(id, next);
    return { next, id };
}

export async function addItemToDraft(id, item) {
    const existing = await getDraft(id);
    const items = Array.isArray(existing?.form?.itens) ? existing.form.itens.slice() : [];
    items.push(item);
    const next = { ...(existing?.form || {}), itens: items };
    await saveDraft(id, next);
    return next;
}

export async function updateItemInDraft(id, index, patch) {
    const draftId = Number(id);
    const itemId = index; // pode vir number ou string

    const existing = await getDraft(draftId);
    if (!existing) return {};

    const items = Array.isArray(existing.form?.itens) ? [...existing.form.itens] : [];
    // procura pelo campo "id" do item
    const idx = items.findIndex(it => String(it.id) === String(itemId));
    if (idx === -1) return existing.form || {};

    items[idx] = { ...items[idx], ...patch };

    const nextForm = { ...(existing.form || {}), itens: items };
    const res = await saveDraft(draftId, nextForm);
    const formSalvo = res?.draft?.form || nextForm;

    return { id, formSalvo };
}

export async function removeItemFromDraft(id, index) {
    const draftId = Number(id);          // id do rascunho (INTEGER autoincrement)
    const itemId = index;                // aqui é o ID do item

    const existing = await getDraft(draftId);
    if (!existing) return {};

    const items = Array.isArray(existing.form?.itens) ? [...existing.form.itens] : [];
    const idx = items.findIndex(it => String(it.id) === String(itemId));
    if (idx === -1) return existing.form || {};

    items.splice(idx, 1);

    const next = { ...(existing.form || {}), itens: items };
    await saveDraft(draftId, next);
    return next; // ou, se seu saveDraft retorna o draft salvo, retorne esse form
}

export async function clearItemsFromDraft(id) {
    const draftId = Number(id);
    const existing = await getDraft(draftId);
    console.log('ID RASCUNHO ITEMS APAGAR: ', draftId)
    console.log('RASCUNHO EXISTENTE: ', existing)
    if (!existing) return {};

    const nextForm = { ...(existing.form || {}), itens: [] }; // zera os itens
    const res = await saveDraft(draftId, nextForm);
    console.log('RETORNO: ', res?.draft?.form || nextForm)
    return res?.draft?.form || nextForm; // devolve o form salvo
}

export async function deleteDraftById(id) {
    const db = await openDb();
    const draftId = Number(id);
    const [res] = await db.executeSql(
        'DELETE FROM pedido_draft WHERE id = ?',
        [draftId]
    );
    console.log(`Deletou RASCUNHO ${id} DO BANCO`)
    return { ok: res.rowsAffected > 0, rowsAffected: res.rowsAffected };
}


// Lê um rascunho pelo ID (retorna { id, form } ou null)
export const getDraft = async (id) => {
    const db = await openDb();
    const [res] = await db.executeSql(
        `SELECT form_json FROM pedido_draft WHERE id = ?`,
        [id]
    );
    if (!res.rows.length) return null;

    return { id, form: JSON.parse(res.rows.item(0).form_json) };
}


// Atualiza o rascunho (preserva created_at); form é um objeto JS
export async function saveDraft(id, form) {
    const db = await openDb();
    const now = new Date().toISOString();

    // preserva created_at se já existir
    let createdAt = now;
    const [sel] = await db.executeSql(
        `SELECT created_at FROM pedido_draft WHERE id = ?`,
        [id]
    );
    if (sel.rows.length) createdAt = sel.rows.item(0).created_at;

    await db.executeSql(
        `INSERT OR REPLACE INTO pedido_draft (id, form_json, created_at, updated_at)
       VALUES (?, ?, ?, ?)`,
        [id, JSON.stringify(form), createdAt, now]
    );
}

// Cria um rascunho vazio (ou com valores iniciais) e retorna { id, form }
export async function createDraft(initialForm = {}) {
    const db = await openDb();
    const now = new Date().toISOString();
    const form = { ...initialForm };

    const [res] = await db.executeSql(
        `INSERT INTO pedido_draft (form_json, created_at, updated_at)
       VALUES (?, ?, ?)`,
        [JSON.stringify(form), now, now]
    );

    console.log('SANVANDO PRIMEIRO RASCUNHO!')
    const id = res.insertId;
    return { id, form };
}

export async function purgeOldDraftsLast30Days() {
    const db = await openDb();
    const [res] = await db.executeSql(
        `DELETE FROM pedido_draft
        WHERE datetime(created_at) < datetime('now','-1 month')`
    );
    return { ok: true, rowsAffected: res.rowsAffected };
}

// Lista rascunhos (mais recentes primeiro)
export async function listDrafts({ limit = 100, offset = 0 } = {}) {
    const db = await openDb();
    const [res] = await db.executeSql(
        `SELECT id, form_json, created_at, updated_at
         FROM pedido_draft
        ORDER BY datetime(updated_at) DESC
        LIMIT ? OFFSET ?`,
        [limit, offset]
    );
    const out = [];
    for (let i = 0; i < res.rows.length; i++) {
        const row = res.rows.item(i);
        out.push({
            id: row.id,
            created_at: row.created_at,
            updated_at: row.updated_at,
            form: JSON.parse(row.form_json),

        });
    }

    return out;
}













//UTILITARIO
export const clearPedidosDraftTable = async () => {
    const db = await openDb();
    const [res] = await db.executeSql('DELETE FROM pedido_draft');
    console.log('Registros apagados de "pedidodraft":', res.rowsAffected);
}