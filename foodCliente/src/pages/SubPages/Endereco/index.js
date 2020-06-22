import React, {useState, useEffect} from 'react';
import {Alert, Text, View, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native';
import Styles from './styles';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api'
import { useNavigation } from '@react-navigation/native'

export default function Endereco() {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getEnd()
    });
    return unsubscribe;
  }, [navigation]);

  const [date, setDate] = useState()

  async function getEnd(){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`address/getIdUser/${id}`)
    setDate(response.data)
  }
  useEffect(()=>{getEnd()},[])

function deleteEndConf(id){
  Alert.alert(
    'Deseja excluir o endereço?',
    'Isso irá excluir este item permanentemente.',
    [
      {text: 'NÃO', style: 'cancel'},
      {text: 'SIM', onPress: () => deleteEnd(id) },
    ],
    { cancelable: true }
  );
}

  async function deleteEnd(id){
    await api.delete(`address/delete/${id}`);
    getEnd();
  }

  async function changeStatus(id){
    const idUser = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`address/getIdUser/${idUser}`)
    const dados = response.data
    dados.map(date =>(
        api.put(`address/updateStatus/${date._id}`,{
        status: false
      })
    ))
    await api.put(`address/updateStatus/${id}`,{
      status: true
    })
    getEnd()
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Icon
          name="chevron-left"
          size={40}
          color="#34CB79"
          style={Styles.back}
          onPress={() => navigation.goBack(null)}/>
          <Text>ENDEREÇO DE ENTREGA</Text>
      </View>
      <TouchableOpacity style={Styles.endAtual}
      onPress={()=>navigation.navigate('AddEndereco')}>
          <Icon name="my-location" size={25} color="#999" />
          <Text>Usar localização atual</Text>
          <Icon name="chevron-right" size={25} color="#c1c1c1" />
      </TouchableOpacity>

      {date && date.length > 0?
      <ScrollView style={Styles.scroolLabel} showsVerticalScrollIndicator={false}>
      {date.map(date=>(
        <View key={date._id} style={[Styles.labelEndereco, date.status&&Styles.labelEnderecoTrue]}>
          <View style={Styles.icon}>
            <Icon name="place" size={25} color="#999" />
          </View>
          <TouchableOpacity onPress={()=>changeStatus(date._id)}>
            <Text style={Styles.txtName}>{date.name}</Text>
            <Text style={Styles.txtLogradouro}>{date.logradouro}</Text>
            {date.complemento?<Text style={Styles.txtLogradouro}>{date.complemento}</Text>:null}
            {date.numero?<Text style={Styles.txtLogradouro}>Nº {date.numero}</Text>:null}
            {date.referencia?<Text style={Styles.txtReferencia}>{date.referencia}</Text>:null}
          </TouchableOpacity>
          <Icon onPress={()=>deleteEndConf(date._id)} name="close" size={25} color="red" style={Styles.close} />
        </View>
      ))}
      </ScrollView>
    :<Text style={Styles.aviso}>Nenhum endereço cadastrado</Text>}
    </View>
    </SafeAreaView>
  );
}