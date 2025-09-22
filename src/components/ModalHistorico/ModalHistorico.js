import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Modal } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../globalStyles'
import Styles from './Styles'






const ModalHistorico = ({dataTransacao, dataLiberacao, dataSincronizado, dataFaturamento, isVisible, onCancel }) => {

    const [noData, setNoData] = useState('.....................');

    const data = [
        { data: dataTransacao || noData, evento: 'Pedido criado em' },
        { data: dataLiberacao || noData, evento: 'Pedido liberado em' },
        { data: dataSincronizado || noData, evento: 'Pedido sincronizado em' },
        { data: dataFaturamento || noData, evento: 'Pedido faturado em' },
    ];



    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType='none'
        >
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ borderRadius: 16, paddingVertical: 15, alignItems: 'center', width: '90%', backgroundColor: '#F8F8F8' }}>
                    <View style={{ borderBottomColor: '#b6b6b6', width: '100%', paddingBottom: 12, borderBottomWidth: 1 }}>
                        <Text style={{ textAlign: 'center', fontSize: 22, fontWeight: '700', color: '#3b3b3b' }}>Histórico</Text>
                    </View>
                    <View style={{ paddingLeft: 10, paddingTop: 20 }}>
                        {data.map((item, index) => (
                            <View key={index} style={{ flexDirection: 'row', marginBottom: 20 }}>
                                <View style={{ alignItems: 'center' }}>
                                    <View style={{ width: 10, height: 10, backgroundColor: '#2196F3', borderRadius: 5 }} />
                                    {index < data.length - 1 && (
                                        <View style={{ width: 2, height: 40, backgroundColor: '#2196F3', marginTop: 2 }} />
                                    )}
                                </View>
                                <View style={{ marginLeft: 12 }}>
                                    <Text style={[globalStyles.text, { fontWeight: 'bold', fontSize: 16 }]}>{item.evento}</Text>
                                    <Text style={[globalStyles.text, { color: 'gray', fontSize: 15 }]}>{item.data}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                    <TouchableOpacity onPress={() => onCancel()} style={{ borderTopColor: '#b6b6b6', width: '100%', paddingTop: 14, borderTopWidth: 1 }}>
                        <Text style={[globalStyles.text, { textAlign: 'center', fontSize: 18, fontWeight: '500' }]}>Fechar</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    )
}



export default ModalHistorico;