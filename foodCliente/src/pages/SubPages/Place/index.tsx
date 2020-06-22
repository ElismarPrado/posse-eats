import React, {useState, useEffect} from 'react'
import { Text, View, SafeAreaView, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import api from '../../../services/api';
import {MaterialIcons as Icon} from '@expo/vector-icons';

import styles from './styles'
import Cart from '../../Components/cart';


interface Params {
    id: string
}

interface Data {
    _id: string
    nome: string
    categoria: string
    avaliacao: number
}

interface Data2 {
    _id: string
    nome: string
    url: string
    descricao: string
    valor: number
}

const Place = () => {
    const navigation = useNavigation()
    const route = useRoute()

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getDate()
      });
      return unsubscribe;
    }, [navigation]);

    const routeParams = route.params as Params
    const id = routeParams.id

    const [imagePlace, setImagePlace] = useState()
  
    const [date, setDate] = useState<Data>()
    const [date1, setDate1] = useState<Data2[]>([])
    const [date2, setDate2] = useState<Data2[]>([])
    const [date3, setDate3] = useState<Data2[]>([])
  
    async function getDate(){
      const response = await api.get(`place/get/${id}`)
      const response1 = await api.get(`product/getPosicao?posicao=1&&idplace=${id}`)
      const response2 = await api.get(`product/getPosicao?posicao=2&&idplace=${id}`)
      const response3 = await api.get(`product/getPosicao?posicao=3&&idplace=${id}`)
  
      const dados = response.data
      setImagePlace(dados.url)
  
      setDate(response.data)
      setDate1(response1.data)
      setDate2(response2.data)
      setDate3(response3.data)
    }
    useEffect(()=>{getDate()},[])

    if (!date){
      return(
        <View style={styles.labelAviso}>
            <ActivityIndicator size="large" color="#34CB79"/>
        </View>
      )
    }
    
    return(
    <SafeAreaView style={{flex: 1}}>
         <View style={styles.container}>

      <Cart />

      <View style={styles.header}>
          <Icon name="chevron-left" size={40} color="#34CB79" style={styles.back} 
          onPress={()=>navigation.goBack()}/>
          <Image
          source={{uri: `${imagePlace}`}}
          style={styles.image}
          />

        {date?
        <TouchableOpacity style={styles.placeLabel}
        onPress={()=>navigation.navigate('Detail', {id: date._id})}>
          <View>
            <Text style={styles.txtNome}>{date.nome}</Text>
            <Text style={styles.txtCategoria}>{date.categoria} &#9679; >20 km</Text>
          </View>
          <View style={styles.divRight}>
            <Icon name="chevron-right" size={22} color="#34CB79" />
            <Text style={styles.avaliacao}>&#9733; {date.avaliacao.toFixed(1)}</Text>
          </View>
        </TouchableOpacity>
        :null}

      </View>
      <ScrollView style={styles.scrollLabel} showsVerticalScrollIndicator={false}>

        {date1&&date1.length>0?
        <>
          <Text style={styles.title}>Destaques</Text>
          <ScrollView horizontal={true} style={styles.scrollDestaque} showsHorizontalScrollIndicator={false}>
          {date1.map(date=>(
            <TouchableOpacity style={styles.labelDestaque} key={date._id}
            onPress={()=>navigation.navigate('Products', {id: date._id})} activeOpacity={1} >
              <Image
                source={{uri: `${date.url}`}}
                style={styles.imageDestaque}
              />
              <Text style={[styles.nomeProduto, styles.padding10]}>{date.nome}</Text>
              <Text style={[styles.descricaoProduto, styles.padding10]}>{date.descricao}</Text>
              <Text style={[styles.valorProduto, styles.padding10]}>R$ {date.valor.toFixed(2)}</Text>
            </TouchableOpacity>
           ))}
          </ScrollView>
          </>
        :null}

        {date2&&date2.length>0?
        <>
        <Text style={styles.title2}>Promoções</Text>
        {date2.map(date=>(
          <TouchableOpacity style={styles.labelProduto} key={date._id}
          onPress={()=>navigation.navigate('Products', {id: date._id})} activeOpacity={1}>
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
        ))}
        </>
        :null}


        {date3&&date3.length>0?
        <>
        <Text style={styles.title2}>Mais opções</Text>
        {date3.map(date=>(
          <TouchableOpacity style={styles.labelProduto} key={date._id}
          onPress={()=>navigation.navigate('Products', {id: date._id})} activeOpacity={1}>
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
        ))}
        </>
        :null}

      </ScrollView>
    </View>
    </SafeAreaView>
    )
}

export default Place