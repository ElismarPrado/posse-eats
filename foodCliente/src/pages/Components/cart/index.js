import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import styles from './styles'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import api from '../../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

export default function Cart({ status }) {

  const navigation = useNavigation()

  const [date, setDate] = useState()
  async function getDate(){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`cart/getIdUser?iduser=${id}`)
    setDate(response.data)
  }
  useEffect(()=>{getDate()},[status])

  return (
    <>
    {date?
    date.length > 0 &&
    <TouchableOpacity style={styles.label}
    onPress={()=> navigation.navigate('Cart')}>
          <Icon name="shopping-basket" size={25} color="#fff" />
    </TouchableOpacity>
    :null}
    </>
  )
}
