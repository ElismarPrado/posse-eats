import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Text, View, Alert, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native'
import styles from './styles'
import api from '../../services/api'
import AsyncStorage from '@react-native-community/async-storage'
import io from 'socket.io-client';
import dateFormat from 'dateformat';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

import { Notifications } from 'expo';

import Info from '../Components/info';

const API_URL = 'http://3.23.146.65:3333'

export default function Pedidos() {
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDate()
    });
    return unsubscribe;
  }, [navigation]);

  dateFormat.masks.dataf = 'dd/mm/yyyy';
  dateFormat.masks.horaf = 'HH:MM';

  const [date, setDate] = useState()
  const [date2, setDate2] = useState()
  const [date3, setDate3] = useState()

  const [showLabel, setShowLabel] = useState(false)

  const [status, setStatus] = useState('andamento')

    //Conexão de socket.io --------------------------------------------------------------------------------
    async function socket() {
      const id = await AsyncStorage.getItem('idUser@foodCliente');
      const socket = io(API_URL, {
        query: {user: id},
      });
      socket.on('canal', date => {
        if(date.id === id && date.msg === 'changeStatus'){
          getDate()
        }
        if(date.id === id && date.msg === 'recusado'){
          alert('Seu pedido foi recusado; O restaurante pode ter encerrado o expediente, favor refaça o pedido em outro estabelecimento!')
          getDate()
          not('Seu pedido não pode ser atendido, favor faça outro pedido')
        }
        if(date.id === id && date.msg === 'pedido chegou'){
          getDate()
          not('Seu pedido chegou')
        }
      });
    }
    useEffect(() => {
      socket();
    }, []);

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
    

  async function getDate(){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`request/getIdUser/${id}`)
    const response2 = await api.get(`request/getIdUser/${id}`)
    setDate(response.data)
    setDate2(response2.data)
  }
  useEffect(()=>{getDate()},[])


  // Função para deletar todos os itens do carrinho -----------------------------------------------------------------------
  function deleteConfirm(value, value2){
    Alert.alert(
      'Deseja cancelar o pedido?',
      'Muitos cancelamentos podem resultar em bloqueio do aplicativo!',
      [
        {text: 'NÃO', style: 'cancel'},
        {text: 'SIM', onPress: () => deleteAllDate(value, value2) },
      ],
      { cancelable: true }
    );
  }

  async function deleteAllDate(value, value2){
    await api.delete(`request/delete/${value}`)
    await api.post(`comand/${value2}/changeStatus`)
    setShowLabel(false)
    getDate()
  }
// ----------------------------------------------------------------------------------------------------------------------


const [time, setTime] = useState(false)
 setTimeout(() => {
   setTime(true)
 }, 1000);

 async function showDetail(id){
   const response = await api.get(`request/get/${id}`)
   setDate3(response.data)
   setShowLabel(true)
 }


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Info />
       <View style={styles.header}>
          <TouchableOpacity style={[styles.button, status=='andamento'?styles.selected:null]} onPress={()=>setStatus('andamento')}>
            <Text style={[styles.txtButton, status=='andamento'?styles.txtSelected:null]}>EM ANDAMENTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, status=='anteriores'?styles.selected:null]} onPress={()=>setStatus('anteriores')}>
            <Text style={[styles.txtButton, status=='anteriores'?styles.txtSelected:null]}>ANTERIORES</Text>
          </TouchableOpacity>
      </View>

    {status=='andamento'?

        <>
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.section}>
        {date&&
        date.length > 0 ?
        
        <>
        <View style={styles.miniatureInfo}>
          <View style={styles.miniatureLabelState}>
            <View style={styles.miniatureColor1}></View>
            <Text style={styles.miniatureTextStatus}>Aguardando na fila</Text>
          </View>
          <View style={styles.miniatureLabelState}>
            <View style={styles.miniatureColor2}></View>
            <Text style={styles.miniatureTextStatus}>Sendo preparado</Text>
          </View>
          <View style={styles.miniatureLabelState}>
            <View style={styles.miniatureColor3}></View>
            <Text style={styles.miniatureTextStatus}>Saiu para entrega</Text>
          </View>
        </View>
        {date.map(date=>(
           date.status === 'ENTREGUE' 
           || date.status === 'NAO ENTREGUE' 
           || date.status === 'INCIDENTE'
           || date.status === 'NAO PREPARADO'
           || date.status === 'FECHADO'
           || date.status === 'RECUSADO'
           ?null:
          <TouchableOpacity onPress={()=>showDetail(date._id) }
          style={[styles.miniatureLabel , 
            date.status === 'AGUARDANDO'?
            {backgroundColor: '#72B76B'}
            :date.status === 'PREPARANDO'
            ||date.status === 'AGUARDANDO ENTREGADOR'
            ||date.status === 'CHAMAR ENTREGADOR' ?
            {backgroundColor: 'tomato'}
            :date.status === 'DESIGNADO PARA ENTREGADOR' 
            ||date.status === 'ENTREGADOR NO RESTAURANTE' 
            ||date.status === 'ENTREGADOR A CAMINHO'  
            ||date.status === 'RETIRADA LOCAL'  
            ? {backgroundColor: '#CD853F'}
            :date.status === 'ENTREGADOR NO CLIENTE' ? {backgroundColor: '#FFD750'} 
            :null
          ]}  key={date._id}>

              <View style={styles.miniatureLabel2}>
                <Image 
                  style={styles.miniatureImage}
                  source={{uri: `${date.produto[0].fotoplace}`}}/>
                <Text style={styles.miniatureText}>{date.produto[0].nomeplace}</Text>
              </View>

              
              <View style={styles.miniatureLabelProduct2}>
                <Text style={styles.miniatureAmountProduct} >{date.produto[0].quantidade}</Text>
                <Text style={styles.miniatureNameProduct}>{date.produto[0].nome}</Text>
                <Text style={styles.miniatureValueProduct}>R$ {(date.produto[0].valor*date.produto[0].quantidade).toFixed(2)}</Text>
              </View>

              <Text style={styles.miniatureTextMore} >...</Text>
              

              <View style={styles.miniatureStatusLabel}>
                <Text style={styles.miniatureStatus}>Ver detalhes</Text>
                <Icon name="chevron-right" size={12} color="#424242" />
              </View>
          </TouchableOpacity>
        ))}
        </>
  
        :
        <View style={styles.noDate}>
          {time?
          <Text>Você não fez nenhum pedido!</Text>
          :<ActivityIndicator size="large" color="#424242"/>
          }
        </View>
        }
      </View>

    </ScrollView>

{showLabel?
  <ScrollView style={styles.scrollLabelDetail}>
        {date3?
        <View style={styles.labelDetail}>
        <View style={styles.label} key={date3._id}>
        <View style={styles.label2}>
        <View style={styles.labelPlace}>
          <Image 
            style={styles.imagePlace}
            source={{uri: `${date3.produto[0].fotoplace}`}}/>
          <View style={styles.sectionPlace}>
              <Text>{date3.produto[0].nomeplace}</Text>
        </View>
        <Icon name="close" size={40} color="#424242" onPress={()=>setShowLabel(false)} />
        </View>

        <Text style={styles.produto}>Produtos:</Text>
        {date3.produto.map(date=>(
        <View style={styles.labelProduto}>
           <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
          <Image 
            style={styles.imageProduto}
            source={{uri: `${date.foto}`}}/>
            <View style={styles.labelNome}>
                <Text style={styles.nomeProduto}>{date.nome}</Text>
                <Text style={styles.descricaoProduto}>{date.descricao}</Text>
                {date.observacao?<Text style={styles.descricaoProduto}>Obs: {date.observacao}</Text>:null}
            </View>
        <Text style={styles.valorProduto}>R$ {(date.valor*date.quantidade).toFixed(2)}</Text>
        </View>
        ))}
        <View style={styles.labelTotalProduto}>
        <Text style={styles.frete}>+ Entrega R$ {date3.frete.toFixed(2)}</Text>
            <Text style={styles.totalProduto}>Total: R$ {(date3.total + date3.frete).toFixed(2)}</Text>
        </View>

        </View>
        <View style={[styles.labelStatus , 
          date3.status === 'AGUARDANDO'?
          {backgroundColor: '#72B76B'}
          :date3.status === 'PREPARANDO'
          ||date3.status ==='AGUARDANDO ENTREGADOR'
          ||date3.status === 'CHAMAR ENTREGADOR'?
          {backgroundColor: 'tomato'}
          :date3.status === 'DESIGNADO PARA ENTREGADOR' 
          ||date3.status ==='ENTREGADOR A CAMINHO' 
          ||date3.status === 'ENTREGADOR NO RESTAURANTE'  
          ||date3.status === 'RETIRADA LOCAL'  
          ?{backgroundColor: '#CD853F'}
          :date3.status === 'ENTREGADOR NO CLIENTE' ? {backgroundColor: '#FFD750'}
          :null 
          
        ]}>
          {date3.status === 'AGUARDANDO' ? <Text style={styles.textoStatus}>Pedido aguardando na fila</Text>
          :date3.status === 'PREPARANDO' || date3.status === 'CHAMAR ENTREGADOR' || date3.status === 'AGUARDANDO ENTREGADOR' ? <Text style={styles.textoStatus}>Pedido sendo preparado</Text>
          :date3.status === 'ENTREGADOR NO RESTAURANTE' 
          ||date3.status === 'DESIGNADO PARA ENTREGADOR' 
          ||date3.status === 'ENTREGADOR A CAMINHO' 
          ? <Text style={styles.textoStatus}>Pedido saiu para entrega</Text>
          :date3.status === 'RETIRADA LOCAL' ? <Text style={styles.textoStatus}>Pedido Pronto</Text>
          :date3.status === 'ENTREGADOR NO CLIENTE' ? <Text style={styles.textoStatus}>Seu pedido chegou</Text>
          :NULL}
          {date3.status === 'AGUARDANDO'&&
          <TouchableOpacity
              style={styles.cancelar}
              onPress={()=>deleteConfirm(date3._id, date3.idplace)}>
              <Text style={styles.textoCancelar}>Cancelar</Text>
          </TouchableOpacity>
          }
        </View>

      </View>
      </View>
      :null}
    </ScrollView>

     :null}

     </>

    :status === 'anteriores'?
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.section2}>
        {date2 && date2.length > 0?
        date2.slice(0,10).map(date=>(
          date.status === 'ENTREGUE' ?
          <View key={date._id} style={styles.labelPA}>
            <View style={styles.labelPA2}>
              <Text style={styles.horaPA}>{dateFormat(date.createAt, "horaf")}</Text>
              <Text style={styles.dataPA}>{dateFormat(date.createAt, "dataf")}</Text>
            </View>
            <View style={styles.labelPA3}>
                <Text>{date.produto[0].nomeplace}</Text>
                    {date.produto.slice(0, 5).map(date=>(
                      <View style={styles.labelPA4}>
                        <Text style={styles.textoPA}>{date.quantidade}</Text>
                        <Text style={styles.textoPA}>{date.nome}</Text>
                        <Text style={styles.textoPA}>R$ {(date.quantidade * date.valor).toFixed(2)}</Text>
                      </View>
                    ))}
            </View>
          </View>
          :null
          ))
        :<Text style={styles.aviso}>Não há pedidos anteriores</Text>}
      </View>
    </ScrollView>
    :null}

    </View>
    </SafeAreaView>
  )
}