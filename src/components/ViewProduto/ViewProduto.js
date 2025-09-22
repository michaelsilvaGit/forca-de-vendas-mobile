import React, { useState, useEffect, useCallback } from 'react';
import { View, TextInput, Text, TouchableOpacity, Alert, Modal, Image, TouchableWithoutFeedback } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import ImagemSemFoto from '../../assets/images/sem_foto.png';
import { useDispatch } from 'react-redux';
import { addItems, updateItem } from '../../slices/produtoSlice';
import { useIsFocused } from '@react-navigation/native';
import { itensPedidoModel } from '../../screens/NovoPedido/pedido.model';
import numberFormatBRL from '../../utils/numberFormatBRL';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import Styles from './Styles';
import formatValueInputDesconto from '../../utils/formatValueInputDesconto';
import { globalStyles } from '../../globalStyles';
import EditarItem from '../ItemsPedido/EditarItem';



const ViewProduto = (props) => {

    const isFocused = useIsFocused();
    const dispatch = useDispatch();

    const { nomeProduto } = useSelector((state => state.configuracao));
    const {items} = useSelector((state) => state.produto);

    const [dataPromocao, setDataPromocao] = useState('');
    const [valorPromocao, setValorPromocao] = useState('');
    const [valorAtacarejo, setValorAtacarejo] = useState('');
    const [qtdAtacarejo, setQtdAtacarejo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [aplicacao, setAplicacao] = useState('');
    const [codigoInterno, setCodigoInterno] = useState(0);
    const [marca, setMarcaDescricao] = useState('');
    const [estoque, setEstoque] = useState(0);
    const [estoquePadrao, setEstoquePadrao] = useState(0);
    const [valorUnitario, setValorUnitario] = useState(0);
    const [saveValorUnitario, setSaveValorUnitario] = useState(0);
    const [valorTotal, setValorTotal] = useState(0);
    const [qtdVenda, setQtdVenda] = useState(0);
    const [valorDescontoVenda, setValorDescontoVenda] = useState(0);
    const [porcentDescontoVenda, setPorcentDescontoVenda] = useState(0);
    const [valorTotalCalculoDesconto, setValorTotalCalculoDesconto] = useState(0);
    const [showEquivantes, setShowEquivalentes] = useState(false);
    const [caminhoImagem, setCaminhoImagem] = useState('');
    const [overPrice, setOverPrice] = useState('');
    const [codCatalogo, setCodCatalogo] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [valorUnitarioDefault, setValorUnitarioDefault] = useState(0);
    const [qtdMinimoVenda, setQtdMinimoVenda] = useState();


    

    useEffect(() => {

        if (isFocused) {

            clearStatesEdit();

            let percentualDesconto = 0
            let valorDesconto = 0
            let precoVendaUnitario = 0
            let valorUnitarioDefault = 0 
            let precoVenda = 0
            let valorVenda = 0


            if (props.porcentagemDesconto !== undefined && !isNaN(Number(props.porcentagemDesconto))) {
                percentualDesconto = Number(props.porcentagemDesconto).toFixed(2);
            }

            if (props.valorDesconto !== undefined && !isNaN(Number(props.valorDesconto))) {
                valorDesconto = Number(props.valorDesconto).toFixed(2);
            }

            if (props.valorUnitarioDefaultEdit !== undefined && !isNaN(Number(props.valorUnitarioDefaultEdit))) {
                valorUnitarioDefault = Number(props.valorUnitarioDefaultEdit).toFixed(2);
            }

            if (props.precoVendaEdit !== undefined && !isNaN(Number(props.precoVendaEdit))) {
                precoVendaUnitario = Number(props.precoVendaEdit).toFixed(2);
            }

            if (props.precoVenda !== undefined && !isNaN(Number(props.precoVenda))) {
                precoVenda = Number(props.precoVenda).toFixed(2);
            }

            if (props.valorVenda !== undefined && !isNaN(Number(props.valorVenda))) {
                valorVenda = Number(props.valorVenda).toFixed(2);
            }
    
            setMarcaDescricao(props.marcaDescricaoEdit || props.marcaDescricao);
            setCodCatalogo(props.codigoReferenciaEdit || props.codigoReferencia);
            setValorPromocao(props.valorPromocaoEdit || props.valorPromocao);
            setDataPromocao(props.dataInicioPromocaoEdit || props.dataInicioPromocao);
            setValorAtacarejo(props.valorAtacarejoEdit || props.valorAtacarejo);
            setQtdAtacarejo(props.quantidadeAtacarejoEdit || props.quantidadeAtacarejo);
            setDescricao(props.descricaoEdit || props.descricao);
            setAplicacao(props.aplicacaoEdit || props.aplicacao);
            setCaminhoImagem(props.caminhoImagemEdit || props.caminhoImagem);
            setEstoque(props.saldoEstoqueEdit || props.saldoEstoque);
            setEstoquePadrao(props.saldoEstoquePadrao);
            setCodigoInterno(props.codigoInternoEdit || props.codigoInterno);
            setValorUnitario(precoVendaUnitario || precoVenda || valorVenda || 0);
            setValorUnitarioDefault(valorUnitarioDefault || precoVenda || valorVenda || 0);
            setSaveValorUnitario(precoVendaUnitario || precoVenda || valorVenda || 0);
            setQtdVenda(props.qtdVendaEdit || props.qtdMinimoVenda || 1);
            setPorcentDescontoVenda(percentualDesconto || 0);
            setValorDescontoVenda(valorDesconto || 0);
            setValorTotal(props.valorTotalItem || 0);
            setQtdMinimoVenda(props.qtdMinimoVendaEdit || props.qtdMinimoVenda || 1);
        }

        //console.log('QUANTIDADE MINIMA: ', qtdMinimoVenda);

    }, [props, isFocused]);




    useEffect(() => {

        calcularValorTotal()
        calcularTotalValorDesconto()

    }, [qtdVenda, valorUnitario])


    useEffect(() => {

        calcularTotalValorDesconto()

    }, [valorDescontoVenda])


    //Calcula o valor unitario do produto vezes a quantidade e seta ao valor total
    const calcularValorTotal = () => {

        const valorFormatado = formatValueInputDesconto(valorUnitario);

        let result = qtdVenda * valorFormatado

        setValorTotalCalculoDesconto(result)
        setValorTotal(result)

    }

    //Subtrai o valor (unitario x quantidade) com o desconto e atualiza o valor total
    const calcularTotalValorDesconto = () => {

        const numInputFormatado = formatValueInputDesconto(valorDescontoVenda);
        const valorFormatado = formatValueInputDesconto(valorUnitario);

        let result = (qtdVenda * valorFormatado) - numInputFormatado
        setValorTotal(result > 0 ? result : 0);

    }

    const onChangePrecoInput = (value) => {
        setValorUnitario(value);
    }


    const onChangeDescontoInput = useCallback((numInput, input) => { 

        if (input === 'porcentagem') {

            setPorcentDescontoVenda(numInput)

            let resutadoValor = (numInput / (100)) * valorTotalCalculoDesconto

            setValorDescontoVenda(resutadoValor.toFixed(2))


        } else if (input === 'valor') {

            setValorDescontoVenda(numInput);

            const numInputFormatadoV = formatValueInputDesconto(numInput);

            let resutadoValor = (numInputFormatadoV * (100)) / valorTotalCalculoDesconto;

            setPorcentDescontoVenda(resutadoValor.toFixed(2))
        }
    }, [valorTotalCalculoDesconto]);



    const handleClickAdicionarItem = () => {

        const itemData = {
            id: props.id,
            saldoEstoqueEdit: estoque,
            saldoEstoquePadraoEdit: estoquePadrao,
            dataInicioPromocaoEdit: dataPromocao,
            descricaoEdit: descricao,
            aplicacaoEdit: aplicacao,
            caminhoImagemEdit: caminhoImagem,
            codigoInternoEdit: codigoInterno,
            codigoReferenciaEdit: codCatalogo,
            valorPromocaoEdit: valorPromocao,
            valorAtacarejoEdit: valorAtacarejo,
            quantidadeAtacarejoEdit: qtdAtacarejo,
            marcaDescricaoEdit: marca,
            qtdVendaEdit: qtdVenda,
            qtdMinimoVendaEdit: qtdMinimoVenda,
            valorUnitarioDefaultEdit: valorUnitarioDefault,
            precoVendaEdit: valorUnitario,
            porcentagemDesconto: formatValueInputDesconto(porcentDescontoVenda).toFixed(2),
            valorDesconto: formatValueInputDesconto(valorDescontoVenda).toFixed(2),
            valorTotalItem: valorTotal
        }

        if (valorTotal > 0) {

            const isValid = validarQtdMinimo();

            if(isValid){
                let finded = items.find(item => item.id === itemData.id)
                if (!props.editItem) {
                    dispatch(addItems(itemData));
                    !finded && props.addItem(itemData);
                } else {
                    dispatch(updateItem(itemData));
                    props.onUpdateItem(props.id, itemData);
                    props.onCancel();
                }
            }

        } else {
            Alert.alert('Atenção!', 'Produto com preço de venda zerado!');
        }

    }


    const clearStatesEdit = () => {
        setQtdVenda(0);
        setPorcentDescontoVenda(0);
        setValorDescontoVenda(0);
    }

    //VERIFICA A QTD DA VENDA E TROCA O VALOR O UNITARIO
    useEffect(() => {

        setarAtacarejoValorUnitario();

    }, [qtdVenda]);


    const setarAtacarejoValorUnitario = () => {
        if(qtdAtacarejo && valorAtacarejo != null){
            let valorPromocaoAux = Number(valorAtacarejo);
            qtdVenda >= qtdAtacarejo && setValorUnitario(valorPromocaoAux.toFixed(2));
            qtdVenda < qtdAtacarejo && setValorUnitario(valorUnitarioDefault);
        }
    }

    //AUMENTAR E DIMINUIR CAMPO QUANTIDADE
    const handleQtdAdd = (type) => {

        if (type === 'add') {

            setQtdVenda(prev => prev + qtdMinimoVenda);

        } else if (type === 'remove') {
            
            qtdVenda > qtdMinimoVenda && setQtdVenda(prev => prev - qtdMinimoVenda);
        }

    };

    const validarQtdMinimo = () => {
        console.log('QTD DO INPUT: ', qtdVenda)

        if (qtdVenda % qtdMinimoVenda === 0) {
            return true
          } else {
            setQtdVenda(qtdMinimoVenda);
            return Alert.alert('Atenção!', `A quantidade mínima de venda desse produto é ${qtdMinimoVenda} unidades e múltiplo de ${qtdMinimoVenda}!`);
          }
    }


    //AUMENTAR A IMAGEM AO CLICAR NELA
    const handleImageModal = useCallback(() => {
        setShowModal(true);
    }, []);

    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    //TROCA O VALOR UNITARIO DA VENDA PARA O VALOR UNITARIO DA PROMOÇÃO
    const trocarValorUnitario = (type) => {

        if(valorUnitario != valorPromocao && type === 'promoção'){

            let valorPromocaoAux = Number(valorPromocao);
            setValorUnitario(valorPromocaoAux.toFixed(2));
        
        }else{
            setValorUnitario(saveValorUnitario);
        }

    };



    return (

        <>
            <View style={Styles.containerPrincipal}>

                <View style={Styles.containerHeader}>
                    <View style={valorPromocao > 0 ? Styles.containerImagemPromocao : Styles.containerImagem}>
                        <TouchableOpacity style={{}} onPress={handleImageModal}>
                            <FastImage
                                style={{ width: '99%', height: '99%' }}
                                source={caminhoImagem ? { uri: caminhoImagem, priority: FastImage.priority.high } : ImagemSemFoto}
                                resizeMode={FastImage.resizeMode.contain}
                            />
                        </TouchableOpacity>

                    </View>
                    <View style={{ flex: 1, marginLeft: 7 }}>
                        <Text
                            numberOfLines={4}
                            style={valorPromocao > 0 ? Styles.textDescricaoPromocao : Styles.textDescricao}
                        >
                            {nomeProduto === 'Descrição' ? descricao : nomeProduto === 'Aplicação' ? aplicacao : 'SEM NOME'}
                        </Text>
                    </View>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    <View style={{ width: '100%', paddingLeft: 8, paddingTop: 3 }}>
                        <Text style={Styles.textCodigo}>{`código: ${codigoInterno}`}</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[Styles.textCodigo, { marginRight: 5 }]}>{`catálogo: ${codCatalogo ? codCatalogo : ''}`}</Text>
                            {valorPromocao > 0 && (                         
                                <TouchableWithoutFeedback onPress={() => !props.editItem && trocarValorUnitario('promoção')} >
                                    <Text style={[Styles.textCodigo, { fontSize: 21, color: '#388E3C' }]}>{`R$${valorPromocao > 0 ? Number(valorPromocao).toFixed(2) : '0,00'}`}</Text>                  
                                </TouchableWithoutFeedback>                           
                            )}
                        </View>
                    </View>
                </View>

                <View style={Styles.ContainerMeio}>
                    <View style={Styles.containerQtd}>
                        <View style={Styles.containerInfoQtd}>
                            <TouchableOpacity onPress={() => handleQtdAdd('remove')}
                                activeOpacity={10}
                                style={[Styles.botoesQtd, { width: 24 }]}>
                                <Text style={{ color: '#FFF', fontSize: 30 }}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={[globalStyles.text, Styles.inputQtd]}
                                keyboardType="numeric"
                                onChangeText={(qtd) => setQtdVenda(Number(qtd))}
                                value={qtdVenda.toString()}
                                onBlur={() => {validarQtdMinimo()}}
                            />
                            <TouchableOpacity onPress={() => handleQtdAdd('add')}
                                activeOpacity={10}
                                style={[Styles.botoesQtd, { width: 25 }]}>
                                <Text style={{ color: '#FFF', fontSize: 22 }}>+</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{}}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>ESTOQUE: </Text>
                                <Text style={Styles.textEstoque}>{estoque ? estoque : 0}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>ESTOQUE LOJA 1: </Text>
                                <Text style={Styles.textEstoque}>{estoquePadrao ? estoquePadrao : 0}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={[globalStyles.text, { fontSize: 18 }]}>Marca: </Text>
                                <Text style={Styles.textEstoque}>{marca}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={Styles.containerValorEquivalente}>

                        <View style={{ width: '48%' }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[globalStyles.text, { fontSize: 20 }]}>VALOR:</Text>
                                <Text style={[valorUnitario == valorPromocao ? Styles.textValorUnitarioPromocao : qtdAtacarejo && valorAtacarejo != null && qtdVenda >= qtdAtacarejo && valorUnitario == valorAtacarejo ? Styles.textValorUnitarioAtacarejo : Styles.textValorUnitario]}>{numberFormatBRL(formatValueInputDesconto(valorUnitario || 0))}</Text>
                                {qtdAtacarejo && valorAtacarejo != null && qtdVenda >= qtdAtacarejo && valorAtacarejo == valorUnitario && (
                                    <Text style={[Styles.textCodigo, { textAlign:'center', fontSize: 21, color: '#006b93' }]}> Atacarejo</Text>
                                )}
                            </View>
                            <View style={{ width: '100%' }}>
                                <TextInputMask
                                    style={[globalStyles.text, Styles.inputPreco]}
                                    type='money'
                                    options={{
                                        precision: 2,
                                        separator: '.',
                                        unit: '',
                                        suffixUnit: ''
                                    }}
                                    onChangeText={(text) => onChangePrecoInput(text)}
                                    value={valorUnitario.toString()}
                                    keyboardType="numeric"
                                    onBlur={() => {
                                        if (valorUnitario == 0 || valorUnitario == '') {
                                            setValorUnitario(valorUnitarioDefault);
                                            setarAtacarejoValorUnitario();
                                        }
    
                                    }}
                                />
                            </View>
                        </View>
  
                        <View style={{ width: '48%' }}>
                            {!props.editItem && props.produtosEquivalentes.length === 0 && (
                                <TouchableOpacity style={Styles.botaoEquivalente}
                                    activeOpacity={0.7}
                                    onPress={() => {
                                        props.qtdProdutoEquivalente > 0 ? props.seachEquivalentes(codigoInterno) : props.qtdEquivalentes > 0 ? props.seachEquivalentes(codigoInterno) : null

                                    }}
                                >
                                    <Text style={{ fontSize: 16, color: '#FFF', textAlign: 'center' }}>{`${props.qtdProdutoEquivalente > 0 ? props.qtdProdutoEquivalente : props.qtdEquivalentes > 0 ? props.qtdEquivalentes : 0} EQUIVALENTES`}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        
                    </View>

                    <View style={Styles.containerDesconto}>
                        <View style={{ width: '48%' }}>
                            <Text style={[globalStyles.text, { fontSize: 19 }]}> % DESCONTO</Text>
                            <TextInputMask
                                style={[globalStyles.text, Styles.inputDesconto]}
                                type='money'
                                options={{
                                    precision: 2,
                                    separator: '.',
                                    unit: '',
                                    suffixUnit: ''
                                }}
                                onChangeText={(text) => onChangeDescontoInput(text, 'porcentagem')}
                                value={porcentDescontoVenda.toString()}
                                keyboardType="numeric"
                                onBlur={() => {
                                    if (porcentDescontoVenda === 0 || porcentDescontoVenda == '') {
                                        let porcent = 0
                                        setPorcentDescontoVenda(porcent.toFixed(2));
                                    }

                                }}

                            />
                        </View>

                        <View style={{ width: '48%' }}>
                            <Text style={[globalStyles.text, { fontSize: 19 }]}> R$ DESCONTO</Text>
                            <TextInputMask
                                style={[globalStyles.text, Styles.inputDesconto]}
                                type='money'
                                options={{
                                    precision: 2,
                                    separator: '.',
                                    unit: '',
                                    suffixUnit: ''
                                }}
                                onChangeText={(text) => onChangeDescontoInput(text, 'valor')}
                                value={valorDescontoVenda.toString()}
                                keyboardType="numeric"
                                onBlur={() => {

                                    if (valorDescontoVenda === 0 || valorDescontoVenda == '') {
                                        let valor = 0
                                        setValorDescontoVenda(valor.toFixed(2));
                                    }
                                }}
                            />
                        </View>
                    </View>
                </View>
                <View style={Styles.containerFooter}>
                    <View>
                        <Text style={[globalStyles.text, { fontSize: 20 }]}>TOTAL</Text>
                        <Text style={Styles.textValorTotal}>{isNaN(valorTotal) ? numberFormatBRL(0) :  numberFormatBRL(valorTotal)}</Text>
                    </View>
                    <TouchableOpacity style={Styles.botaoAdicionar}
                        onPress={handleClickAdicionarItem}
                    >
                        <Text style={{ color: '#FFF', fontSize: 17 }}>{props.editItem ? 'Editar item' : 'Adicionar item'}</Text>
                    </TouchableOpacity>
                </View>

                <Modal visible={showModal} transparent={true} animationType="none">
                    <View style={Styles.modalContainer}>
                        <TouchableOpacity style={Styles.modalCloseButton} onPress={closeModal}>
                            <Text style={Styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <Image
                            style={Styles.modalImage}
                            source={caminhoImagem ? { uri: caminhoImagem } : ImagemSemFoto}
                        />
                    </View>
                </Modal>
            </View>
        </>
    )

}




export default ViewProduto