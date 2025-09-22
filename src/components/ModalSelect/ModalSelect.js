import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Modal, Animated, PanResponder, ScrollView, TextInput } from 'react-native';
import { globalStyles } from '../../globalStyles';
import ViewModalSelect from '../ViewModalSelect/ViewModalSelect';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { getTransportadora } from '../../slices/transportadoraSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation, useIsFocused } from '@react-navigation/native'


const ModalSelect = ({ data, titulo, isVisible, onCancel, dataSelect, selected, origem }) => {

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [dragging, setDragging] = useState(false);
  const [textSearch, setTextSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const {transportadoras, transportadoraCloneAndEdit} = useSelector((state) => state.transportadora);
  const {tenant, idColaborador, lojaPadrao, idOperacao} = useSelector((state) => state.configuracao);


  // Configurar o PanResponder para capturar o gesto de arrastar
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dy > 0) {
          // Atualiza o slideAnim conforme o usuário arrasta para baixo
          slideAnim.setValue(gestureState.dy);
          setDragging(true);
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          // Se o arrasto for grande o suficiente (100px ou mais), fecha o modal
          Animated.timing(slideAnim, {
            toValue: 500,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setDragging(false);
            onCancel(); // Fecha o modal
          });
        } else {
          // Caso contrário, retorna o modal à posição original
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setDragging(false));
        }
      },
    })
  ).current;

  useEffect(() => {
    if (isVisible) {
      // Animar de baixo para cima ao abrir
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Animar de cima para baixo ao fechar
      Animated.timing(slideAnim, {
        toValue: 500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  // Definir a translação do modal
  const slideIn = slideAnim.interpolate({
    inputRange: [0, 500],
    outputRange: [0, 500], // Começa na tela (0) e vai para fora (500)
  });



  useEffect(() => {

    if (origem === 'transportadora') {

      if (isFocused) {

        let data = {

          filters: {
            pesquisa: textSearch.toUpperCase(),
            status: 'A',
            tipoPesquisa: '',
            idProdutoEquivalente: '0',
            idListaPreco: '',

          },
          page: 0,
          size: 500,
          sorting: {
            undefined: 'asc'
          },
          tenant: tenant

        }

        dispatch(getTransportadora(data));

        if (transportadoras) {

          setFilteredData([]);

          transportadoras.map((item) => {

            setFilteredData(prevState => [...prevState, { id: item.id, name: item.pessoaNomeFantasia }]);
          });
        }
      }

      

    } else {

      if (data) {

        let filtered = data.filter(item =>
          item.name.toLowerCase().includes(textSearch?.toLowerCase())
        );


        if (!textSearch && selected) {

          const foundItem = filtered.find(item => item?.id === selected?.id);
          filtered = filtered.filter(item => item?.id !== foundItem?.id);
          filtered.unshift(foundItem);

        }


        const sortedFiltered = filtered.sort((a, b) => {
          const aMatches = a.name.toLowerCase().indexOf(textSearch?.toLowerCase());
          const bMatches = b.name.toLowerCase().indexOf(textSearch?.toLowerCase());

          if (aMatches === 0 && bMatches !== 0) return -1;
          if (bMatches === 0 && aMatches !== 0) return 1;

          return aMatches - bMatches;

        });

        setFilteredData(sortedFiltered);

      }

    }

  }, [textSearch, isFocused]);


  const handleOnChangeSearchInput = useCallback((text) => {
    setTextSearch(text);
  }, []);




  return (

    <Modal
      visible={isVisible}
      transparent={true}
      animationType='none' // Desativar a animação padrão
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>

        <Animated.View

          style={{
            transform: [{ translateY: slideIn }],
            width: '100%',
            backgroundColor: '#F8F8F8',
            height: '70%',
            borderTopStartRadius: 18,
            borderTopEndRadius: 18,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >

          <View style={{ alignItems: 'center', width: '100%', paddingBottom: 20 }} {...panResponder.panHandlers}>
            <View style={{ borderRadius: 8, borderBottomWidth: 5, width: '12%', height: 5, borderBottomColor: '#0a6c91', marginTop: 20, }} />
            <Text style={{ marginTop: 10, fontSize: 20, color: '#464646' }}>{titulo}</Text>
          </View>

          <View style={{ elevation: 2, marginBottom: 20, borderRadius: 12, paddingLeft: 5, width: '95%', display: 'flex', flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF' }} >
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

          <ScrollView style={{ width: '97%', backgroundColor: '#FFF', elevation: 6, borderRadius: 5 }}>
            <View style={{ alignItems: 'center', width: '100%', paddingBottom: 85 }}>
              {filteredData && filteredData.length > 0 && (
                filteredData.map((item, index) => (
                  <ViewModalSelect key={item?.id ? item.id : index} {...item} dataSelect={dataSelect} />
                )))}
            </View>
          </ScrollView>



        </Animated.View>
      </View>
    </Modal>

  );
};

export default ModalSelect;
