import React, {useState, useEffect} from 'react';
import {Alert, Text, View} from 'react-native';
import styles from './styles';
import api from '../../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location'
import Geocoder from 'react-native-geocoding';

const GOOGLE_API_KEY = 'chave de acesso'

export default function End({all, refresh}) {

  const [endereco, setEndereco] = useState("")

  const [error, setError] = useState("")
  const [erro, setErro] = useState("")

  const [date, setDate] = useState()

  async function getDate(){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`address/getIdUserStatus?iduser=${id}&&status=true`)
    const dados = response.data
    setDate(dados[0])
  }
  useEffect(()=>{getDate()},[refresh])

  // Obtem a posição atual do GPS-------------------------------------------------------------------------  
  useEffect(() => {
    async function loadPosition() {
        const location = await Location.getCurrentPositionAsync()
        const { latitude, longitude } = location.coords

        Geocoder.init(GOOGLE_API_KEY)
        Geocoder.from(latitude, longitude)
        .then(json => {
          var addressComponent = json.results[0].formatted_address
                setEndereco(addressComponent.split(',')[0])
        })
        .catch(error => setErro(error))
    }

    loadPosition()
}, [])
// Obtem a posição atual do GPS--------------------------------------------------------------------------


  return ( 
    <>
    {date?
        all?
        <Text>{date.logradouro.split(',')[0]}</Text>
        :
        <View>
          <Text>{date.name}</Text>
          <Text style={styles.endereco}>{date.logradouro}</Text>
        </View>
    :
      all?
        !erro&&endereco?
          <Text>{endereco}</Text>
          :
          <Text style={styles.error}>{error}</Text>
        :
          <Text>Complete seu endereço</Text>
    }  
  </>
  );
}
