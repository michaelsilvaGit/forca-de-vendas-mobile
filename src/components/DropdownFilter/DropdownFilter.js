import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import { limitItensFilter } from '../../enum';
import { globalStyles } from '../../globalStyles';
import { saveItemsRender, loadItemsRender } from '../../storage/qtdItemsRenderFilterStorage';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import styles from './Styles';





const DropdownFilter = ({ nome, data, listItem, toggle, categoriaFilha = false, qtdItensFilterGrupo, qtdItensFilterMarca, qtdItensFilterLinha, addQtdItemsFilter }) => {


    const [collapsed, setCollapsed] = useState(true);
    const [visibleItems, setVisibleItems] = useState(limitItensFilter.qtd);
    const [filteredData, setFilteredData] = useState('');
    const [textSearch, setTextSearch] = useState('');


    useEffect(() => {
        if (listItem.length > 0) {
            setCollapsed(false);

            if(nome === 'Marca'){
                setVisibleItems(qtdItensFilterMarca);
            }else if(nome === 'Grupo'){
                setVisibleItems(qtdItensFilterGrupo);
            }else if(nome === 'Linha'){
                setVisibleItems(qtdItensFilterLinha);
            }
        }
    }, []);


    const loadMoreItems = useCallback(() => {
        setTimeout(() => {
            setVisibleItems((prevVisibleItems) => {
                const newVisibleItems = prevVisibleItems + limitItensFilter.qtd;
                if(nome === 'Marca'){
                    addQtdItemsFilter('Marca', newVisibleItems);
                }else if(nome === 'Grupo'){
                    addQtdItemsFilter('Grupo', newVisibleItems);
                }else if(nome === 'Linha'){
                    addQtdItemsFilter('Linha', newVisibleItems);
                }
                return newVisibleItems;
            });
        }, 0);
    }, []);

    const showLessItems = useCallback(() => {
        setVisibleItems(limitItensFilter.qtd);

        if(nome === 'Marca'){
            addQtdItemsFilter('Marca', limitItensFilter.qtd);
        }else if(nome === 'Grupo'){
            addQtdItemsFilter('Grupo', limitItensFilter.qtd);
        }else if(nome === 'Linha'){
            addQtdItemsFilter('Linha', limitItensFilter.qtd);
        }
    }, []);


    const handleToggleCollapse = useCallback(() => {
        setCollapsed(!collapsed);
    }, [collapsed]);


    useEffect(() => {

        let filtered = data && data.filter(item =>
            item.nome.toLowerCase().includes(textSearch?.toLowerCase())
        );

        // Se não houver termo de pesquisa, mover os itens de 'marca' para o topo
        if (!textSearch && listItem.length > 0) {

            const nonSelectedItems = filtered.filter(item => !listItem.includes(item.id));
            const selectedItems = filtered.filter(item => listItem.includes(item.id));

            filtered = [...selectedItems, ...nonSelectedItems];
        }

        const displayedData = filtered && filtered.slice(0, visibleItems);

        setFilteredData(displayedData);

    }, [textSearch, visibleItems])


    const handleOnChangeSearchInput = useCallback((text) => {
        setTextSearch(text);
    },[]);



    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#bebebe', paddingVertical: 15 }}
                onPress={handleToggleCollapse}
            >
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={[globalStyles.text, { fontWeight: '500', fontSize: 15 }]}>{nome}</Text>
                    {listItem.length > 0 ? <View style={{ marginLeft: 4, height: 8, width: 8, borderRadius: 50, backgroundColor: 'red'}}/> : <View />}
                </View>
                <Icon name={!collapsed ? 'chevron-up' : 'chevron-down'} color={'#0a6c91'} size={18} />
            </TouchableOpacity>

            <Collapsible collapsed={collapsed}>
                
                <View style={{width: '100%'}}>
                    <View style={{ borderRadius: 8, paddingLeft: 5, marginTop: 4, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center'}} >
                        <Icon2 name='search' size={20} color='#0a6c91' style={{ marginRight: 3 }} />
                        <TextInput
                            style={[globalStyles.text, { width: '100%' }]}
                            placeholderTextColor={'#999999'}
                            placeholder='pesquisar'
                            value={textSearch}
                            onChangeText={(text) => { handleOnChangeSearchInput(text) }}
                            autoCorrect={false}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </View>
                </View>


                <View>
                    {visibleItems > limitItensFilter.qtd && (
                        <TouchableOpacity onPress={showLessItems} style={{ padding: 10 }}>
                            <Text style={{ color: '#0a6c91', fontSize: 16 }}>Mostrar menos</Text>
                        </TouchableOpacity>
                    )}

                    {filteredData && filteredData.map((item) => (
                        <CheckBox
                            key={item.id}
                            title={item.nome}
                            checked={listItem.includes(item.id)}
                            onPress={() => toggle(item)}
                        />
                    ))}

                    {visibleItems < data.length && (
                        <TouchableOpacity onPress={loadMoreItems} style={{ padding: 10 }}>
                            <Text style={{ color: '#0a6c91', fontSize: 16 }}>Mostrar mais</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Collapsible>
        </View>
    );
};

export default DropdownFilter;