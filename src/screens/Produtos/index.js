import React, { useState, useEffect, useRef  } from "react";
import { View, Text, TextInput, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Ionicons';
import ViewProduto from './ViewProduto';
import DropdownPesquisa from "../../components/Dropdowns/DropdownPesquisa";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { getProducts, seachEquivalentes, resetProdutoEquivalentes, resetProdutos } from "../../slices/produtoSlice";
import { getMarca } from "../../slices/marcaSlice";
import { getCategoria } from "../../slices/categoriaSlice";
import { getListPrice } from "../../slices/listaPrecoSlice";
import { getLoja } from "../../slices/lojaSlice";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import ModalFilter from "../../components/ModalFilter/ModalFilter";
import verificarToken from "../../utils/verificarToken";
import { showMensagem, mensagemConfig } from "../../components/Mensagem/Mensagem";
import Mensagem from "react-native-toast-message";
import { limitItensFilter } from "../../enum";

import styles from "./styles";
import FilterTag from "../../components/FilterTag/FilterTag";
import { globalStyles } from "../../globalStyles";


const tipoPesquisa = [
    { id: 1, name: 'Geral' },
    { id: 2, name: 'Descrição' },
    { id: 3, name: 'Marca' },
    { id: 4, name: 'Código Interno', },
    { id: 5, name: 'Código Catalogo', },
    { id: 6, name: 'Código de Barra' }
];



export default () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const { produtos, produtosEquivalentes, loading, loadingEequivalente, error, message } = useSelector((state) => state.produto);
    const { listaPreco } = useSelector((state) => state.listaPreco);
    const { listaLoja } = useSelector((state) => state.loja);
    const { qtdTelaProdutos, nomeProduto } = useSelector((state) => state.configuracao);
    const { marcas: marcasSlice } = useSelector((state) => state.marca);
    const { categorias, categoriasFilhas } = useSelector((state) => state.categoria);
    const { tenant } = useSelector((state) => state.auth)

    const [textSearch, setTextSearch] = useState('');
    const [listPriceSearch, setListPriceSearch] = useState('');
    const [listLojaSearch, setListLojaSearch] = useState('');
    const [searchBy, setSearchBy] = useState('Geral');
    const [idProdutoEquivalente, setIdProdutoEquivalente] = useState('');
    const [tablePriceDropdown, setTablePriceDropdown] = useState([]);
    const [openLoading, setOpenLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const [listMarca, setListMarca] = useState([]);
    const [listCategoria, setListCategoria] = useState([]);
    const [listCategoriasFilhas, setListCategoriasFilhas] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState([]);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState([]);
    const [categoriaFilhaSelecionada, setCategoriaFilhaSelecionada] = useState([]);
    const [promocao, setPromocao] = useState(false);
    const [filtrar, setFiltrar] = useState(false);
    const [limpar, setLimpar] = useState(false);
    const [tagsArray, setTagsArray] = useState([]);
    const [showTags, setShowTags] = useState(false);
    const [page, setPage] = useState(0);
    const [tableLojaDropdown, setTableLojaDropdown] = useState('');
    const [alturaDescricao, setAlturaDescricao] = useState([]);
    const [qtdItensFilterMarca, setQtdItensFilterMarca] = useState(limitItensFilter.qtd);
    const [qtdItensFilterGrupo, setQtdItensFilterGrupo] = useState(limitItensFilter.qtd);
    const [qtdItensFilterLinha, setQtdItensFilterLinha] = useState(limitItensFilter.qtd);



    /////// Configuração RecyclerListView /////////
    const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(produtosEquivalentes.length > 0 ? produtosEquivalentes : produtos);
    const { width } = Dimensions.get('window');
    const layoutProvider = new LayoutProvider(
        index => 0,
        (type, dim, index) => {
            dim.width = width;
            dim.height = alturaDescricao[index] + 170;
        }
    );
    const rowRenderer = (type, data, index) => {
        return <ViewProduto {...data} seachEquivalentes={handleSearchEquivalentes} />;
    };

    const medirAltura = (text, index) => {
        const estimatedHeight = Math.ceil(text.length); // Calcule baseado no comprimento do texto
        setAlturaDescricao(prevHeights => {
            const newHeights = [...prevHeights];
            newHeights[index] = estimatedHeight;
            return newHeights;
        });
    };
    //////////////////////////////////////////////

    
    useEffect(() => {

        if(produtosEquivalentes.length > 0){
            produtosEquivalentes && produtosEquivalentes.forEach((produto, index) => {
                const pesquisaBy = nomeProduto === 'Descrição' ? produto.descricao : produto.aplicacao;
                medirAltura(pesquisaBy, index);
            });

        }else{
            produtos && produtos.forEach((produto, index) => {
                const pesquisaBy = nomeProduto === 'Descrição' ? produto.descricao : produto.aplicacao;
                medirAltura(pesquisaBy, index);
            });
        }
    }, [produtos, produtosEquivalentes]);


    useEffect(() => {

        if (isFocused) {
            
            verificarToken(navigation, dispatch);

            setTextSearch('');
            dispatch(resetProdutos());
            produtosEquivalentes.length > 0 && closeProdutoEquivalentes();
        }

    }, [isFocused])


    //CHAMA OS TODOS OS PRODUTOS
    useEffect(() => {

        if(isFocused){
            
            let data = {
                filters: {
                    pesquisa: textSearch.toUpperCase(),
                    status: 'A',
                    tipoPesquisa: searchBy,
                    idProdutoEquivalente: '0',
                    idListaPreco: listPriceSearch,
                    filtrarMarca: marcaSelecionada.join(','),
                    filtrarCategoria: categoriaSelecionada.join(','),
                    filtrarCategoriaFilha: categoriaFilhaSelecionada.join(','),
                    filtrarPromocao: promocao
                },
                page: page,
                size: qtdTelaProdutos,
                sorting: {
                    undefined: 'asc'
                },
                tenant: 'ferragista'
            };

            dispatch(getProducts(data));
            //setOpenLoading(true);
        }


    }, [isFocused, textSearch, searchBy, listPriceSearch, listLojaSearch, filtrar, limpar]);


    //CHAMA A LOJA 
    useEffect(() => {

        if (isFocused) {

            setTableLojaDropdown([]);

            let data = {

                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idProdutoEquivalente: '0',
                    idListaPreco: '',
                    idFormaPagamento: ''

                },
                page: 0,
                size: 500,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant

            }

            dispatch(getLoja(data))
        }

    }, [isFocused, tenant]);


    //CHAMA A LISTA DE PREÇO
    useEffect(() => {

        if (isFocused) {

            setTablePriceDropdown([]);

            let data = {

                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idProdutoEquivalente: '0',
                    idListaPreco: ''

                },
                page: 0,
                size: 100,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            }

            dispatch(getListPrice(data));

        }

    }, [isFocused, tenant]);


    //CHAMA TODAS AS MARCAS
    useEffect(() => {

        if (isFocused) {

            let data = {

                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idProdutoEquivalente: '0',
                    idListaPreco: ''

                },
                page: 0,
                size: 1000,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            }

            dispatch(getMarca(data));

        }

    }, [isFocused, tenant]);


    //CHAMA AS CATEGORIAS
    useEffect(() => {

        if (isFocused) {


            let data = {

                filters: {
                    pesquisa: '',
                    status: 'A',
                    tipoPesquisa: '',
                    idProdutoEquivalente: '0',
                    idListaPreco: ''

                },
                page: 0,
                size: 1000,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            }

            dispatch(getCategoria(data));

        }

    }, [isFocused, tenant]);


    //CHAMA OS PRODUTOS EQUIVALENTES
    useEffect(() => {

        let data = {

            filters: {
                pesquisa: '',
                status: 'A',
                tipoPesquisa: '',
                codigoInterno: idProdutoEquivalente, 
                idListaPreco: listPriceSearch,
                idLoja: listLojaSearch,
                tipoPreco: 'S',
                precoApp: 'S'
            },

            page: page,
            size: qtdTelaProdutos,
            sorting: {
                undefined: 'asc'    
            },
            tenant: tenant
        }

        if(idProdutoEquivalente){
            dispatch(seachEquivalentes(data));
        }
        
    }, [idProdutoEquivalente, listPriceSearch, tenant]);



    //MONTA A LISTA DE LOJA NO DROPDOWN QUE VEM DO SLICE
    useEffect(() => {

        setListLojaSearch('');

        if (listaLoja) {
            listaLoja.map((item) => {
                setTableLojaDropdown(prevState => [...prevState, { id: item.id, name: item.pessoaRazaoSocial }]);
            });

            setListLojaSearch(listaLoja[0].id);
        }
    }, [listaLoja])


    //MONTA A LISTA DE PREÇO NO DROPDOWN QUE VEM DO SLICE
    useEffect(() => {

        setListPriceSearch('');

        if(listaPreco){
            listaPreco.map((item) => {
                setTablePriceDropdown(prevState => [...prevState, { id: item.id, name: item.descricao }]);
            });

            setListPriceSearch(listaPreco[0].id);

        }
    }, [listaPreco]);


    //MONTA A LISTA DE MARCA QUE VEM DO SLICE
    useEffect(() => {

        setListMarca([]);

        if(marcasSlice){
            marcasSlice.map((item) => {
                setListMarca(prevState => [...prevState, { id: item.id, nome: item.descricao }]);
            });

        }

    }, [marcasSlice]);

    //MONTA A LISTA DE CATEGORIA e SUBCATEGORIA QUE VEM DO SLICE
    useEffect(() => {

        setListCategoria([]);
        setListCategoriasFilhas([]);

        if(categorias){
            categorias.map((item) => {
                setListCategoria(prevState => [...prevState, { id: item.id, nome: item.descricao }]);
            });

        }

        if(categoriasFilhas){
            categoriasFilhas.map((item) => {
                setListCategoriasFilhas(prevState => [...prevState, { id: item.id, nome: item.descricao, idPai: item.idPai }]);
            });

        }

    }, [categorias]);


    //SELECIONA AS MARCAS PARA FILTRO
    const toggleMarca = (data) => {
        if (marcaSelecionada.includes(data.id)) {
            setMarcaSelecionada(marcaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setMarcaSelecionada([...marcaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    };

    //SELECIONA OS GRUPOS PARA FILTRO
    const toggleCategoria = (data) => {
        if (categoriaSelecionada.includes(data.id)) {
            setCategoriaSelecionada(categoriaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setCategoriaSelecionada([...categoriaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    };

    //SELECIONA AS LINHAS PARA FILTRO
    const toggleCategoriaFilha = (data) => {
        if (categoriaFilhaSelecionada.includes(data.id)) {
            setCategoriaFilhaSelecionada(categoriaFilhaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setCategoriaFilhaSelecionada([...categoriaFilhaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    };



    const handleSearchEquivalentes = (idEquivalente) => {
        setIdProdutoEquivalente(idEquivalente);
    }

    const handleChangeSearchBy = (item) => {
        setTextSearch("");
        setSearchBy(item.name);
        setPage(0);
    };

    const handleChangeSearchByListPrice = (item) => {
        setListPriceSearch(item.id);
    }

    const handleChangeSearchByLoja = (item) => {
        setListLojaSearch(item.id);
    }

    const closeProdutoEquivalentes = () => {
        setIdProdutoEquivalente('');
        dispatch(resetProdutoEquivalentes());
    }

    const oncanceLoading = () => {
        setOpenLoading(false);
    }


    const oncloseModal = () => {
        setShowFilter(false);
        produtosEquivalentes.length > 0 && closeProdutoEquivalentes();
    }


    const handlePromocao = () => {
        setPromocao(!promocao);

        if(!promocao){
            setTagsArray( prev => [...prev, 'PROMOÇÃO']);
        }else{
            setTagsArray(tagsArray.filter(tag => tag !== 'PROMOÇÃO'));
        }
        
    }

    const handlefiltrar = () => {
        setFiltrar(!filtrar);
        oncloseModal();
        setShowTags(true);

        if(marcaSelecionada.length === 0 && categoriaSelecionada.length === 0 && categoriaFilhaSelecionada.length === 0){
            handleLimpar();
        }
    }

    const handleLimpar = () => {
        setMarcaSelecionada([]);
        setCategoriaSelecionada([]);
        setCategoriaFilhaSelecionada([]);
        setPromocao(false);
        setLimpar(!limpar);
        setTagsArray([]);
        setShowTags(false);
        oncloseModal();
        setQtdItensFilterMarca(limitItensFilter.qtd);
        setQtdItensFilterGrupo(limitItensFilter.qtd);
        setQtdItensFilterLinha(limitItensFilter.qtd);
    }

    useEffect(() => {
        if(error && message !== ''){
            showMensagem(false, message);
        }
    }, [message, error])


    const handleOnChangeSearchInput = (text) => {
        setTextSearch(text);
        produtosEquivalentes.length > 0 && closeProdutoEquivalentes();
    }


    const addQtdItemsFilter = (nome, qtdIitems) => {
        if(nome === 'Marca'){
            setQtdItensFilterMarca(qtdIitems);
        }else if(nome === 'Grupo'){
            setQtdItensFilterGrupo(qtdIitems);
        }else if(nome === 'Linha'){
            setQtdItensFilterLinha(qtdIitems);
        }
    }




    return (
        <>  

            <Mensagem config={mensagemConfig} />

            <View style={styles.container}>

                <View style={styles.containerSearchInput}>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={styles.inputSearch} >
                            <Icon name='search' size={20} color='#0a6c91' style={{ marginRight: 3 }} />
                            <TextInput
                                style={[globalStyles.text, { width: '87%' }]}
                                placeholderTextColor={'#999999'}
                                placeholder='Pesquisar Produto'
                                keyboardType={searchBy === 'Código' ? 'numeric' : 'default'}
                                onChangeText={(text) => {handleOnChangeSearchInput(text)}}
                                value={textSearch}
                                autoCorrect={false}
                                autoComplete="off"
                                autoCapitalize="none"
                            />
                        </View>
                        <TouchableOpacity
                            onPress={() => setShowFilter(true)} // Alterna o filtro
                            style={styles.filterButton}
                        >
                            <Icon name='filter' size={20} color='#0a6c91' />
                            {showTags && tagsArray.length > 0 && (
                                <View style={{ position: "absolute", top: 30, right: 10, height: 8, width: 8, borderRadius: 50, backgroundColor: 'red'}}/>
                            )}
                        </TouchableOpacity>
                    </View>     

                    <ModalFilter
                        onClose={oncloseModal}
                        listMarca={listMarca}
                        listCategoria={listCategoria}
                        listCategoriasFilhas={listCategoriasFilhas}
                        marcaSelecionada={marcaSelecionada}
                        categoriaSelecionada={categoriaSelecionada}
                        categoriaFilhaSelecionada={categoriaFilhaSelecionada}
                        toggleMarca={toggleMarca}
                        toggleCategoria={toggleCategoria}
                        toggleCategoriaFilha={toggleCategoriaFilha}
                        filtrar={handlefiltrar}
                        limpar={handleLimpar}
                        promocao={promocao}
                        Addpromocao={handlePromocao}
                        isModalVisible={showFilter}
                        showTags={tagsArray}
                        addQtdItemsFilter={addQtdItemsFilter}
                        qtdItensFilterGrupo={qtdItensFilterGrupo}
                        qtdItensFilterMarca={qtdItensFilterMarca}
                        qtdItensFilterLinha={qtdItensFilterLinha}
                    />   

                    <View style={{ width: '100%', marginTop: 5 }}>
                        <DropdownPesquisa
                            tipoPesquisa={tableLojaDropdown}
                            buttonDefault={listaLoja ? listaLoja[0].pessoaRazaoSocial : 'Loja'}
                            onSelect={handleChangeSearchByLoja} />
                    </View>                         
   
                    <View style={styles.containerDropdow}>
                        <View style={{ width: '49%' }}>
                            <DropdownPesquisa
                            tipoPesquisa={tipoPesquisa}
                            buttonDefault={'Geral'}
                            onSelect={handleChangeSearchBy} />
                        </View>
                        <View style={{ width: '49%' }}>
                            <DropdownPesquisa
                            tipoPesquisa={tablePriceDropdown}
                            buttonDefault={listaPreco ? listaPreco[0].descricao : 'Tabela de Preços'}
                            onSelect={handleChangeSearchByListPrice} />
                        </View>
                    </View>

                </View>

                {showTags && tagsArray.length > 0 && (
                    <View style={{ paddingVertical: 7, paddingHorizontal: 3, flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: 4, marginBottom: 17, marginTop: -13, flexDirection: 'row' }}>
                        <Text style={[globalStyles.text, { fontSize: 17, fontWeight: '500', marginRight: 8, marginBottom: 3 }]}>Filtrando por:</Text>
                        <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                            {tagsArray.map((tag, index) => (
                                <FilterTag key={index} text={tag} />
                            ))}
                        </View>
                    </View>
                )}

                {produtosEquivalentes.length > 0 && !loading && (
                    
                    <TouchableOpacity activeOpacity={0.8} style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8, backgroundColor: '#f19a37', alignItems: 'center', paddingVertical: 6}} onPress={() => closeProdutoEquivalentes()}>
                        <Text style={{fontSize: 16, color: '#FFF', fontWeight: '500'}}>Fechar Equivalentes</Text>
                    </TouchableOpacity>
                )}

                <View style={styles.containerFlatList}>
                    {loading && !textSearch || loadingEequivalente ? (
                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00A0D3" />
                        </View>
                    ) : produtos && produtos.length > 0 ? (
                        <RecyclerListView
                            style={{flex: 1}}
                            dataProvider={dataProvider}
                            layoutProvider={layoutProvider}
                            rowRenderer={rowRenderer}
                        />
                    ) : (
                        <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '30%' }]}>Produto não encontrado!</Text>
                    )}
                </View>
            </View>
        </>
    );
};
