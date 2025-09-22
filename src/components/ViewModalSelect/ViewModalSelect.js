import React, {useCallback} from 'react'
import { View, Text, TouchableOpacity } from 'react-native';
import { globalStyles } from '../../globalStyles';



const ViewModalSelect = ({id, name, dataSelect}) => {



  const handleDataSelect = useCallback(({id , name}) => {
    dataSelect({id , name});
  }, []);



  return (

    <TouchableOpacity style={{borderTopWidth: 1, borderTopColor: '#0a6c91', backgroundColor: '#FFF', width: '98%', paddingVertical: 10, paddingHorizontal: 6, justifyContent: 'center' }} onPress={() => handleDataSelect({id, name})}>
        <Text style={[globalStyles.text, { fontSize: 19, fontWeight: '500' }]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default ViewModalSelect