import React, {useState, useEffect} from 'react'
import {
    Platform,
    ActivityIndicator,
    Alert,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import api from '../../services/api'
import io from 'socket.io-client'
import dateFormat from 'dateformat'

import { Notifications } from 'expo';

import styles from './styles'

import Header from '../Components/Header'

const API_URL = 'http://3.23.146.65:3333'

interface Date {
    _id: string
    nomeuser: string
    foneuser: string
    createAt: string
    status: string
    pagamento: boolean
    total: number
    produto: [{
        quantidade: number
        nome: string
    }]
}

interface DateDetail {
    _id: string
    idplace: String
    iduser: String
    nomeuser: string
    foneuser: string
    createAt: string
    pagamento: boolean
    frete: number
    total: number
    status: string
    produto: [{
        quantidade: number
        nome: string
        descricao: string
        observacao: string
        opcao1: string
        opcao2: string
        opcao3: string
        valor: number
    }]
}

const Home = () => {
  dateFormat.masks.hora = 'HH:MM';
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDate()
    });
    return unsubscribe;
  }, [navigation]);
  

  const [refresh, setRefresh] = useState<Boolean>(false)

  const [date, setDate] = useState<DateDetail>()

  const [date1, setDate1] = useState<Date[]>([])
  const [date2, setDate2] = useState<Date[]>([])
  const [date3, setDate3] = useState<Date[]>([])

  const [showLabel, setShowLabel] = useState<Boolean>(false)

    //Conexão de socket.io --------------------------------------------------------------------------------
    async function socket() {
      const id = await AsyncStorage.getItem('idUser@foodRestaurante')
      const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
      const idPlace = responsePlace.data[0]._id
        const socket = io(API_URL, {
          query: {user: id},
        });
        socket.on('canal', (date: {id: String, msg: String}) => {
          if(date.id === idPlace && date.msg === "changeStatus"){
           getDate()
          }

          if(date.id === idPlace && date.msg === "novo pedido"){
            getDate()
            not('Chegou um novo pedido')
           }

          if(date.id === idPlace && date.msg === 'sem entregador'){
            getDate()
            alert('não há entregadores disponíveis, tente novamente em alguns minutos!')
          }
        });
      }
      useEffect(() => {
        socket();
      }, [refresh]);



  //notificação--------------------------------------------------------------------------
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('chat-messages', {
      name: 'Chat messages',
      sound: true,
    });
  }

  function not(msg: String){
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

  
  async function getOperation(){
      const id = await AsyncStorage.getItem('idUser@foodRestaurante')
      const response = await api.get(`user/get/${id}`)
      const {user}= response.data
      if(user.operation === false){
        alert('Bem vindo ao Posse Eats, o maior app de delivery da região. Para cadastrar seu estabelecimento entre em contato no WhatsApp (62) 9 9869-8273')
      }
  }
  useEffect(() => {getOperation()}, [])


  async function getDate(){
    const id = await AsyncStorage.getItem('idUser@foodRestaurante')
    const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
    const idPlace = responsePlace.data[0]._id
    const response1 = await api.get(`request/getIdPlaceStatus?idplace=${idPlace}&&status=AGUARDANDO`)
    const response2 = await api.get(`request/getIdPlaceStatus?idplace=${idPlace}&&status=PREPARANDO`)
    const response3 = await api.get(`request/getIdPlace/${idPlace}`)
    setDate1(response1.data)
    setDate2(response2.data)
    setDate3(response3.data)
  }

  useEffect(()=>{getDate()},[refresh])


  async function changeStatus(status: String, id: String, id2: String, id3: String){
    await api.put(`request/updateStatus/${id}`,{
      status,
    })
    const response = await api.get(`request/get/${id}`)
    const iduser = response.data.iduser
    await api.post(`comand/${iduser}/changeStatus`)
    await api.post(`comand/${id2}/changeStatus`)
    await api.post(`comand/${id3}/changeStatus`)

    if(status === 'RECUSADO'){
      await api.post(`comand/${iduser}/recusado`)
    }

    if(status === 'AGUARDANDO ENTREGADOR'){
          await api.post(`comand/all-entregadores/chamar entregador`)
      }

    getDate()
    setShowLabel(false)
  }

  function recusar(status: String, id: String, id2: String, id3: String){
    Alert.alert(
      'Deseja recusar o pedido?',
      'Isso pode afetar a satisfação do cliente com seu estabelecimento!',
      [
        {text: 'NÃO', style: 'cancel'},
        {text: 'SIM', onPress: () => changeStatus(status, id, id2, id3) },
      ],
      { cancelable: true }
    );
  }

  function retirada(status: String, id: String, id2: String, id3: String){
    Alert.alert(
      'Tem certeza que quer continuar?',
      'Utilize esta opção para outros meios de entrega, ou quando o cliente for retirar o pedido pessoalmente!',
      [
        {text: 'NÃO', style: 'cancel'},
        {text: 'SIM', onPress: () => changeStatus(status, id, id2, id3) },
      ],
      { cancelable: true }
    );
  }

  async function showDetail(id: String) {
    setDate()
    setShowLabel(true)
    const response = await api.get(`request/get/${id}`)
    setDate(response.data)
  }

    return(
    <SafeAreaView style={{flex: 1}}>
         <View style={styles.container}>
      <Header refresh={refresh}/>

      {showLabel?
      <View style={styles.sectionDetail}>
        
          <ScrollView style={styles.scrollLabelDetail}>
          <View style={styles.labelDetail}>
          {date?
          <View style={styles.labelDetail2} key={date._id}>
            <Icon name="close" size={35} color="#424242" style={styles.icon} onPress={() => setShowLabel(false)}/>
          <View style={styles.labelClient}>
            <Text style={styles.numeroPedidoDetail}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
            <View style={styles.labelClient2}>
              <Icon name="person-pin" size={35} color="#424242"/>
              <View>
              <Text>{date.nomeuser}</Text>
              <Text>{date.foneuser}</Text>
              </View>
            </View>
          </View>

          {date.produto.map(date=>(
                <View style={styles.labelProduto}>
                  <Text style={styles.quantidadeProdutoDetail}>{date.quantidade}</Text>
                    <View style={styles.labelProduto2}>
                      <Text style={styles.nomeProduto}>{date.nome}</Text>
                      <Text style={styles.descricaoProduto}>{date.descricao}</Text>
                      {date.opcao1?<Text style={styles.opcaoProduto}>{date.opcao1}</Text>:null}
                      {date.opcao2?<Text style={styles.opcaoProduto}>{date.opcao2}</Text>:null}
                      {date.opcao3?<Text style={styles.opcaoProduto}>{date.opcao3}</Text>:null}
                      {date.observacao?<Text style={styles.obsProduto}>Obs: {date.observacao}</Text>:null}
                    </View>
                  <Text style={styles.valorProduto}>R$ {(date.valor*date.quantidade).toFixed(2)}</Text>
                </View>
              ))}

            <View style={styles.labelPagamentoProduto}>
              {date.pagamento?<Text >Pago pelo Aplicativo</Text>
              :<Text style={styles.txtPagamentoProduto1}>Cliente pagará na entrega</Text>}
              <Text style={styles.txtPagamentoProduto2}>Total: R$ {(date.total + date.frete).toFixed(2)}</Text>
            </View>

            <View style={styles.labelBotaoProduto}>
            <View >
              <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
            </View>

                <View style={styles.labelBotaoProduto2}>

                  {date.status === 'AGUARDANDO' ?
                <View style={styles.labelButtonAction}>
                    <TouchableOpacity style={styles.buttonAction} onPress={()=>recusar('RECUSADO', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt}>Recusar pedido</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAction2} onPress={()=>changeStatus('PREPARANDO', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt}>Preparar pedido</Text></TouchableOpacity>
                </View>
                :date.status === 'PREPARANDO' ?
                    <TouchableOpacity style={styles.buttonAction3} onPress={()=>changeStatus('CHAMAR ENTREGADOR', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt}>Pedido pronto</Text></TouchableOpacity>
                :date.status === 'CHAMAR ENTREGADOR' ? (<View style={styles.labelButtonAction} >
                    <TouchableOpacity style={styles.buttonAction4} onPress={()=>retirada('RETIRADA LOCAL', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt} >Retirada local</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.buttonAction2} onPress={()=>changeStatus('AGUARDANDO ENTREGADOR', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt}>Chamar entregador</Text></TouchableOpacity>
                  </View> )
                :date.status == 'RETIRADA LOCAL' ?
                    <TouchableOpacity style={styles.buttonAction2} onPress={()=>changeStatus('ENTREGUE', date._id, date.idplace, date.iduser)}><Text style={styles.buttonActionTxt}>Confirmar entrega do pedido</Text></TouchableOpacity>
                    
                :date.status === 'AGUARDANDO ENTREGADOR'?<Text style={styles.txtAction}>Procurando entregador</Text>
                :date.status === 'DESIGNADO PARA ENTREGADOR'?<Text style={styles.txtAction}>Entregador a caminho</Text>
                :date.status === 'ENTREGADOR NO RESTAURANTE'?<Text style={styles.txtAction}>Entregador no restaurante</Text>
                :date.status === 'ENTREGADOR A CAMINHO'?<Text style={styles.txtAction}>Entregador deslocando-se</Text>
                :date.status === 'ENTREGADOR NO CLIENTE'?<Text style={styles.txtAction}>Entregador no cliente</Text>
                
                :null
                }
                </View>
            </View>

          </View>
      :<ActivityIndicator size="large" color="#72B76B" style={styles.detailIndicator}/>
      }
      </View>
      </ScrollView>
      </View>

      :null}

      <ScrollView style={styles.section} showsVerticalScrollIndicator={false}>

        <View style={styles.sectionContainer} >
          <View style={styles.labelSection}>
          <Text style={styles.titleSection}>Novos Pedidos:</Text>
          {date1 && date1.length > 0?
          date1.map(date=>(
          <TouchableOpacity 
          style={styles.mainLabel} 
          key={date._id}
          onPress={() => showDetail(date._id)}
          >
          <View style={styles.mainLabelClient}>
          <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
          </View>
                {date.produto.slice(0, 2).map(date => (
                <View style={styles.mainLabelProduto}>
                  <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                    <View style={styles.labelProduto2}>
                      <Text style={styles.nomeProduto}>{date.nome}</Text>
                    </View>
                </View>
                ))}
              <View style={styles.mainLabelHour}>
                <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                <Icon name="expand-more" size={20} color="#424242" />
              </View>
              
          </TouchableOpacity>
        ))
        :null}
        </View>
        


        <View style={styles.labelSection}>
        <Text style={styles.titleSection}>Preparando:</Text>
        {date2 && date2.length > 0?
        date2.map(date=>(
          <TouchableOpacity 
          style={[styles.mainLabel, styles.colorBorder2]} 
          key={date._id}
          onPress={() => showDetail(date._id)}
          >
          <View style={styles.mainLabelClient}>
          <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
          </View>

              {date.produto.slice(0, 2).map(date => (
                <View style={styles.mainLabelProduto}>
                  <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                    <View style={styles.labelProduto2}>
                      <Text style={styles.nomeProduto}>{date.nome}</Text>
                    </View>
                </View>
                ))}

              <View style={styles.mainLabelHour}>
                <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                <Icon name="expand-more" size={20} color="#424242" />
              </View>

          </TouchableOpacity>
        ))
        :null}
        </View>


        <View style={styles.labelSection}>
        <Text style={styles.titleSection}>Prontos:</Text>
        {date3 && date3.length > 0?
        date3.map(date=>(
            date.status === 'AGUARDANDO' 
            || date.status === 'PREPARANDO' 
            || date.status === 'ENTREGUE' 
            || date.status === 'NAO ENTREGUE' 
            || date.status === 'INCIDENTE'
            || date.status === 'NAO PREPARADO'
            || date.status === 'FECHADO'
            || date.status === 'RECUSADO'
            ?null:
          <TouchableOpacity 
          style={[styles.mainLabel, styles.colorBorder3]} 
          key={date._id}
          onPress={() => showDetail(date._id)}
          >
          <View style={styles.mainLabelClient}>
          <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
          </View>

                {date.produto.slice(0, 2).map(date => (
                <View style={styles.mainLabelProduto}>
                  <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                    <View style={styles.labelProduto2}>
                      <Text style={styles.nomeProduto}>{date.nome}</Text>
                    </View>
                </View>
                ))}

                  {
                  date.status === 'CHAMAR ENTREGADOR'?<Text style={[styles.txtAction2, styles.color1 ]} >Chame um entregador</Text>
                  :date.status === 'AGUARDANDO ENTREGADOR'?<View style={styles.txtAction4}><Text style={styles.txtAction3} >Procurando entregador</Text><ActivityIndicator size={10} color="#424242" style={{paddingLeft: 2}} /></View>
                  :date.status === 'DESIGNADO PARA ENTREGADOR'?<Text style={styles.txtAction2}>Entregador a caminho</Text>
                  :date.status === 'ENTREGADOR NO RESTAURANTE'?<Text style={styles.txtAction2}>Entregador no restaurante</Text>
                  :date.status === 'ENTREGADOR A CAMINHO'?<Text style={styles.txtAction2}>Entregador deslocando-se</Text>
                  :date.status === 'ENTREGADOR NO CLIENTE'?<Text style={styles.txtAction2}>Entregador no cliente</Text>
                  :date.status === 'RETIRADA LOCAL'?<Text style={[styles.txtAction2, styles.color2 ]}>Aguardando retirada</Text>
                  :null}

              <View style={styles.mainLabelHour}>
                <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                <Icon name="expand-more" size={20} color="#424242" />
              </View>

          </TouchableOpacity>
        ))
        :null}
        </View>
  

      </View>
      </ScrollView>
    </View>
    </SafeAreaView>
    )
}

export default Home