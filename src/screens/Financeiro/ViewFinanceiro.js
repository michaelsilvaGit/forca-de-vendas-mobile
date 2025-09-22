import React, {useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, Button, Alert } from 'react-native'
import styles from './styles'
import { TextInput } from 'react-native-gesture-handler';

import Email from '../../assets/emailEnviar.svg';


export default ({ id, valor = '', dataPagamento, formaPagamento = ' ', tipoPagamento = ' ' }) => {

    const [sendEmailEnable, setSendEmailEnable] = useState(false);
    const [email, setEmail] = useState('');

    // const sendBoletoByEmail = (email) => {
    //     // lógica para enviar o email, quando estiver com o banco de dados 
    //     console.log('Enviando boleto por email para:', email);
    //     // alerta após enviar o email:
    //     Alert.alert('Boleto enviado com sucesso para ' + email);
    // };

    // const BoletoComponent = ({emailDoCliente}) => {
    //     const [email, setEmail] = useState(emailDoCliente || '');

    //     const handleSendBoleto = () => {
    //         if (email) {
    //             sendBoletoByEmail(email);
    //         } else {
    //             Alert.alert('Por favor, insira um email ');
    //         }
    //     };

    //     return (
    //         <View>
    //             <Text>Componente de Boleto</Text>
    //             <Button title="Enviar Boleto" onPress={handleSendBoleto} />
    //         </View>
    //     );
    // }



    const sendEmail = () => {
        console.log('Email enviado para:', email);
        if (email) {
            return Alert.alert(
                `Boleto enviado com sucesso para ${email}!`,
                '',
                [{
                    text: 'Ok', onPress: () => {
                        setEmail('');
                        setSendEmailEnable(false);
                    }
                }]
            );
        }
    }


    return (
        <>
            <View>

                <View style={styles.containerFinanceiro}>
                    <View style={styles.containerInfo}>
                        <Text style={styles.infoFinanceiro}>{valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
                        <Text style={styles.infoFinanceiro}>{dataPagamento} </Text>
                        <Text style={styles.infoFinanceiro}>{formaPagamento} </Text>
                        <Text style={styles.infoFinanceiro}>{tipoPagamento} </Text>

                        <View style={styles.viewEmail}>
                            {formaPagamento === 'BOLETO' && (
                                <View>
                                    <TouchableOpacity
                                        onPress={() => setSendEmailEnable(!sendEmailEnable)}>
                                        {/* <Icon name='email-send-outline' size={30} /> */}
                                        <Email />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>

                        <View>
                            {sendEmailEnable && formaPagamento === 'BOLETO' && (
                                <View>
                                    <TextInput
                                        placeholder='Digite o email para envio'
                                        onChangeText={setEmail}
                                        value={email}
                                    />
                                    <Button title='Enviar Boleto' onPress={sendEmail} />
                                </View>
                            )}
                        </View>

                    </View>

                </View>
            </View>
        </>

    )
}