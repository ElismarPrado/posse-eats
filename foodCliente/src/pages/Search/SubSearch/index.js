import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView} from 'react-native'
import styles from './styles'
import api from '../../../services/api'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'

export default function SubSearch() {
  const navigation = useNavigation()
  const route = useRoute()

  const Categoria = route.params.categoria

  const [time, setTime] = useState(false)
  setTimeout(() => {
    setTime(true)
  }, 1000);

  const [date, setDate] = useState()

  async function getDate(){
    const response = await api.get(`place/getCategory?categoria=${Categoria}`)
    setDate(response.data)
  }
  useEffect(()=>{getDate()},[])

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
          <Text>BUSCA</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.sectionScroll}>
      <View style={styles.section}>
      {date && date.length > 0
          ? date.map(date => (
              <TouchableOpacity
                style={styles.places}
                key={date._id}
                activeOpacity={1}
                onPress={() => navigation.navigate('Place', {id: date._id})}>
                <View style={styles.imagePlace}>
                  <Image source={{uri: `${date.url}`}} style={styles.image} />
                </View>
                <View style={styles.txtPlace}>
                  <Text style={styles.nomePlace}>{date.nome}</Text>
                  <Text style={styles.avaliacaoPlace}>
                    &#9733; {date.avaliacao.toFixed(1)}
                  </Text>
                  <Text style={styles.categoriaPlace}>{date.categoria}</Text>
                </View>
              </TouchableOpacity>
            ))
          :
          <View style={styles.labelAviso}>
          {time?
          <Text>Não há estabelecimentos nesta categoria!</Text>
          :<ActivityIndicator size="large" color="#424242"/>
          }
          </View>
        }
      </View>
      </ScrollView>

    </View>
    </SafeAreaView>
  )
}