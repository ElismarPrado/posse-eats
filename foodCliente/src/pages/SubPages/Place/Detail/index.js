import React, { useState, useEffect } from 'react'
import { Text, View, Image, ScrollView, SafeAreaView} from 'react-native'
import styles from './styles'
import api from '../../../../services/api'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import MapView, {Marker} from 'react-native-maps';

import { useNavigation, useRoute } from '@react-navigation/native'

export default function Detail() {

  const navigation = useNavigation()
  const route = useRoute()
  const id = route.params.id

  const [date, setDate] = useState()

  async function getDate() {
    const response = await api.get(`place/get/${id}`)
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
          <Text>DETALHES DO ESTABELECIMENTO</Text>
      </View>

      {date?
      <ScrollView style={styles.scrollSection} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
         <Image
          source={{uri: `${date.url}`}}
          style={styles.image}
          />
          <View style={styles.div}>
            <View style={styles.subDiv}>
            <Text style={styles.nome}>{date.nome}</Text>
            <Text style={styles.descricao}>{date.descricao}</Text>
            <Text style={styles.categoria}><Icon name="restaurant-menu" size={12} color="#555" /> {date.categoria}</Text>
            </View>
            <Text style={styles.avaliacao}>&#9733;{date.avaliacao.toFixed(1)}</Text>
          </View>

          <Text style={styles.funcionamento}>Funcionamento:</Text>
          {date.ssh1?<Text style={styles.horario}>Segunda à Sexta: {date.ssh1} as {date.ssh2}</Text>:null}
          {date.sh1?<Text style={styles.horario}>Sabados: {date.sh1} as {date.sh2}</Text>:null}
          {date.dh1?<Text style={styles.horario}>Domingos: {date.dh1} as {date.dh2}</Text>:null}

          {date.lat?
          <MapView
          style={styles.map}
          initialRegion={{
              longitude: parseFloat(date.lgt),
              latitude: parseFloat(date.lat),
              longitudeDelta: 0.0100,
              latitudeDelta: 0.0050,
          }}
          showsUserLocation
          loadingEnabled
          >
          <Marker
            coordinate={{
              longitude: parseFloat(date.lgt),
              latitude: parseFloat(date.lat),
            }}
            title={date.nome}
          />
          </MapView>
          :null}
      </View>
      </ScrollView>
      :null}
      
    </View>
    </SafeAreaView>
  )
}
