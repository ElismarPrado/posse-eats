import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import api from '../../../services/api'
import { useNavigation } from '@react-navigation/native'

export default function CategoriaBusca() {
  const navigation = useNavigation()

  const [date, setDate] = useState()

  async function getDate(){
    const response = await api.get('categoria/get')
    setDate(response.data)
  }
  useEffect(()=>{getDate()},[])

  if (!date) {
    return (
      <ActivityIndicator size="large" color="#424242"/>
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.categorias}>
      {date?
      date.map(date=>(
        <TouchableOpacity style={styles.itens} key={date._id} activeOpacity={1}
        onPress={()=>navigation.navigate('SubSearch', { categoria: date.name})}>
          <View style={styles.labelImage}>
          <Image
            style={styles.image}
            source={{uri: `${date.image}`}}/>
          </View>
          <Text style={styles.nameItens}>{date.name}</Text>
        </TouchableOpacity>
      ))
      :null}
    </View>
    </ScrollView>
  )
}
