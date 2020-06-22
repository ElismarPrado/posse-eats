import React, {useState, useEffect} from 'react'
import {
    ActivityIndicator,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Image,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import api from '../../services/api';
import dateFormat from 'dateformat';
import io from 'socket.io-client'

import styles from './styles'
import Cart from '../Components/cart';
import End from '../Components/End';
import Info from '../Components/info';
import CategoriaHome from '../Components/categoriaHome';

const API_URL = 'http://3.23.146.65:3333'

interface Data  {
    _id: string
    open: boolean
    url: string
    nome: string
    avaliacao: number
    categoria: string
    ssh1: string
    ssh2: string
    sh1: string
    sh2: string
    dh1: string
    dh2: string
}

const Home = () => {
    const navigation = useNavigation()

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setRefresh(true)
        getDateHome()
        setTimeout(() => {setRefresh(false)}, 500)
      });
      return unsubscribe;
    }, [navigation]);

    dateFormat.masks.horaf = 'HH:MM';

    const [date, setDate] = useState<Data[]>([]);
    const [entrega, setEntrega] = useState<Boolean>(true);
    const [refresh, setRefresh] = useState<Boolean>(false);

  async function getDateHome() {
    const response = await api.get('place/get');
    setDate(response.data);
  }
  useEffect(() => {
    getDateHome();
  }, []);

  //Conexão de socket.io --------------------------------------------------------------------------------
  async function socket() {
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const socket = io(API_URL, {
      query: {user: id},
    });
    socket.on('canal', (date: {id: string, msg: string}) => {
      if(date.id === 'all-clients'){
        getDateHome()
      }
    });
  }
  useEffect(() => {
    socket();
  }, []);

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
                <Info />
                <Cart status={refresh}/>
                <ScrollView
                    style={styles.containerScroll}
                    showsVerticalScrollIndicator={false}>
                    <View style={styles.endereco}>
                    <View style={styles.butons}>
                        <TouchableOpacity onPress={() => setEntrega(true)}>
                        <Text
                            style={entrega ? styles.txtButtonsOn : styles.txtButtonsOff}>
                            Entrega
                        </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setEntrega(false)}>
                        <Text
                            style={entrega ? styles.txtButtonsOff : styles.txtButtonsOn}>
                            Retirada
                        </Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.street}
                        onPress={() => navigation.navigate('Endereco')}>
                        <End all={true} refresh={refresh}/>
                        <Icon name="chevron-right" size={22} color="#34CB79" />
                    </TouchableOpacity>
                    </View>

                    <CategoriaHome />

                    <Text style={styles.title}>Restaurantes</Text>
                    <View style={styles.label}>
                    {date
                        ? date.map(date => (
                            <TouchableOpacity
                            style={styles.places}
                            key={date._id}
                            activeOpacity={1}
                            onPress={() => date.open?navigation.navigate('Place', {id: date._id}):alert(
                              `Restaurante Fechado: Horário de funcionamento ${date.ssh1 ? ` de segunda a sexta das ${date.ssh1} as ${date.ssh2}`: ''} ${date.sh1 ? `, sabado das ${date.sh1} as ${date.sh2}`: null} ${date.dh1 ? `, domingo das ${date.dh1} as ${date.dh2}`: ''}`
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
                    </View>
                </ScrollView>
                </View>
        </SafeAreaView>
    )
}

export default Home

