import React, { useState, useRef, useEffect } from "react"
import { TextInput, View, TouchableOpacity } from "react-native"
import Icon from 'react-native-vector-icons/EvilIcons'
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment"

import Styles from "./Styles"
import { globalStyles } from "../../globalStyles"



const InputCalendario = ({ choseDate, clearInputDate, setclearInputDate}) => {

    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)
    const [dateInput, setDateInput] = useState('')
    const textInputRef = useRef(null);

    const dateString = moment(date).format('DD[/]MM[/]YYYY');


    useEffect(() => {

        if (clearInputDate) {
            setDateInput('');
            setclearInputDate();
        }

    }, [clearInputDate]);


    const onChangeDate = (event, selectedDate) => {

        const currentDate = selectedDate || date
        
        setShow(false)
        setDateInput(currentDate)
        choseDate(currentDate)

        textInputRef.current.blur()
    }


    const showMode = () => {
        setShow(true)
    }


    return (
        <>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dateInput || date}
                    mode="date"
                    display='default'
                    onChange={onChangeDate}    

                />
            )}

            <View style={Styles.containerInput}>
                <TextInput style={[globalStyles.text, Styles.textInput]}
                    ref={textInputRef}
                    value={dateInput ? moment(dateInput).format('DD[/]MM[/]YYYY') : dateString}
                    onFocus={() => showMode()}
                />
                <TouchableOpacity onPress={showMode}>
                    <Icon name='calendar' size={35} color='#0a6c91' />
                </TouchableOpacity>
                
            </View>

        </>
    )

}



export default InputCalendario