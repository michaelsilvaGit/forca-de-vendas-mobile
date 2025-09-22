import { useCallback, useEffect, useRef, useState } from "react";
import { createDraft, getDraft, saveDraft } from "../db/repository/pedidoRepositoryDraft";



// debounce simples
function useDebouncedCallback(fn, delay) {
    const t = useRef(null);
    return useCallback((...args) => {
        if (t.current) clearTimeout(t.current);
        t.current = setTimeout(() => fn(...args), delay);
    }, [fn, delay]);
}


/**
* Autosave de rascunho de pedido.
* - Se receber draftId, carrega; senão cria um novo com initialForm.
* - Salva automaticamente (debounce) quando `form` muda.
*/

export function usePedidoDraft({ draftId = null, initialForm = {}, autosaveMs = 600 } = {}) {

    const [id, setId] = useState(draftId);
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(true);

    const readyToSaveRef = useRef(false);
    const draftIdRef = useRef(draftId ?? null);   // id atual imediato (não depende de render)
    const createPromiseRef = useRef(null);

    //console.log('FORM RECEBIDO: ', initialForm)
    //console.log('--------------------------------------------')

    // cria ou carrega rascunho
    useEffect(() => {
        (async () => {
            setLoading(true);
            readyToSaveRef.current = false;

            if (draftId) {
                const found = await getDraft(draftId);
                console.log('Teve ID e buscou: ', found)
                console.log('ID ', found)
                console.log('--------------------------------------------')
                if (found) {
                    setId(found.id);
                    draftIdRef.current = found.id;
                    setForm({ ...initialForm, ...found.form }); // merge suave
                    console.log('Se econtrou setou nos estats: ')
                    console.log('ID ', found.id)
                    console.log('FORM ', found.form)
                    console.log('--------------------------------------------')
                } else {
                    //const created = await createDraft(initialForm);
                    setId(null);
                    draftIdRef.current = null;
                    setForm({ ...initialForm });
                    console.log('Se NÃO econtrou criou um novo: ')
                    console.log('ID ', id)
                    console.log('FORM ', form)
                    console.log('--------------------------------------------')
                }
            } else {
                //const created = await createDraft(initialForm);
                setId(null);
                draftIdRef.current = null;
                setForm({ ...initialForm });
                console.log('NÃO teve Id: ', draftId)
                console.log('nao faz nada')
                console.log('ID ', id)
                console.log('FORM ', form)
                console.log('--------------------------------------------')
            }
            setLoading(false);

            readyToSaveRef.current = true;
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [draftId]);


    // Garante que existe um draftId; cria se ainda não existir (no primeiro edit)
    const ensureDraftId = useCallback(async (seedForm) => {
        // Se já temos id (no ref), usa ele
        if (draftIdRef.current) return draftIdRef.current;

        // Se já tem criação em andamento, aguarda a mesma
        if (createPromiseRef.current) {
            return await createPromiseRef.current;
        }

        // Cria exatamente UMA vez
        createPromiseRef.current = (async () => {
            const created = await createDraft(seedForm ?? initialForm);
            draftIdRef.current = created.id;  // disponível imediatamente
            setId(created.id);                // agenda atualização de estado
            return created.id;
        })();

        try {
            return await createPromiseRef.current;
        } finally {
            createPromiseRef.current = null;  // libera para futuras chamadas
        }
    }, [initialForm]);

    // autosave (debounce)
    const debouncedSave = useDebouncedCallback(async (nextForm) => {
        if (!readyToSaveRef.current) return;
        const draftId = await ensureDraftId(nextForm);  // cria aqui só se necessário
        await saveDraft(draftId, nextForm);
        console.log('AUTOSAVE savando rascundo:')
        console.log('ID ', draftId)
        console.log('FORM ', nextForm)
        const retorno = await getDraft(draftId);
        console.log('DADOS SALVO NO BANCO: ', retorno)
        console.log('------------------------------------------')
    }, autosaveMs);

    // useEffect(() => {
    //     if (!loading && id) {
    //         debouncedSave(form, id);
    //     }
    // }, [form, id, loading, debouncedSave]);

    // helpers para a tela

    // Helpers — salvam APENAS quando o usuário altera algo
    const updateField = useCallback((field, value) => {
        setForm(prev => {
            if (prev[field] === value) return prev;         // nada mudou
            const next = { ...prev, [field]: value };
            debouncedSave(next);
            return next;
        });
    }, [debouncedSave]);

    //Adicionar Item pedido
    const addItem = useCallback((item) => {
        setForm(prev => {
            const next = { ...prev, itens: [...(prev.itens || []), item] };
            debouncedSave(next);
            return next;
        });
    }, [debouncedSave]);

    // Atualiza um item (ex.: mudar qtde, preco, descricao)
    const updateItemAt = useCallback((index, patch) => {
        setForm(prev => {
            const items = [...(prev.itens || [])];
            if (!items[index]) return prev;
            items[index] = { ...items[index], ...patch };
            const next = { ...prev, itens: items };
            debouncedSave(next);
            return next;
        });
    }, [debouncedSave]);

    //Sava ao remover item
    const removeItemAt = useCallback((index) => {
        setForm(prev => {
            const arr = [...(prev.itens || [])];
            if (index < 0 || index >= arr.length) return prev;
            arr.splice(index, 1);
            const next = { ...prev, itens: arr };
            debouncedSave(next);
            return next;
        });
    }, [debouncedSave]);

    // Setter “controlado” para casos em que você queira substituir o form inteiro
    const setFormDraft = useCallback((producer) => {
        setForm(prev => {
            const next = typeof producer === 'function' ? producer(prev) : producer;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            debouncedSave(next);
            return next;
        });
    }, [debouncedSave]);

    // Salvar imediatamente (fora do debounce), por ex. antes de enviar
    const saveNow = useCallback(async () => {
        if (!readyToSaveRef.current) return;
        if (!id) return;                      // não cria “de graça”
        await saveDraft(id, form);
    }, [id, form]);

    return {
        loading,
        draftId: id,
        form,
        setFormDraft,
        updateField,
        addItem,
        updateItemAt,
        removeItemAt,
        saveNow,
    };
}