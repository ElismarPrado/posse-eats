import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from 'react-native';
import styles from './styles';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import api from '../../../services/api';
import AsyncStorage from '@react-native-community/async-storage';

import Cards from '../../../assets/cards.jpg'

export default function Pay() {
  
  const navigation = useNavigation()


  const [number, setNumber] = useState()
  const [validade, setValidade] = useState()
  const [cvv, setCvv] = useState()
  const [titular, setTitular] = useState()
  const [cpf, setCpf] = useState()


async function salvarDados(){
  if(number&&validade&&cvv&&titular&&cpf){
    await AsyncStorage.multiSet([
      ['numberCard@foodCliente', number], 
      ['validadeCard@foodCliente', validade],
      ['cvvCard@foodCliente', cvv],
      ['titularCard@foodCliente', titular],
      ['cpfCard@foodCliente', cpf]
    ]);
    navigation.goBack(null)
  }else{
    alert('Preencha todos os campos!')
  }
}

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="chevron-left"
          size={40}
          color="#34CB79"
          style={styles.back}
          onPress={() => navigation.goBack(null)}/>
          <Text>ADICIONAR CARTÃO</Text>
      </View>

      <ScrollView>
        <View style={styles.labelImage}>
        <Image
        source={Cards}
        style={styles.image}
        />
        </View>

        <View style={styles.section} >
      <View style={styles.sectionInput}>
      <TextInput
        keyboardType={"numeric"}
        placeholder="Número do cartão"
        style={styles.inputNumber}
        value={number}
        onChangeText={setNumber}
      />
      <View style={styles.labelValidade}>
        <TextInput
          keyboardType={"numeric"}
          placeholder="Validade"
          style={styles.inputValidade}
          value={validade}
          onChangeText={setValidade}
        />

        <TextInput
          keyboardType={"numeric"}
          placeholder="CVV"
          style={styles.inputCvv}
          value={cvv}
          onChangeText={setCvv}
        />
      </View>

        <TextInput
            autoCapitalize="characters"
            placeholder="Nome do titular"
            style={styles.inputTitular}
            value={titular}
            onChangeText={setTitular}
          />

        <TextInput
          keyboardType={"numeric"}
          placeholder="CPF"
          style={styles.inputCpf}
          value={cpf}
          onChangeText={setCpf}
        />

      </View>

        <TouchableOpacity style={styles.button} onPress={()=>salvarDados()}>
          <Text style={styles.txtButton}>Salvar</Text>
        </TouchableOpacity>

        </View>
        </ScrollView>

    </View>
    </SafeAreaView>
  );
}