import React, {useEffect, useState} from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { globalStyles } from '../../globalStyles'
import Styles from './Styles'
import { colorEstado } from '../../enum'
import numberFormatBRL from '../../utils/numberFormatBRL'
import Icon from 'react-native-vector-icons/Octicons';

const ViewDuplicata = ({
    duplicataReceberNumeroDuplicata,
    dataVencimento,
    valorParcela,
    numeroParcela,
    estado
}) => {

    //clock

    const [status, setStatus] = useState('#FFF');
    const [statusNome, setStatusNome] = useState('');

    useEffect(() => {
        if (estado === 'A') {
            setStatus(colorEstado.ABERTO);
            setStatusNome('ABERTO');
        } else if (estado === 'P') {
            setStatus(colorEstado.SINC);
            setStatusNome('PAGO');
        } else if (estado === 'V') {
            setStatus(colorEstado.BLOQUEADO);
            setStatusNome('VENCIDO');
        }else if (estado === 'C') {
            setStatus(colorEstado.BLOQUEADO);
            setStatusNome('CANCELADO');
        }
    }, [estado])


    return (


        <View style={Styles.containerDuplicata}>
            <Text style={{fontSize: 19, fontWeight: '600', color: '#000'}}>Duplicata {duplicataReceberNumeroDuplicata}/{numeroParcela}</Text>
            <View style={Styles.containerInfo}>
                <Text style={[globalStyles.text, {fontSize: 18, fontWeight: '400'}]}>{dataVencimento}</Text>
                <View style={[Styles.containerStatus, {backgroundColor: status}]}>
                    <View style={Styles.containerStatusIcon}>
                        <Text style={{ fontSize: 18, color: '#FFF', marginRight: 6 }}>{statusNome}</Text>
                        <Icon name={statusNome === 'ABERTO' ? 'clock' : statusNome === 'PAGO' ? 'check-circle' : 'stop'} size={18} color='#FFF' />
                    </View>
                </View>

            </View>
            

            <View style={Styles.containerTotal}>
                <Text style={[globalStyles.text, { fontSize: 16 }]}>Valor:</Text>
                <Text style={{ fontSize: 18, marginLeft: 4, fontWeight: '500', color: '#0a6c91' }}>{numberFormatBRL(valorParcela || 0)}</Text>
            </View>
        </View>







        // <View style={Styles.containerDuplicata}>
        //     <View style={{}}>
        //         <Text style={[globalStyles.text, Styles.textLabel]}>CÓDIGO:</Text>
        //         <Text style={[globalStyles.text, Styles.textLabel]}>DATA:</Text>
        //         <Text style={[globalStyles.text, Styles.textLabel]}>VALOR:</Text>
        //         <Text style={[globalStyles.text, Styles.textLabel]}>STATUS:</Text>
        //     </View>
        //     <View>
        //         <Text style={Styles.textData}>53233</Text>
        //         <Text style={Styles.textData}>23/06/2025</Text>
        //         <Text style={Styles.textData}>R$34.664,00</Text>
        //         <Text style={Styles.textDataBlue}>PAGO</Text>
        //     </View>
        // </View>
        
    )
}



export default ViewDuplicata;