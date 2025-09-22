import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import imagemSemFoto from '../../assets/images/sem_foto.png';
import Icon from 'react-native-vector-icons/Ionicons'
import numberFormatBRL from '../../utils/numberFormatBRL';
import FastImage from 'react-native-fast-image';
import { globalStyles } from '../../globalStyles';
import { useSelector } from 'react-redux';


export default ({ id, 
                  codigoInterno, 
                  dataInicioPromocao, 
                  valorPromocao, 
                  descricao,
                  aplicacao,
                  saldoEstoque, 
                  marcaDescricao, 
                  qtdProdutoEquivalente,
                  qtdEquivalentes,
                  precoVenda,
                  valorVenda, 
                  caminhoImagem, 
                  seachEquivalentes,
                  codigoReferencia
                }) => {

    const { nomeProduto } = useSelector((state => state.configuracao));

    const navigation = useNavigation();
    const [precoVendaFormatado, setPrecoVendaFormatado] = useState();
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        if (precoVenda || valorVenda) {
            setPrecoVendaFormatado(numberFormatBRL(precoVenda || valorVenda));
        } else {
            setPrecoVendaFormatado(numberFormatBRL(0));
        }
    }, [precoVenda])


    const handleImageModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (

        <View style={styles.containerProduto}>

            <View style={dataInicioPromocao ? styles.containerDescricaoPromocao : styles.containerDescricao}>
                <View style={ dataInicioPromocao ? styles.containerImagemPromocao: styles.containerImagem}>
                    <TouchableOpacity onPress={handleImageModal}>
                        <FastImage
                            style={styles.imgProducts}
                            source={caminhoImagem ? { uri: caminhoImagem, priority: FastImage.priority.high } : imagemSemFoto}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                    </TouchableOpacity>

                </View>

                <View style={styles.viewDescription}>

                    <Text
                        style={dataInicioPromocao ? styles.nomeProdutoPromocao : styles.nomeProduto}
                    >
                        { nomeProduto === 'Descrição' ? descricao : nomeProduto === 'Aplicação' ? aplicacao : 'SEM NOME'}
                    </Text>

                    <Text style={dataInicioPromocao ? styles.infoProdutoPromocao : styles.infoProduto}>{codigoInterno}</Text>

                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={dataInicioPromocao ? styles.infoProdutoPromocao : styles.infoProduto}>{`catálogo: ${codigoReferencia ? codigoReferencia : ''}`}</Text>
                    </View>
                    {dataInicioPromocao && (
                        <Text style={[styles.infoProduto, { marginRight: '25%', color: '#388E3C', fontWeight: '600' }]}>{`R$${valorPromocao ? valorPromocao.toFixed(2) : '0,00'}`} </Text>
                    )}
                </View>

                <TouchableOpacity style={styles.productEquivalent}
                    onPress={() =>
                        qtdProdutoEquivalente > 0 ? seachEquivalentes(codigoInterno) : qtdEquivalentes > 0 ? seachEquivalentes(codigoInterno) : null
                    }
                >
                    <Text style={[globalStyles.text, dataInicioPromocao ? styles.textEquivalentPromocao : styles.textEquivalent]}>{qtdProdutoEquivalente > 0 ? qtdProdutoEquivalente : qtdEquivalentes > 0 ? qtdEquivalentes : 0}</Text>
                    <Icon name='list-circle' size={25} color={dataInicioPromocao ? '#2f4f4f' : '#00A0D3'} />
                </TouchableOpacity>
            </View>

            <View style={styles.viewInfo}>
                <View style={styles.infoColumns}>
                    <Text style={styles.infoProduto}>Estoque</Text>
                    <Text style={[globalStyles.text, styles.infoProdutoText]}>{saldoEstoque} </Text>
                </View>
                <View style={styles.infoColumns}>
                    <Text style={styles.infoProduto}>Marca</Text>
                    <Text style={[globalStyles.text, styles.infoProdutoText]}>{marcaDescricao} </Text>
                </View>
                <View style={styles.infoColumns}>
                    <Text style={styles.infoProduto}>Valor</Text>
                    <Text style={[globalStyles.text, styles.infoProdutoText]}>{precoVendaFormatado}</Text>
                </View>
            </View>

            <Modal visible={showModal} transparent={true} animationType="none">
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={closeModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                    </TouchableOpacity>
                    <Image
                        style={styles.modalImage}
                        source={caminhoImagem ? { uri: caminhoImagem } : imagemSemFoto}
                    />
                </View>
            </Modal>

        </View>
    );
};

