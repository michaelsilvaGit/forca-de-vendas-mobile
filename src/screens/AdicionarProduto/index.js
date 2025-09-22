import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, TextInput, Text, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import ViewProduto from "../../components/ViewProduto/ViewProduto";
import DropdownPesquisa from '../../components/Dropdowns/DropdownPesquisa';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, seachEquivalentes, resetProdutoEquivalentes, resetProdutos, resetMessageProduto } from '../../slices/produtoSlice';
import { getMarca } from "../../slices/marcaSlice";
import { getCategoria } from "../../slices/categoriaSlice";
import { getLoja } from '../../slices/lojaSlice';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ModalFilter from '../../components/ModalFilter/ModalFilter';
import FilterTag from '../../components/FilterTag/FilterTag';
import verificarToken from '../../utils/verificarToken';
import Mensagem from 'react-native-toast-message';
import { showMensagem, mensagemConfig } from '../../components/Mensagem/Mensagem';
import { limitItensFilter } from '../../enum';

import styles from './styles'
import { globalStyles } from '../../globalStyles';
import LoadingLayoutProdutoPedido from '../../components/LoadingLayoutProdutoPedido/LoadingLayoutProdutoPedido';
import { debounce } from 'lodash';
import { getDraft, mergeAndSaveDraft, addItemToDraft, updateItemInDraft, removeItemFromDraft } from '../../db/repository/pedidoRepositoryDraft';
import { ensureDraftId, setCurrentDraftId, getCurrentDraftId, clearCurrentDraftId } from '../../db/repository/pedidoRepositoryDraft';
const tipoPesquisa = [
    { id: 1, name: 'Geral' },
    { id: 2, name: 'Descrição' },
    { id: 3, name: 'Aplicação' },
    { id: 4, name: 'Marca' },
    { id: 5, name: 'Código Interno', },
    { id: 6, name: 'Código Catalogo', },
    { id: 7, name: 'Código de Barra' }
];


export default ({ route }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const dataParam = route.params;

    const {produtos, produtosEquivalentes, loading, loadingEequivalente, sucess, error, message, messageErrorProduto} = useSelector((state) => state.produto);
    const {tenant, qtdTelaProdutos, nomeProduto} = useSelector((state) => state.configuracao);
    const {marcas: marcasSlice} = useSelector((state) => state.marca);
    const {categorias, categoriasFilhas} = useSelector((state) => state.categoria);
    const { listaLoja } = useSelector((state) => state.loja);

    const [idProdutoEquivalente, setIdProdutoEquivalente] = useState('');
    const [textSearch, setTextSearch] = useState('');
    const [searchBy, setSearchBy] = useState('Geral');
    const [openLoading, setOpenLoading] = useState(false);
    const [showFilter, setShowFilter] = useState(false);
    const [listLojaSearch, setListLojaSearch] = useState('');

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
    const [loja, setLoja] = useState('');


    const draftIdFromRoute = dataParam?.idDraftSeed ?? null;
    const editPedido = dataParam?.editPedidoData ?? null;

    const [form, setForm] = useState({
                loja: '',
                cliente: '',
                transportadora: '',
                formaPagamento: '',
                observacao: '',
                itens: [],
          });


    // Se veio de "continuar rascunho", carrega e fixa o id na sessão
    useEffect(() => {
        (async () => {
            if (draftIdFromRoute) {
                setCurrentDraftId(draftIdFromRoute);
                const d = await getDraft(draftIdFromRoute);
                //setDraftId(d.id);
                if (d?.form) setForm(d.form);
            }
        })();
    }, [draftIdFromRoute]);

    //Adicionar Item no Rascunho
    const onAddItem = async (item) => {
        console.log('route.params snapshot:', editPedido ?? '<sem params>');
    
        const isEditPedito = Number(editPedido?.idPedido) > 0;

        if(!isEditPedito){
            const seed = { ...form, itens: [...(form.itens || []), item] };
            const id = await ensureDraftId(seed);
            const saved = await addItemToDraft(id, item);
            setForm(saved);
        }
    };


    /////// Configuração RecyclerListView /////////
    const dataProvider = new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(produtosEquivalentes.length > 0 ? produtosEquivalentes : produtos);
    const { width } = Dimensions.get('window');
    const layoutProvider = new LayoutProvider(
        index => 0,
        (type, dim, index) => {
            dim.width = width;
            dim.height = alturaDescricao[index] + 395;
        }
    );
    const rowRenderer = (type, data, index) => {
        return <ViewProduto {...data} seachEquivalentes={handleSearchEquivalentes} produtosEquivalentes={produtosEquivalentes} addItem={onAddItem} />;
    };

    const medirAltura = (text, index) => {
        const estimatedHeight = Math.ceil(text.length + 50); // Calcule baseado no comprimento do texto
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
        if(message !== ''){
            showMensagem(sucess, message);
        }
        dispatch(resetMessageProduto());
    }, [sucess, error, message])


    useEffect(() => {

        if (isFocused) {
            
            verificarToken(navigation, dispatch);

            setTextSearch('');
            //dispatch(resetProdutos());
            tagsArray.length > 0 && handleLimpar();
            produtosEquivalentes.length > 0 && closeProdutoEquivalentes();

            if (dataParam?.loja) {
                setLoja({ id: dataParam.loja.id, name: dataParam.loja.name });
            }
        }

    }, [isFocused]);


     //MONTA A LISTA DE LOJA NO DROPDOWN QUE VEM DO SLICE
     useEffect(() => {

        setTableLojaDropdown([]);

        if (listaLoja) {
            const lojasDropdown = listaLoja.map(item => ({ id: item.id, name: item.pessoaRazaoSocial }));
            setTableLojaDropdown(lojasDropdown);
        }

    }, [listaLoja])


    //CHAMA A FUNÇÃO DEBOUCE JUNTO COM OS PRODUTOS
    useEffect(() => {
        if (isFocused) {
            fetchProducts(textSearch);
        }

        return () => {
            fetchProducts.cancel();
        };

    }, [textSearch, searchBy, filtrar, limpar, loja, fetchProducts]);


    //FUNÇÃO PARA USAR O DEBOUCE LIMITANDO PESQUISA RAPIDA DE PRODUTOS
    const fetchProducts = useCallback(
        debounce((searchTerm) => {
            let data = {
                filters: {
                    pesquisa: searchTerm.toUpperCase(),
                    status: 'A',
                    tipoPesquisa: searchBy,
                    idProdutoEquivalente: '0',
                    idListaPreco: dataParam.cliente.listaPreco,
                    filtrarMarca: marcaSelecionada.join(','),
                    filtrarCategoria: categoriaSelecionada.join(','),
                    filtrarCategoriaFilha: categoriaFilhaSelecionada.join(','),
                    filtrarPromocao: promocao,
                    overprice: Number(dataParam.cliente.overPrice),
                    idLoja: loja.id || dataParam?.loja.id
                },
                page: page,
                size: qtdTelaProdutos,
                sorting: {
                    undefined: 'asc'
                },
                tenant: tenant
            };
    
            dispatch(getProducts(data));
            
        }, 500),
        [isFocused, textSearch, searchBy, filtrar, limpar, loja]
    );


    //CHAMA OS PRODUTOS EQUIVALENTES
    useEffect(() => {

        let data = {

            filters: {
                pesquisa: '',
                status: 'A',
                tipoPesquisa: '',
                codigoInterno: idProdutoEquivalente, 
                idListaPreco: dataParam.cliente.listaPreco,
                idLoja: loja.id,
                tipoPreco: 'S',
                overprice: Number(dataParam.cliente.overPrice),
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
        
    }, [idProdutoEquivalente, listLojaSearch, loja]);


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


   
    //MONTA A LISTA DE MARCA QUE VEM DO SLICE
    useEffect(() => {

        setListMarca([]);

        if(marcasSlice){
            marcasSlice.map((item) => {
                setListMarca(prevState => [...prevState, { id: item.id, nome: item.descricao }]);
            });

        }

    }, [marcasSlice]);

    //MONTA A LISTA DE CATEGORIA QUE VEM DO SLICE
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


    //SELECIONA A LOJA PARA O STATE
    const handleChangeSearchByLoja = useCallback((item) => {
        setLoja({id: item.id, name: item.name});
    }, []);


    const toggleMarca = useCallback((data) => {
        if (marcaSelecionada.includes(data.id)) {
            setMarcaSelecionada(marcaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setMarcaSelecionada([...marcaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    }, [marcaSelecionada]);

    const toggleCategoria = useCallback((data) => {
        if (categoriaSelecionada.includes(data.id)) {
            setCategoriaSelecionada(categoriaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setCategoriaSelecionada([...categoriaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    }, [categoriaSelecionada]);

    const toggleCategoriaFilha = useCallback((data) => {
        if (categoriaFilhaSelecionada.includes(data.id)) {
            setCategoriaFilhaSelecionada(categoriaFilhaSelecionada.filter(item => item !== data.id));
            setTagsArray(tagsArray.filter(tag => tag !== data.nome));
        } else {
            setCategoriaFilhaSelecionada([...categoriaFilhaSelecionada, data.id]);
            setTagsArray( prev => [...prev, data.nome]);
        }
    }, [categoriaFilhaSelecionada]);



    const handleSearchEquivalentes = useCallback((idEquivalente) => {
        setIdProdutoEquivalente(idEquivalente);
    }, []);


    const handleChangeSearchBy = useCallback((item) => {
        setTextSearch("");
        setSearchBy(item.name);
        setPage(0);
    }, []);


    const handleShowFilter = useCallback(() => {
        setShowFilter(true)
    }, []);
    

    const closeProdutoEquivalentes = useCallback(() => {
        setIdProdutoEquivalente('');
        dispatch(resetProdutoEquivalentes());
    }, []);


    const oncloseModal = useCallback(() => {
        setShowFilter(false);
        produtosEquivalentes.length > 0 && closeProdutoEquivalentes();
    }, [produtosEquivalentes]);


    const handlePromocao = useCallback(() => {
        setPromocao((prev) => !prev);

        if(!promocao){
            setTagsArray( prev => [...prev, 'PROMOÇÃO']);
        }else{
            setTagsArray(tagsArray.filter(tag => tag !== 'PROMOÇÃO'));
        }
        
    }, [promocao]);


    const handlefiltrar = useCallback(() => {
        setFiltrar((prev) => !prev);
        setShowTags(true);
        oncloseModal();
    }, []);

    const handleLimpar = useCallback(() => {
        setMarcaSelecionada([]);
        setCategoriaSelecionada([]);
        setCategoriaFilhaSelecionada([]);
        setPromocao(false);
        setLimpar((prev) => !prev);
        setTagsArray([]);
        setShowTags(false);
        oncloseModal();
        setQtdItensFilterMarca(limitItensFilter.qtd);
        setQtdItensFilterGrupo(limitItensFilter.qtd);
        setQtdItensFilterLinha(limitItensFilter.qtd);
    }, []);


    const handleOnChangeSearchInput = useCallback((text) => {
        setTextSearch(text);
        produtosEquivalentes.length > 0 && closeProdutoEquivalentes();
    }, [produtosEquivalentes]);

    
    const addQtdItemsFilter = useCallback((nome, qtdIitems) => {
        if(nome === 'Marca'){
            setQtdItensFilterMarca(qtdIitems);
        }else if(nome === 'Grupo'){
            setQtdItensFilterGrupo(qtdIitems);
        }else if(nome === 'Linha'){
            setQtdItensFilterLinha(qtdIitems);
        }
    }, []);



    return (
        <>
            <View style={styles.containerPrincipal}>

                <Mensagem config={mensagemConfig} />

                <View style={styles.containerCorpo}>
                    <View style={{ width: '100%', marginBottom: 5, zIndex: -1 }}>
                        <DropdownPesquisa 
                            tipoPesquisa={tableLojaDropdown} 
                            buttonDefault={loja.name} 
                            onSelect={handleChangeSearchByLoja} 
                        />
                    </View>

                    <View style={{ width: '100%', marginBottom: 1, zIndex: -1 }}>
                        <DropdownPesquisa 
                            tipoPesquisa={tipoPesquisa} 
                            buttonDefault={'Geral'} 
                            onSelect={handleChangeSearchBy} 
                        />
                    </View>

                    <View style={styles.containerSearchInput}>
                        <View style={styles.containerInput} >
                            <Icon 
                                name='search' 
                                size={20} color='#0a6c91' 
                                style={{ marginRight: 3 }} 
                            />
                            <TextInput 
                                style={[globalStyles.text, { width: '85%' }]} 
                                placeholder='Pesquisar...' 
                                placeholderTextColor={'#999999'}
                                keyboardType= {searchBy ===  'Código' ? 'numeric' : 'default'}
                                onChangeText={(text) => {handleOnChangeSearchInput(text)}}
                                value={textSearch}
                                autoCorrect={false}
                                autoComplete="off"
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleShowFilter}
                            style={styles.filterButton}
                        >
                            <Icon name='filter' size={20} color='#0a6c91' />
                            {showTags && tagsArray.length > 0 && (
                                <View style={{ position: "absolute", top: 30, right: 10, height: 8, width: 8, borderRadius: 50, backgroundColor: 'red'}}/>
                            )}
                        </TouchableOpacity>
                        
                    </View>
                    <View>
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
                            setaModalRight={'5%'}
                            modalMarginTop={'48%'}
                            showTags={tagsArray}
                            addQtdItemsFilter={addQtdItemsFilter}
                            qtdItensFilterGrupo={qtdItensFilterGrupo}
                            qtdItensFilterMarca={qtdItensFilterMarca}
                            qtdItensFilterLinha={qtdItensFilterLinha}
                        /> 
                    </View>
                    
                    {showTags && tagsArray.length > 0 && (
                        <View style={{ paddingVertical: 7, paddingHorizontal: 3, flexWrap: 'wrap', backgroundColor: '#fff', borderRadius: 4, marginBottom: 17, marginTop: -16, flexDirection: 'row' }}>
                            <Text style={[globalStyles.text, { fontSize: 17, fontWeight: '500', marginRight: 8, marginBottom: 3 }]}>Filtrando por:</Text>
                            <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                                {tagsArray.map((tag, index) => (
                                    <FilterTag key={index} text={tag} />
                                ))}
                            </View>
                        </View>
                    )}

                    {produtosEquivalentes.length > 0 && !loading && (
                        <TouchableOpacity activeOpacity={0.8} style={{ borderTopRightRadius: 8, borderTopLeftRadius: 8, backgroundColor: '#f19a37', alignItems: 'center', paddingVertical: 6 }} onPress={closeProdutoEquivalentes}>
                            <Text style={{ fontSize: 16, color: '#FFF', fontWeight: '500' }}>Fechar Equivalentes</Text>
                        </TouchableOpacity>
                    )}

                    <View style={{ flex: 1, elevation: 25, backgroundColor: '#FFF'}}>
                        {loading && !textSearch || loadingEequivalente ? (
                            <>
                                <LoadingLayoutProdutoPedido />
                                <LoadingLayoutProdutoPedido />
                                <LoadingLayoutProdutoPedido />
                                <LoadingLayoutProdutoPedido />
                            </>
                        ) : produtos && produtos.length > 0 ? (
                            <RecyclerListView
                                dataProvider={dataProvider}
                                layoutProvider={layoutProvider}
                                rowRenderer={rowRenderer}
                            />
                        ) : (
                            textSearch ? (
                                <Text style={[globalStyles.text, { textAlign: 'center', marginTop: '30%' }]}>Produto não encontrado!</Text>
                            ) : (
                                <View />
                            )
                        )}
                    </View>
                </View>

            </View>
        </>



    )

}
