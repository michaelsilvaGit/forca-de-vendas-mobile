import React from 'react';
import { View, Text } from 'react-native';
import { globalStyles } from '../../globalStyles';


const MarcadorLabel = ({text}) => {

    return (
        <View style={{ width:'47%', display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
            <View style={{borderLeftWidth: 3, borderLeftColor: '#0a6c91', height: 19 }}><Text></Text></View>
            <Text style={[globalStyles.text, { fontSize: 19, marginLeft: 5 }]}>{text}</Text>
        </View>
    )



}



export default MarcadorLabel