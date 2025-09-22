import React from 'react'
import { View, Text } from 'react-native'

import styles from './Styles'




const LabelDescricao = ({label, descricao, campoObservacao = false}) => {


  return (

    <View style={styles.containerInfo}>
        <Text style={styles.label}>{label}</Text>
        <View style={campoObservacao ? styles.containerFalseInputsNoHeight : styles.containerFalseInputs}>
            <Text
                style={styles.falseInputs}
                numberOfLines={campoObservacao ? null : 1}
            >
                {descricao}
            </Text>
        </View>
    </View>
  )
}

export default LabelDescricao