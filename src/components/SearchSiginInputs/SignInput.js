import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableWithoutFeedback } from 'react-native';

import Styles from './Styles';



    const SignInput = ({IconSvg, placeholder, value, onChangeText, showPassword, habilitarShowPassword, habilitarInput, IconShowPass, senhaStorageState}) => {


        return (
            <View style={Styles.inputArea}>
                <IconSvg width="24" height="24" fill="#4693c7" />
                <TextInput
                    style={Styles.input} 
                    placeholder={placeholder}
                    placeholderTextColor="#B0BEC5" 
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={showPassword}
                    editable={habilitarInput}
                />
                <TouchableWithoutFeedback onPress={() => habilitarShowPassword()}>
                    {senhaStorageState === '' && value && IconShowPass ? (
                        <IconShowPass name={showPassword ? 'eye' : 'eye-off'} size={24} color="#4693c7" />
                    ) : (
                        <View />
                    )}
                </TouchableWithoutFeedback>
            </View>
        );
    }



export default SignInput