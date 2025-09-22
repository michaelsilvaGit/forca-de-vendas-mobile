import React, { useEffect, useState } from "react"
import { TouchableOpacity, View, Text } from 'react-native';
import SelectDropdown from "react-native-select-dropdown"
import Icon from 'react-native-vector-icons/FontAwesome'
import { useIsFocused } from "@react-navigation/native"
import Styles from "./Styles"




const DropdownRequired = ({items, placeholder, dataSelected, clear, clearSet, dataEditAndClone, required = true}) => {

    const isFocused = useIsFocused();

    const [select, setSelect] = useState('');
    const [selectEdit, setSelectEdit] = useState([]);
    const isFilledP = selectEdit ? selectEdit :  select.trim() !== '';


    useEffect(() => {
        if(isFocused){
            const initialSelection = items && dataEditAndClone && dataEditAndClone.id ? items.find(item => item.id === dataEditAndClone.id) : null;
            setSelectEdit(initialSelection);

        }
    }, [isFocused, items, dataEditAndClone]);

    
    useEffect(() => {
        if (clear) {
            setSelect('');
            setSelectEdit(null);
            clearSet();
        }
    }, [clear]);
  

    return (
        <SelectDropdown
            data={items}
            defaultButtonText={placeholder}
            defaultValue={selectEdit}
            
            buttonTextAfterSelection={(selectedItem, index) => {
                return selectEdit || select ? selectedItem.name : placeholder;
            }}
            rowTextForSelection={(item, index) => {
                return item.name;
            }}

            buttonStyle={[Styles.dropdown2BtnStyle, required && !isFilledP ? Styles.inputContainerError : Styles.inputContainerOk]} 
            buttonTextStyle={Styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#0a6c91'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={Styles.dropdown2DropdownStyle}
            rowStyle={Styles.dropdown2RowStyle}
            selectedRowStyle={Styles.dropdown2SelectedRowStyle}
            search
            searchInputStyle={Styles.dropdown2searchInputStyleStyle}
            searchPlaceHolder={'Pesquise aqui'}
            searchPlaceHolderColor={'#838383'}
            renderSearchInputLeftIcon={() => {
                return <Icon name={'search'} color={'#0a6c91'} size={18} />;
            }}
            renderCustomizedRowChild={(item, index) => {
                return (
                    <View style={{paddingHorizontal: 5}}>
                        <Text style={Styles.dropdown2RowTxtStyle}>{item.name}</Text>
                    </View>
                );
            }}
            onSelect={(selectedItem, index) => {
                setSelect(selectedItem.name)
                dataSelected(selectedItem)
            }}
            

        />
    )
}



export default DropdownRequired
