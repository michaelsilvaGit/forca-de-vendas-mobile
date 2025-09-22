import React, { useState, useEffect, useCallback } from 'react';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { Text, TextInput, TouchableOpacity, Alert, View, ScrollView, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { saveCliente, findCnpjCliente, resetMessageCliente } from '../../slices/clienteSlice';
import { clienteModel2 } from './cliente.model';
import { RadioButton as PaperRadioButton, Text as PaperText } from 'react-native-paper';
import styles from './styles';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { globalStyles } from '../../globalStyles';


export default () => {

    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const dispatch = useDispatch();
    const {clienteCnpj, message, messageErrorCliente, sucess, loading, error} = useSelector((state) => state.cliente);
    const {tenant} = useSelector((state) => state.configuracao);


    const [cnpjCpfVisible, setCnpjCpfVisible] = useState('juridica');
    const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cpf, setCpf] = useState('');
    const [cnpj, setCnjp] = useState('');
    const [cep, setCep] = useState('');
    const [cidade, setCidade] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [inscricaoCpf, setInscricaoCpf] = useState('ISENTO')
    const [inscricaoEstadual, setInscricaoEstadual] = useState(cnpjCpfVisible !== 'juridica' ? inscricaoCpf : null);
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [uf, setUf] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [modalVisible, setModalVisible] = useState(false);



    useEffect(() => {
        if(isFocused){
            setCnpjCpfVisible('juridica')
        }
    }, [isFocused]);


   // BOTÃO DE SALVAR FICAR HABILITADO QUANDO OS CAMPOS ESTIVEREM PREENCHIDOS 
    useEffect(() => {

       if(razaoSocial &&
          nomeFantasia &&
          cidade &&
          uf &&
          email &&
          logradouro &&
          telefone &&
          numero &&
          bairro &&
          cep &&
          inscricaoEstadual
          ){

            if( cnpj != '' && cnpjCpfVisible === 'juridica'){
                setSaveButtonEnabled(true);
                //console.log('entrou juridica')
            }else if(cpf != '' && cnpjCpfVisible === 'fisica'){
                setSaveButtonEnabled(true);
                //console.log('entrou fisica')
            }  
          }
    }, [razaoSocial, nomeFantasia, cidade, uf, email, logradouro, telefone, numero, bairro, cep, inscricaoEstadual, cpf, cnpj, cnpjCpfVisible]);


    const handleChange = (setter) => (value) => {
        setter(value.toUpperCase());
    };




    //DEFINE A BORDA
    const getBorderColor = (fieldValue) => {
        if (!fieldValue) {
            return 'red'; // Se o campo estiver vazio, a borda será vermelha
        } else {
            return 'green'; // Se o campo estiver preenchido, a borda será verde
        }
    };


    // DEFINE APENAS NUMEROS PARA O CAMPO TELEFONE
    const handlePhoneChange = (value) => {
        const filteredValue = value.replace(/[^0-9]/g, '');
        setTelefone(filteredValue);
    };

    // DEFINE APENAS NUMEROS PARA O CAMPO CPF
    const handleCpfChange = (value) => {
        const filteredValue = value.replace(/[^0-9]/g, '');
        setCpf(filteredValue);
    };

    // DEFINE APENAS NUMEROS PARA O CAMPO INSCRICAO ESTADUAL
    const handleInscricaoChange = (value) => {
        const filteredValue = value.replace(/[^0-9]/g, '');
        setInscricaoEstadual(filteredValue);
    };


    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    // Função validarCnpj:
    const validarCnpj = (cnpj) => {
        return cnpjRegex.test(cnpj);
    };

  
    const handleCepChange = (value) => {
        let cepFormatado = value.replace(".", "");
        cepFormatado = cepFormatado.replace(".", "");
        cepFormatado = cepFormatado.replace("-", "");

        
        setCep(cepFormatado);
    };
    


    // DEFINE APENAS NUMEROS PARA O CAMPO CNPJ
    const handleCnpjChange = (value) => {

        let cnpjFormatado = value.replace(".", "");
        cnpjFormatado = cnpjFormatado.replace(".", "");
        cnpjFormatado = cnpjFormatado.replace("/", "");
        cnpjFormatado = cnpjFormatado.replace("-", "");
        setCnjp(cnpjFormatado);

        // Para validar o CNPJ:
        if (validarCnpj(cnpj)) {
            setCnjp(cnpjFormatado);
        } else {
        }

    };

    //ABRIR O MODAL SEMPRE QUE ABRIR A TELA 
    useFocusEffect(
        useCallback(() => {
            setModalVisible(true);
        }, [])
    );

    useFocusEffect(
        useCallback(() => {
            setSaveButtonEnabled(false);
            setRazaoSocial('');
            setNomeFantasia('');
            setCpf('');
            setCnjp('');
            setCep('');
            setCidade('');
            setLogradouro('');
            setInscricaoEstadual('');
            setEmail('');
            setTelefone('');
            setUf('');
            setNumero('');
            setBairro('');
            dispatch(resetMessageCliente());
        }, [])
    );


    //RENDERIZAR OS CAMPOS DA API
    useEffect(() => {

        setRazaoSocial(clienteCnpj.nome);
        setNomeFantasia(clienteCnpj.fantasia);
        
        setCidade(clienteCnpj.municipio);
        setLogradouro(clienteCnpj.logradouro);
        setUf(clienteCnpj.uf);
        setTelefone(clienteCnpj.telefone);
        setBairro(clienteCnpj.bairro);
        setEmail(clienteCnpj.email);
        setNumero(clienteCnpj.numero)

        if(clienteCnpj.cep) {
            handleCepChange(clienteCnpj.cep)
        }
    }, [clienteCnpj])

    // CHAMADA DA API DE CNPJ
    const fetchCnpj = () => {
        dispatch(findCnpjCliente(cnpj));
    }

    const oncanceLoading = () => {
        setOpenLoading(false);
    }

    const clean = () => {

        setNomeFantasia('');
        setRazaoSocial('');
        setInscricaoEstadual('');
        setCnjp('');
        setCep('');
        setLogradouro('');
        setNumero('');
        setBairro('');
        setCidade('');
        setUf('');
        setEmail('');
        setTelefone('');
        setCnpjCpfVisible('juridica');
        dispatch(resetMessageCliente());

    }


    const onBeforeSave = () => {

        clienteModel2.pessoaCnpj = cnpj;
        clienteModel2.pessoaCnpjCpf = cnpj;
        clienteModel2.pessoaRazaoSocial = razaoSocial;
        clienteModel2.pessoaNomeFantasia = nomeFantasia;
        clienteModel2.pessoaInscricaoEstadual = inscricaoEstadual;
        clienteModel2.pessoaStatus = 'A';
        clienteModel2.tenant = tenant;
        clienteModel2.status = 'A';
        clienteModel2.pessoaEnderecos.bairro = bairro;
        clienteModel2.pessoaEnderecos.cep = cep;
        clienteModel2.pessoaEnderecos.cidade = cidade;
        clienteModel2.pessoaEnderecos.logradouro = logradouro;
        clienteModel2.pessoaEnderecos.numero = numero;
        clienteModel2.pessoaEnderecos.uf = uf;
        clienteModel2.pessoaEnderecosWeb.endereco = email;
        clienteModel2.pessoaTelefones.fone = telefone;

        //console.log("CLIENTE MODEL", clienteModel2 )



    }


    const save = () => {

        onBeforeSave();

        if (saveButtonEnabled) {
            dispatch(saveCliente(clienteModel2));
            setOpenLoading(true);
            clean();
        } else {
            Alert.alert('Atenção!', 'Verifique se todos os campos obrigatórios estão preenchidos!');
        }

    }

    const handleSelectRadio = (status) => {
        setSaveButtonEnabled(false);
        setCnjp('');
        setCpf('');
        setCnpjCpfVisible(status);
    }


    return (
        <>
            <Modal
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
                animationType='none'
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={[globalStyles.text, styles.modalText]}>Digite o CNPJ</Text>
                        <TextInput
                            placeholderTextColor={'#999999'}
                            onChangeText={(text) => handleCnpjChange(text)}
                            value={cnpj}
                            style={[globalStyles.text, styles.modalTextInput]}
                            keyboardType='numeric'
                        />
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonOpen]}
                                onPress={() => {
                                    fetchCnpj();
                                    setModalVisible(false)
                                }}
                            >
                                <Text style={styles.textStyle}>Pesquisar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>


            <LoadingComponent
                isVisibleLoading={openLoading}
                loading={loading}
                sucess={sucess}
                error={error}
                messageLoading={'Salvando Cliente!'}
                messageSucess={message}
                messageError={messageErrorCliente}
                oncanceLoading={oncanceLoading}
            />

            <ScrollView style={styles.container}>

                <Text style={{ fontWeight: 'bold' }}> Tipo Pessoa</Text>
                <View style={{ width: '100%', marginBottom: 8 }}>
                    <PaperRadioButton.Group onValueChange={status => handleSelectRadio(status)} value={cnpjCpfVisible}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PaperRadioButton color='#2eaed6' value="juridica"  />
                                <PaperText style={{fontSize: 15}}>Jurídica</PaperText>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <PaperRadioButton color='#2eaed6' value="fisica" />
                                <PaperText style={{fontSize: 15}}>Física</PaperText>
                            </View>
                        </View>
                    </PaperRadioButton.Group>
                </View>


                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Razão Social</Text>
                    <TextInput
                        onChangeText={handleChange(setRazaoSocial)}
                        value={razaoSocial}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(razaoSocial) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Nome Fantasia</Text>
                    <TextInput
                        onChangeText={handleChange(setNomeFantasia)}
                        value={nomeFantasia}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(nomeFantasia) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Inscrição Estadual</Text>
                    <TextInput
                        onChangeText={handleInscricaoChange}
                        value={cnpjCpfVisible === 'fisica' ? inscricaoCpf : inscricaoEstadual}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(cnpjCpfVisible === 'fisica' || inscricaoEstadual) }]}
                        keyboardType='numeric'
                    />
                </View>


                {cnpjCpfVisible === 'juridica' ? (
                    <View style={styles.ContainerBorder}>
                        <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>CNPJ</Text>
                        <TextInput
                            onChangeText={handleCnpjChange}
                            value={cnpj}
                            style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(cnpj) }]}
                            keyboardType='numeric'
                        />
                    </View>
                ) : (
                    <View style={styles.ContainerBorder}>
                        <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>CPF</Text>
                        <TextInput
                            onChangeText={handleCpfChange}
                            value={cpf}
                            style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(cpf) }]}
                            keyboardType='numeric'
                        />
                    </View>
                )}

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>CEP</Text>
                    <TextInput
                        onChangeText={(text) => handleCepChange(text)}
                        value={cep}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(cep) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Logradouro</Text>
                    <TextInput
                        onChangeText={handleChange(setLogradouro)}
                        value={logradouro}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(logradouro) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Número</Text>
                    <TextInput
                        onChangeText={handleChange(setNumero)}
                        value={numero}
                        style={[styles.textInput, { borderBottomColor: getBorderColor(numero) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Bairro</Text>
                    <TextInput
                        onChangeText={handleChange(setBairro)}
                        value={bairro}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(bairro) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Cidade</Text>
                    <TextInput
                        onChangeText={handleChange(setCidade)}
                        value={cidade}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(cidade) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>UF</Text>
                    <TextInput
                        onChangeText={handleChange(setUf)}
                        value={uf}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(uf) }]}
                    />
                </View>





                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Email</Text>
                    <TextInput
                        onChangeText={handleChange(setEmail)}
                        value={email}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(email) }]}
                    />
                </View>

                <View style={styles.ContainerBorder}>
                    <Text style={[globalStyles.text, { fontWeight: 'bold' }]}>Telefone</Text>
                    <TextInput
                        onChangeText={handlePhoneChange}
                        value={telefone}
                        style={[globalStyles.text, styles.textInput, { borderBottomColor: getBorderColor(telefone) }]}
                        keyboardType='numeric'
                    />
                </View>




                <TouchableOpacity onPress={() => save()}
                    disabled={!saveButtonEnabled}>
                    <View style={[styles.ButtonLogin, { backgroundColor: saveButtonEnabled ? '#34a18d' : '#ccc' }]}>
                        <Text style={styles.TextButtonLogin}>SALVAR</Text>
                    </View>
                </TouchableOpacity>





            </ScrollView>

        </>

    );

}
