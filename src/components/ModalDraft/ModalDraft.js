
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import ViewDraft from "../ViewDraft/ViewDraft";
import { listDrafts } from "../../db/repository/pedidoRepositoryDraft";
import { useIsFocused } from "@react-navigation/native";
import { deleteDraftById, getCurrentDraftId } from "../../db/repository/pedidoRepositoryDraft";
import { globalStyles } from "../../globalStyles";
import { RenderRascunho } from "../../enum";







const ModalDraft = ({ isVisible, onCancel, limpar, refresh = false }) => {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    const [refreshing, setRefreshing] = useState(refresh);


    useEffect(() => {
        if (isFocused) {
            (async () => {
                try {
                    const drafts = await listDrafts({ limit: RenderRascunho.QTD_MAX_RASCUNHOS });
                    setData(drafts);

                } catch (e) {
                    console.log('Erro ao migrar:', e);
                }
            })();
        }

    }, [isFocused, refreshing, refresh]);


    const handleDeleteDdraft = async (id) => {
        const result = await deleteDraftById(id);
        result.ok && setRefreshing(!refreshing);
        if (result.ok && String(getCurrentDraftId()) === String(id)) {
            limpar();
        }
    }
    


    return (

        <Modal
            visible={isVisible}
            animationType='fade'
            transparent={true}
        >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ borderRadius: 16, paddingHorizontal: 6, paddingVertical: 12, alignItems: 'center', width: '95%', backgroundColor: '#FFF' }}>
                    <Text style={[{ fontSize: 25, fontWeight: '600', borderBottomWidth: 1, width: '100%', textAlign: 'center', paddingBottom: 10, borderBottomColor: '#E8E8E8' }, globalStyles.text]}>Rascuhos</Text>
                    <FlatList
                        style={{ height: '80%', width: '100%', marginTop: 20 }}
                        data={data}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) => <ViewDraft {...item} onCancel={onCancel} deleteDraft={handleDeleteDdraft} />}
                    />
                    <TouchableOpacity style={{ width: '100%', borderRadius: 6, paddingVertical: 8, backgroundColor: '#0a6c91', marginTop: 20 }} onPress={onCancel}>
                        <Text style={{ fontSize: 20, textAlign: 'center', color: '#FFF' }}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    )
}


export default ModalDraft;