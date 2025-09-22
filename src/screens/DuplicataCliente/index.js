import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../globalStyles'
import { getDuplicataByIdCliente } from '../../slices/duplicataSlice';
import styles from "./styles";
import ViewDuplicata from '../../components/ViewDuplicata/ViewDuplicata';



const DuplicataCliente = ({ route }) => {

    const navigation = useNavigation();
    const cliente = route.params;
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    

    const {duplicatas, loading, error} = useSelector((state) => state.duplicata);

    useEffect(() => {

        if(isFocused){
            let data = {

                filters: {
                    idFavorecido: cliente.id,
                },
                page: 0,
                size: 10,
                sorting: {
                    undefined: 'asc'
                },
                tenant: 'tenant'
            }

            dispatch(getDuplicataByIdCliente(data))
        }

       

    }, [isFocused])


    return (
        <View style={{flex: 1, paddingHorizontal: 14}}>
            <View style={styles.containerDuplicata}>
                <Text style={[globalStyles.text, { fontSize: 15, fontWeight: '700' }]}>Duplicatas</Text>
                <Text style={[globalStyles.text, { fontSize: 18, fontWeight: '400' }]}>
                    {cliente.razaoSocial}
                </Text>
            </View>

   

                {loading ? (
                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ActivityIndicator size="large" color="#00A0D3" />
                    </View>
                ) : duplicatas && duplicatas.length > 0 ? (
                    <FlatList
                        data={duplicatas}
                        keyExtractor={item => `${item.duplicataReceberId}`}
                        renderItem={({ item }) => <ViewDuplicata {...item} />}
                    />
                ) : (
                    <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '50%' }]}>Nenhuma duplicata encontrada!</Text>
                )}
        </View>
        
        
    )
}



export default DuplicataCliente;