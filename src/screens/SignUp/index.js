import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styles from '../SignUp/styles';

import LogoAraguaia from '../../assets/logo-araguaia.svg';
import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

import SignInput from '../../components/SearchSiginInputs/SignInput';
import { useNavigation } from '@react-navigation/native';

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{ name: 'AuthSignIn' }]
        });
    }

    const handleSignClick = () => {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

        if (!nameField || !emailField || !passwordField) {
            Alert.alert(
                'ATENÇÃO!',
                'Preencha todos os campos.'
            )
            return;
        }

        if (!regex.test(emailField)) {
            Alert.alert(
                'ATENÇÃO!',
                'Formato de email inválido.'
            );
            return;
        }

        navigation.navigate('HomeSwitch')

    }

    return (
        <View style={styles.container}>
            <LogoAraguaia width="100%" height="160" />
            <View style={styles.inputArea}>

                <SignInput
                    IconSvg={PersonIcon}
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t => setNameField(t)}
                />
                <SignInput
                    IconSvg={EmailIcon}
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t => setEmailField(t)}
                />
                <SignInput
                    IconSvg={LockIcon}
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t => setPasswordField(t)}
                    password={true}
                />
                <TouchableOpacity style={styles.buttonLogin} onPress={handleSignClick}>
                    <Text style={styles.textButtonLogin}>CADASTRAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.message} onPress={handleMessageButtonClick}>
                    <Text style={styles.textMessage}> Ainda não possui uma conta?</Text>
                    <Text style={styles.textMessageBold}>Faça Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}