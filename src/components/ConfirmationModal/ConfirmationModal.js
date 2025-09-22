import React from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, Modal } from 'react-native'







const ConfirmationModal = ({confirmed, text, onCancel, isVisible, data}) => {





  return (

    <Modal
        visible={isVisible}
        transparent={true}
        animationType='none'
    >
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center', paddingVertical: 10}}>
            <View style={{paddingHorizontal: 15, paddingVertical: 15, alignItems: 'center', width: '70%', backgroundColor: '#F8F8F8', height: 150}}>
                <Text style={{ color: '#6d6d6d', textAlign: 'center', fontSize: 18}}>{`${text}${data ? data + ' ?' : '?'}`}</Text>
                <View style={{position: 'absolute', bottom: 25, display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => confirmed()} style={{ borderRadius: 5, paddingHorizontal: '7%', paddingVertical: '3%', backgroundColor: '#34a18d' }}>
                        <Text style={{ color: '#FFF' }}>Confirmar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onCancel()} style={{ borderRadius: 5, paddingHorizontal: '7%', paddingVertical: '3%', backgroundColor: '#e25050' }}>
                        <Text style={{ color: '#FFF' }}>Cancelar</Text>
                    </TouchableOpacity>
                </View>         
            </View>
        </View>
    </Modal>
    )
}

export default ConfirmationModal