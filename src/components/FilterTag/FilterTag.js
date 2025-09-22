import React from 'react'
import { View, Text } from 'react-native'




const FilterTag = ({text}) => {


  return (
      <View style={[text === 'PROMOÇÃO' ? {backgroundColor: '#17b476'} : {backgroundColor: '#0a6c91'}, { borderRadius: 5, paddingHorizontal: 6, paddingVertical: 1, marginRight: 8, marginBottom: 2 }]}>
            <Text style={[{ color: '#FFF', fontSize: 16 }]}>{text}</Text>
      </View>
  )
}

export default FilterTag