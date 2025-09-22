import React, { useEffect } from "react"
import SelectDropdown from "react-native-select-dropdown"
import Icon from 'react-native-vector-icons/FontAwesome'

import Styles from "./Styles"
import { useIsFocused } from "@react-navigation/native"
import { useState } from "react"


const DropdownPesquisa = ({tipoPesquisa, buttonDefault, onSelect}) => {



    const [defaultDropdownValue, setDefaultDropdownValue] = useState(null);
    const isFocused = useIsFocused(); 


    useEffect(() => {
        if (isFocused) {
            setDefaultDropdownValue(tipoPesquisa && tipoPesquisa.find(item => item.name === buttonDefault));
        }
    }, [isFocused, buttonDefault, tipoPesquisa]);




    return (
        
        <SelectDropdown
            data={tipoPesquisa}
            defaultButtonText={buttonDefault}
            defaultValue={defaultDropdownValue} // Força o valor inicial
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
            }}
            rowTextForSelection={(item, index) => {
                return item.name;
            }}

            buttonStyle={Styles.buttonDropdowPesquisa}
            renderDropdownIcon={isOpened => {
                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#0a6c91'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={{borderRadius: 8}}
            selectedRowStyle={{backgroundColor: '#dddddd'}}
            //rowTextStyle={{color: '#FFF'}}

            onSelect={(selectedItem, index) => {
                onSelect(selectedItem)
            }}
        />
    )
}



export default DropdownPesquisa