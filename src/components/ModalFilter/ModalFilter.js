import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { CheckBox } from 'react-native-elements';
import DropdownFilter from '../DropdownFilter/DropdownFilter';


import Styles from './Styles';
import { globalStyles } from '../../globalStyles';



const ModalFilter = ({ onClose,
    listMarca,
    listCategoria,
    listCategoriasFilhas,
    marcaSelecionada,
    categoriaSelecionada,
    isModalVisible,
    categoriaFilhaSelecionada,
    toggleMarca,
    toggleCategoria,
    toggleCategoriaFilha,
    filtrar,
    limpar,
    promocao,
    Addpromocao,
    showTags,
    qtdItensFilterGrupo,
    qtdItensFilterMarca,
    qtdItensFilterLinha,
    addQtdItemsFilter

}) => {




    return (

        <Modal
            visible={isModalVisible}
            animationType='fade'

            transparent={true}
        >

            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>

                <TouchableWithoutFeedback>
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                </TouchableWithoutFeedback>

                <View style={{ height: '80%', width: '70%', alignSelf: 'flex-end', backgroundColor: '#FFF', padding: 13 }}>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#bebebe' }}>
                        <Text style={[globalStyles.text, { marginBottom: 12, fontSize: 18, fontWeight: '600' }]}>Filtrar por:</Text>
                    </View>
                    <ScrollView contentContainerStyle={{}}>

                        <DropdownFilter data={listMarca} nome={'Marca'} listItem={marcaSelecionada} toggle={toggleMarca} qtdItensFilterMarca={qtdItensFilterMarca} addQtdItemsFilter={addQtdItemsFilter} />
                        <DropdownFilter data={listCategoria} nome={'Grupo'} listItem={categoriaSelecionada} toggle={toggleCategoria} qtdItensFilterGrupo={qtdItensFilterGrupo} addQtdItemsFilter={addQtdItemsFilter} />
                        <DropdownFilter data={listCategoriasFilhas} nome={'Linha'} listItem={categoriaFilhaSelecionada} toggle={toggleCategoriaFilha} categoriaFilha={true} qtdItensFilterLinha={qtdItensFilterLinha} addQtdItemsFilter={addQtdItemsFilter} />

                        <View style={{ marginTop: 5, justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={[globalStyles.text, { fontSize: 16, fontWeight: '500' }]}>Promoção</Text>
                            <CheckBox
                                checked={promocao}
                                onPress={() => Addpromocao()}
                                containerStyle={{ marginTop: 8, marginLeft: 0, marginRight: 0, paddingRight: 0 }}
                            />
                        </View>

                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity onPress={() => limpar()} style={{ borderWidth: 1, borderColor: '#0a6c91', marginBottom: 20, backgroundColor: '#FFFF', width: '48%', paddingVertical: 5, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: '#0a6c91', fontWeight: '600' }}>{showTags?.length > 0 ? 'Limpar' : 'Sair'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => filtrar()} style={{ marginBottom: 20, backgroundColor: '#34a18d', width: '48%', paddingVertical: 5, borderRadius: 6 }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: '#FFF', fontWeight: '600' }}>Filtrar</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </View>
            </View>
        </Modal>

    );
};

export default ModalFilter
