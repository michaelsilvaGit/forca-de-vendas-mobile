import { View, Text, FlatList, TextInput, BackHandler } from "react-native";
import { useState, useEffect } from "react";
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome';
import financeiro from '../../data/Financeiro';
import ViewFinanceiro from "./ViewFinanceiro";
import styles from './styles';



export default ({ route, financial }) => {
    const [textSearch, setTextSearch] = useState('');
    const [selectedPayment, setSelectedPayment] = useState('');
    const [selectedDeadline, setSelectedDeadline] = useState('');
    const [filteredPayment, setFilteredPayment] = useState([]);

    useEffect(() => {
        filterPayment();
    }, [textSearch, selectedPayment, selectedDeadline]);

    useEffect(() => {
        // Adiciona um listener para o evento 'hardwareBackPress'
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackPress
        );

        // Remove o listener ao desmontar o componente
        return () => backHandler.remove();
    }, []);

    const handleBackPress = () => {
        // Limpa a pesquisa e os dropdowns ao pressionar o botão de voltar
        setTextSearch('');
        setSelectedPayment('');
        setSelectedDeadline('');
        return false; // Indica que o evento foi tratado, evitando a ação padrão do botão de voltar
    };


    const filterPayment = () => {
        const upperCaseSearch = textSearch.toUpperCase().trim();
        let filtered = financeiro.filter(item => {
            const matchPayment = selectedPayment === '' || item.formaPagamento.toUpperCase().includes(selectedPayment.toUpperCase());
            const matchDeadline = selectedDeadline === '' || item.tipoPagamento.toUpperCase().includes(selectedDeadline.toUpperCase());
            const matchSearch = textSearch === '' || item.formaPagamento.toUpperCase().includes(upperCaseSearch) || item.tipoPagamento.toUpperCase().includes(upperCaseSearch);
            return matchPayment && matchDeadline && matchSearch;

        });

        setFilteredPayment(filtered);
    }

    // const filterDeadline = () => {
    //     const upperCaseSearch = textSearch.toUpperCase().trim();
    //     let filteredeDeadline = financeiro.filter(item => {
    //         return item.tipoPagamento.toUpperCase().includes(upperCaseSearch);
    //     });
    //     console.log("Prazo Filtrados:", filteredeDeadline);
    //     setFilteredPayment(filteredeDeadline);

    // }

    const typePayment = [
        { id: 4, name: 'Debito', },
        { id: 1, name: 'Dinheiro' },
        { id: 3, name: 'Credito' },
        { id: 2, name: 'Pix' },
        { id: 5, name: 'Boleto' }
    ]

    const typeDeadline = [
        { id: 4, name: 'A VISTA', },
        { id: 1, name: '30/60 dias' },
        { id: 3, name: '30/60/90 dias' },
        { id: 5, name: '30/60/90/120 dias' }
    ]

    return (
        <>
            <View style={styles.viewContainer}>
                <View style={styles.containerSearchInput}>
                    <View style={styles.inputSearch} >
                        <Icon name='search' size={20} color='#0a6c91' style={{ marginRight: 3 }} />

                        <TextInput placeholder='Pesquisar ...' onChangeText={setTextSearch} />

                    </View>
                </View>
                <View style={styles.containerDropdown}>
                    <SelectDropdown
                        data={typePayment}
                        defaultButtonText='Forma de pagamento'

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}

                        buttonStyle={{ width: '44%', backgroundColor: '#FFF', borderRadius: 8, elevation: 10 }}
                        buttonTextStyle={styles.dropdown2BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#0a6c91'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                        rowStyle={styles.dropdown2RowStyle}
                        rowTextStyle={styles.dropdown2RowTxtStyle}
                        selectedRowStyle={styles.dropdown2SelectedRowStyle}

                        onSelect={(selectedItem, index) => setSelectedPayment(selectedItem.name)}

                    />
                    <SelectDropdown
                        data={typeDeadline}
                        defaultButtonText='Prazo'

                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem.name;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item.name;
                        }}

                        buttonStyle={{ width: '44%', backgroundColor: '#FFF', borderRadius: 8, elevation: 10 }}
                        buttonTextStyle={styles.dropdown2BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#0a6c91'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                        rowStyle={styles.dropdown2RowStyle}
                        rowTextStyle={styles.dropdown2RowTxtStyle}
                        selectedRowStyle={styles.dropdown2SelectedRowStyle}

                        onSelect={(selectedItem, index) => setSelectedDeadline(selectedItem.name)}
                    />

                </View>

                <View style={styles.containerFlatList}>
                    {filteredPayment.length > 0 ? (
                        <FlatList
                            data={filteredPayment}
                            keyExtractor={item => `${item.id}`}
                            renderItem={({ item }) => <ViewFinanceiro {...item} financeiro={financial} />}
                        />
                    ) : (
                        <Text style={{ textAlign: 'center' }}>Pagamento não encontrado</Text>
                    )}
                </View>

            </View >
        </>


    )
}