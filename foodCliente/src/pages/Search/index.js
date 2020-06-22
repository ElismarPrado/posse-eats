import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import { useNavigation } from '@react-navigation/native'

import Cart from '../Components/cart';
import CategoriaBusca from '../Components/categoriaBusca'
import Info from '../Components/info';

export default function Busca() {

  const navigation = useNavigation()

  const [search, setSearch] = useState("")
  const [date, setDate] = useState()
  const [date2, setDate2] = useState()
  const [show, setShow] = useState(true)

  navigation.addListener('willFocus', () => {
    getDate()
  });

  async function getDate(){
    const response = await api.get(`place/getCustom?custom=${search}`)
    //const response2 = await api.get(`product/getCustom?custom=${search}`)
    setDate(response.data);
    //setDate2(response2.data);
  }

  useEffect(() => {
    if (`${search}`.length > 2) { 
      getDate() 
      setShow(false)
    }else{
      setDate('')
      setShow(true)
    }
  }, [search])

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Info />
      <Cart  />
    <View style={styles.labelSearch}>
    <View style={styles.search}>
    <Icon name="search" size={30} color="#34CB79" />

        <TextInput
          style={styles.inputText}
          autoCapitalize="none"
          //autoFocus={true}
          keyboardType="default"
          placeholder="Item ou Restaurante"
          placeholderTextColor="#888"
          autoCorrect={false}
          maxLength={60}
          value={search}
          onChangeText={setSearch}
        />

        {search?
        <TouchableOpacity
          style={styles.close}
          onPress={() => setSearch('')}>
          <Icon name="close" size={25} color="#555" />
        </TouchableOpacity>
        :null}

      </View>   
      </View>

        {show?
        <CategoriaBusca navigation={navigation} />
        :
        <ScrollView  style={styles.scrollSearch} showsVerticalScrollIndicator={false}>
          <View  style={styles.sectionSearch}>
        {date
          ? date.map(date => (
              <TouchableOpacity
                style={styles.places}
                key={date._id}
                activeOpacity={1}
                onPress={() => date.open?navigation.navigate('Place', {id: date._id}):alert(
                  `Restaurante Fechado: Horário de funcionamento${date.ssh1 ? ` de segunda a sexta das ${date.ssh1} as ${date.ssh2}`: ''} ${date.sh1 ? `, sabado das ${date.sh1} as ${date.sh2}`: null} ${date.dh1 ? `, domingo das ${date.dh1} as ${date.dh2}`: ''}`
                  )}>
                {!date.open?<View style={styles.openClose}><Text style={styles.txtOpenClose}>Fechado</Text></View>:null}
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
          : null}

          {date2?
          date2.map(date=>(
            <TouchableOpacity style={styles.labelProduto} key={date._id}
            onPress={()=>navigation.navigate('Product', {id: date._id})} activeOpacity={1}>
              <View style={styles.div}>
                <View style={styles.div1}>
                <Text style={styles.nomeProduto}>{date.nome}</Text>
                <Text style={styles.descricaoProduto}>{date.descricao}</Text>
                <Text style={styles.valorProduto}>R$ {date.valor.toFixed(2)}</Text>
                </View>
                <View style={styles.div2}>
                   <Image
                      source={{uri: `${date.url}`}}
                      style={styles.imageProduto}
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))
          :null}
        </View>
        </ScrollView>

        }
        
      </View>
      </SafeAreaView>
  )
}
