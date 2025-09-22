import React from 'react';
import { TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons'

import Styles from './Styles'





const reload = ({onPress}) => {

    return(
        <TouchableOpacity  style={Styles.container} activeOpacity={0.6} onPress={() => onPress()}>
            <Icon name='reload-circle' size={53} color='#00A0D3'/>
        </TouchableOpacity>
    )
}

export default reload;