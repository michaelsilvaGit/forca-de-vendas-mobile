import React, { useEffect } from "react"
import { View, Text, TouchableWithoutFeedback, Modal, ActivityIndicator } from "react-native"
import IconCheck from 'react-native-vector-icons/AntDesign'
import IconError from 'react-native-vector-icons/AntDesign'

import { globalStyles } from "../../globalStyles"






const loadingComponent = ({isVisibleLoading, loading, sucess, error, messageLoading, messageSucess, messageError, oncanceLoading}) => {

    useEffect(() => {

        if(!loading && !messageError && !messageSucess){
            oncanceLoading();
        }

    }, [loading])



    return (
        <Modal
            visible={isVisibleLoading}
            transparent={true}
            animationType='none'
            
        >

            <TouchableWithoutFeedback onPress={loading ? null : oncanceLoading}>
                <View style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', alignItems: 'center', justifyContent: 'center', paddingVertical: 10}}>
                    <View style={{height: 120, width: '60%', backgroundColor: '#F8F8F8', justifyContent: 'center'}}>
                    
                        {loading && (
                            <>
                                <ActivityIndicator size="large" color="#00A0D3" /> 
                                <Text style={[globalStyles.text, {textAlign: 'center', marginTop: 10}]}>{messageLoading}</Text>
                            </>

                        )}

                        {sucess && messageSucess && (
                            <>
                                <IconCheck style={{textAlign: 'center'}} name='checkcircle' size={45} color="#00AD83" />
                                <Text style={[globalStyles.text, {textAlign: 'center', marginTop: 10}]}>{messageSucess}</Text>
                            </>
                        )}

                        {error && messageError && (
                            <>
                                <IconError style={{textAlign: 'center'}} name='exclamationcircle' size={45} color="#E94646" />
                                <Text style={[globalStyles.text, {textAlign: 'center', marginTop: 10}]}>{messageError}</Text>
                            </>
                        )} 
                    </View>
                </View>
            </TouchableWithoutFeedback>
            
        </Modal>
    )
}




export default loadingComponent;