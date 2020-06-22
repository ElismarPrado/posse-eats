import React, {useState, useEffect} from 'react'
import { Platform, Alert, Text, Image, Linking, View, Switch, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native'
import MapView, {Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import io from 'socket.io-client'
import api from '../../services/api'
import styles from './styles'
import ImageMarker from '../../assets/marker/marker2.png'

import { Notifications } from 'expo';

const API_URL = 'http://3.23.146.65:3333' 
const GOOGLE_API_KEY = 'chave de acesso'


const Home = () => {
  const navigation = useNavigation()

  const [indicator, setIndicator] = useState(false)
    
  const [date, setDate] = useState()
  const [date2, setDate2] = useState()

  const [state, setState] = useState(false)
  const [erro, setErro] = useState("")
  const [refresh, setRefresh] = useState(false)

  const [showEntrega, setShowEntrega] = useState(false)

  const [mapView, setMapView]= useState()

  const [position, setPosition] = useState({
    latitude:"",
    longitude: ""
  })

  const [origin, setOrigin] = useState({
    latitude:"",
    longitude: ""
  })

  const [destination, setDestination] = useState({
    latitude:"",
    longitude: ""
  })

  const [statusDirection, setStatusDirection] = useState(0)

  const [progress, setProgress] = useState()

  function time(){
    let cont = 0
    setInterval(() => {
      cont = cont + 1
      setProgress(cont/100)
      if(cont==110){
        cont=0 
        setProgress(0)}
    }, 100);
  }

    useEffect(()=>{time()},[])

//notificação--------------------------------------------------------------------------
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('chat-messages', {
      name: 'Chat messages',
      sound: true,
    });
  }

  function not(msg){
    const localNotification = {
      title: msg,
      body: '', // (string) — body text of the notification.
      ios: { // (optional) (object) — notification configuration specific to iOS.
        sound: true // (optional) (boolean) — if true, play a sound. Default: false.
      },
      android: // (optional) (object) — notification configuration specific to Android.
      {
        sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
        //icon (optional) (string) — URL of icon to display in notification drawer.
        //color (optional) (string) — color of the notification icon in notification drawer.
        priority: 'max', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
        sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
        vibrate: true, // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
        // link (optional) (string) — external link to open when notification is selected.
        channelId: 'chat-messages',
      },
      _displayInForeground: true,
    };

    let t = new Date();
    t.setSeconds(t.getSeconds() + 10);
    const schedulingOptions = {
      time: t, // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
    };
    Notifications.scheduleLocalNotificationAsync(localNotification, schedulingOptions);
  }

  //notificação--------------------------------------------------------------------------

   // Obtem a posição atual do GPS-------------------------------------------------------------------------  
   useEffect(() => {
    async function loadPosition() {
        const { status } = await Location.requestPermissionsAsync()
        if(status !== 'granted') {
            Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização')
        }
        const location = await Location.getCurrentPositionAsync()
        const { latitude, longitude } = location.coords
        setPosition({ latitude, longitude })
    }
    loadPosition()
    }, [])
    // Obtem a posição atual do GPS--------------------------------------------------------------------------

   async function changeState(){
     setState(!state)
     await AsyncStorage.setItem('state@foodEntregador', `${!state}`);
   }

    async function getDate(){
        const response = await api.get('request/getStatus?status=AGUARDANDO ENTREGADOR')
        const dados = response.data
        setDate(dados[0])
        setShowEntrega(true)
    }

    async function getDate2(){
      const id = await AsyncStorage.getItem('idUser@foodEntregador');
      const response = await api.get(`request/getIdEntregador/${id}`)
      const dados = response.data
      setDate2(dados[0])
      if(!dados._id){
        getDate()
      }
    }
    useEffect(()=>{getDate2()},[])


  //Conexão de socket.io --------------------------------------------------------------------------------
  async function socket() {
    const id = await AsyncStorage.getItem('idUser@foodEntregador');

    const response = await api.get(`request/getIdEntregador/${id}`)
    const dados = response.data

    const socket = io(API_URL, {
      query: {user: id},
    });
    socket.on('canal', date => {
      date.id === 'all-entregadores' && date.msg === 'chamar entregador' &&
        dados.length <= 0 && (
            getDate(),
            not('Chegou uma nova solicitação de entrega')
        )
        date.id === 'all-entregadores' && date.msg === 'cancelar solicitacao' &&
        getDate()
      })


  }
  useEffect(() => {
    socket()
  }, []);


  async function getDateAsync(){
    const estado = await AsyncStorage.getItem('state@foodEntregador');
    let estados
    estado == 'true'?estados = true:estados = false
    setState(estados)
  }
  useEffect(()=>{getDateAsync()},[])

  
    async function aceitar(id1, id2, id3){

      const response = await api.get(`request/get/${id1}`)
      const state = response.data.status

      if(state === 'AGUARDANDO ENTREGADOR'){
        const id = await AsyncStorage.getItem('idUser@foodEntregador');
        await api.put(`request/updateIdEntregador/${id1}`,{identregador: id})
        await api.put(`request/updateStatus/${id1}`,{
          status: 'DESIGNADO PARA ENTREGADOR'
          })
        await api.post(`comand/${id2}/changeStatus`)
        await api.post(`comand/${id3}/changeStatus`)
        await api.post(`comand/all-entregadores/cancelar solicitacao'`)
        getDate2()
        setDirection(id2)
        setStatusDirection(1)
      } else {
        alert('Solicitação de entrega expirada, aguarde nova solicitação')
        getDate2()
      }
    }
  
  
   async function changeStatus(id1, id2, idUser, status){
        setIndicator(true)
        setTimeout(() => {setIndicator(false)},2000)
        await api.put(`request/updateStatus/${id1}`,{
            status,
        })
        if(status === 'ENTREGUE'){
            const id = await AsyncStorage.getItem('idUser@foodEntregador');
            const idEntrega = `entregador-${id}`
            await api.put(`request/updateIdEntregador/${id1}`,{identregador: idEntrega})
            setStatusDirection(0)
            await api.post(`comand/${idUser}/changeStatus`)
            alert('Entrega concluida com sucesso, aguarde a próxima solicitação')
        }
        if(status === 'ENTREGADOR A CAMINHO'){
            setStatusDirection(2)
            setDirection2()
        }
        if(status === 'ENTREGADOR NO CLIENTE'){
            await api.post(`comand/${idUser}/changeStatus`)
            await api.post(`comand/${idUser}/pedido chegou`)
        }

        await api.post(`comand/${id2}/changeStatus`)
        setTimeout(() => {setIndicator(false)},250)
        getDate2()
   }


   async function rotaPlace(idPlace){
     const response = await api.get(`place/get/${idPlace}`)
     const dados = response.data
     Linking.openURL(`geo:${dados.lat},${dados.lgt}`)
   }


   async function setDirection(id2){
    const response = await api.get(`place/get/${id2}`)
    const dados = response.data
    setDestination({
      latitude: parseFloat(dados.lat),
      longitude: parseFloat(dados.lgt)
    })
        const location = await Location.getCurrentPositionAsync() // Get Location
        const { latitude, longitude } = location.coords
        setOrigin({ latitude, longitude})
  }

  async function setDirection2(){
    setDestination({
      latitude: parseFloat(date2.lat),
      longitude: parseFloat(date2.lgt)
    })
        const location = await Location.getCurrentPositionAsync() // Get Location
        const { latitude, longitude } = location.coords
        setOrigin({ latitude, longitude})
  }


    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.labelHeader}>
          {state?<Text style={styles.txtStatusOn}>Você está ativo</Text>:<Text style={styles.txtStatusOff}>Você está inativo</Text>}
        <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            value={state}
            onValueChange={()=>changeState()}
        />
        </View>
      </View>



      {date2 && date2._id?
            date2.status === 'AGUARDANDO' 
            || date2.status === 'PREPARANDO'
            || date2.status === 'AGUARDANDO ENTREGADOR'
            || date2.status === 'CHAMAR ENTREGADOR'
            || date2.status === 'ENTREGUE'
            || date2.status === 'INCIDENTE'
            || date2.status === 'NAO ENTREGUE'
            || date2.status === 'NAO PREPARADO'
            || date2.status === 'FECHADO'
            || date2.status === 'RETIRADA LOCAL'
            ?null:
        <View style={styles.section2}>
         {indicator?<ActivityIndicator color="#72B76B" size="large" style={styles.indicator2} /> :null}
        {date2.status === 'DESIGNADO PARA ENTREGADOR'?
          <View style={styles.label}>
             <Text style={styles.title}>Local para retirar o pedido:</Text>
            <View style={styles.labelDados}>
            <Text style={styles.nomePlace}>{date2.produto[0].nomeplace}</Text>
            <TouchableOpacity onPress={()=>rotaPlace(date2.idplace)}>
              <Text style={styles.rota}>Waze</Text>
            </TouchableOpacity>
            </View>
          <TouchableOpacity onPress={()=>changeStatus(date2._id, date2.idplace, date2.iduser, 'ENTREGADOR NO RESTAURANTE')} style={styles.button}>
            <Text style={styles.textoButton}>Cheguei ao estabelecimento</Text>
          </TouchableOpacity>
         </View>

        :date2.status === 'ENTREGADOR NO RESTAURANTE' ?
         <View style={styles.label}>
            <Text style={styles.title}>Detalhes do produto:</Text>
            <ScrollView style={styles.labelScroll}>
              {date2.produto.map(date=>(
              <View style={styles.labelProduto}>
                <Text style={styles.texto}>{date.quantidade}</Text>
                <Text style={styles.texto}>{date.nome}</Text>
              </View>
              ))}
            </ScrollView>
          <TouchableOpacity onPress={()=>changeStatus(date2._id, date2.idplace, date2.iduser, 'ENTREGADOR A CAMINHO')} style={styles.button}>
            <Text style={styles.textoButton}>Estou com o produto</Text>
          </TouchableOpacity>
         </View>

         :date2.status === 'ENTREGADOR A CAMINHO' ?
         <View style={styles.label}>
            <Text style={styles.title}>Local para entrega do produto:</Text>
            <View style={styles.labelDados}>
              <View>
              <View style={styles.labelNomeUser}>
                <Text style={styles.nomeUser}>{date2.nomeuser}</Text>
                <TouchableOpacity onPress={()=>Linking.openURL(`tel://${date2.foneuser}`)}><Text style={styles.foneUser}>{date2.foneuser}</Text></TouchableOpacity>
              </View>
                <Text style={styles.end}>{date2.end}</Text>
                <View style={styles.labelEnd}> 
                  {date2.numero?<Text style={styles.endComp}>Nº {date2.numero}</Text>:null}
                  {date2.complemento?<Text style={styles.endComp}>, {date2.complemento}</Text>:null}
                  {date2.referencia?<Text style={styles.endComp}>, {date2.referencia}</Text>:null}
                </View>
              </View>
            <TouchableOpacity onPress={()=>Linking.openURL(`geo:${date2.lat},${date2.lgt}`)}>
              <Text style={styles.rota}>Waze</Text>
            </TouchableOpacity>
            </View>
          <TouchableOpacity onPress={()=>changeStatus(date2._id, date2.idplace, date2.iduser, 'ENTREGADOR NO CLIENTE')} style={styles.button}>
            <Text style={styles.textoButton}>Cheguei no cliente</Text>
          </TouchableOpacity>
         </View>

        :date2.status === 'ENTREGADOR NO CLIENTE' ?
        <View style={styles.label}>
          <Text style={styles.title}>Efetue a Entrega</Text>
            <View style={styles.labelDados2}>
              <View style={styles.labelNomeUser}>
                <Text style={styles.nomeUser}>{date2.nomeuser}</Text>
                <TouchableOpacity onPress={()=>Linking.openURL(`tel://${date2.foneuser}`)}><Text style={styles.foneUser}>{date2.foneuser}</Text></TouchableOpacity>
                </View>
                {!date2.pagamento?<Text style={styles.receber}>Receba do cliente: R$ {(date2.total + date2.frete).toFixed(2).replace('.', ',')}</Text>:null}
            </View>
        <TouchableOpacity onPress={()=>changeStatus(date2._id, date2.idplace, date2.iduser, 'ENTREGUE')} style={styles.button}>
          <Text style={styles.textoButton}>Produto entregue</Text>
        </TouchableOpacity>
        </View>
         :null}

        </View>
      :
      state && showEntrega && date && date._id?
        <View style={styles.section1}>
        <View style={styles.labelCall}>
            <Text style={styles.titleEntrega}>NOVA ENTREGA</Text>
              <Text style={styles.txtEntrega}>{date.produto[0].nomeplace}</Text>
            <View style={styles.buttons}>
              <TouchableOpacity onPress={()=>aceitar(date._id, date.idplace, date.iduser)} style={styles.button2}>
                <ActivityIndicator color="#72B76B" size={130} style={styles.progress} />
                <Text style={styles.txtButtonEntrega}>ACEITAR</Text>
              </TouchableOpacity>
            </View>
        </View>
        </View>
      :null}


    {position.latitude ?
      <MapView
          style={styles.map}
            initialRegion={{
                longitude: parseFloat(position.longitude),
                latitude: parseFloat(position.latitude),
                longitudeDelta: 0.0100,
                latitudeDelta: 0.0050,
            }}
            loadingEnabled
            showsUserLocation
            ref={el => (setMapView(el))}>

          {statusDirection==1&&origin.latitude&&destination.latitude?
          <>
          <MapViewDirections
                destination={destination}
                origin={origin}
                onReady={result => {
                    mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            right: 30,
                            left: 30,
                            top: 25,
                            bottom: 425
                        }
                    })
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor='#222'
            />
            <Marker
                coordinate={{
                    latitude: parseFloat(destination.latitude),
                    longitude: parseFloat(destination.longitude)
                }}
                anchor={{ x: 0, y: 0 }}
            >
                <Image
                    style={{ width: 15, height: 15 }}
                    source={ImageMarker}
                />
            </Marker>
            </>
            :statusDirection==2&&origin.latitude&&destination.latitude?
            <>
          <MapViewDirections
                destination={destination}
                origin={origin}
                onReady={result => {
                    mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                            right: 30,
                            left: 30,
                            top: 25,
                            bottom: 425
                        }
                    })
                }}
                apikey={GOOGLE_API_KEY}
                strokeWidth={3}
                strokeColor='#222'
            />
            <Marker
                coordinate={{
                    latitude: parseFloat(destination.latitude),
                    longitude: parseFloat(destination.longitude)
                }}
                anchor={{ x: 0, y: 0 }}
            >
                <Image
                    style={{ width: 15, height: 15 }}
                    source={ImageMarker}
                />
            </Marker>
            </>
            :null}
            
      </MapView>: <ActivityIndicator color="#72B76B" size="large" style={styles.indicator} />}

        {erro ?
        <View style={styles.labelErro}>
          <Text style={styles.erro} >{erro}</Text>
          <Icon name="refresh" size={35} color="#424242" onPress={()=>setRefresh(!refresh)}/>
        </View>
        :null}

        </View>
    </SafeAreaView>
    )
}

export default Home
