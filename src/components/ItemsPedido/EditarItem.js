import React from "react"
import { Modal, TouchableWithoutFeedback, View } from "react-native"
import ViewProduto from "../ViewProduto/ViewProduto"
import { useSelector } from "react-redux"






const EditarItem = ({isVisible, onCancel, onUpdateItem}) => {

    const { item } = useSelector((state) => state.produto)


    return (
        
        <Modal
            visible={isVisible}
            transparent={true}
            onRequestClose={onCancel}
            animationType='fade'
        >
            <TouchableWithoutFeedback onPress={onCancel}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}></View>
            </TouchableWithoutFeedback>

            <View style={{height: 440, marginBottom: -10, backgroundColor: '#F8F8F8'}}>
                {item && (
                    <ViewProduto  {...item} editItem={true} onCancel={onCancel} onUpdateItem={onUpdateItem}/>
                )}
            </View>

        
           <TouchableWithoutFeedback onPress={onCancel}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}


export default EditarItem