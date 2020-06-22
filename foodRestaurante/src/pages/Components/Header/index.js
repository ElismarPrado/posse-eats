import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api'

import io from 'socket.io-client';

const API_URL = 'http://3.23.146.65:3333'

export default function Header(){
    const [state, setState] = useState('false')


  //Conexão de socket.io --------------------------------------------------------------------------------
  async function socket() {
    const id = await AsyncStorage.getItem('idUser@foodRestaurante')
    const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
    const dadosPlace = responsePlace.data
    const idPlace = dadosPlace.map(date=>(date._id))
      const socket = io(API_URL, {
        query: {user: id},
      });
      socket.on('canal', date => {
        if(date.id === id && date.msg === 'atualizar status de abertura'){
         getDate() 
        }
      });
    }
    useEffect(() => {
      socket();
    }, []);

    async function getDate(){
      const id = await AsyncStorage.getItem('idUser@foodRestaurante')
      const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
      const dadosPlace = responsePlace.data
      const open = dadosPlace.map(date=>(date.open))
      setState(open)
    }
    useEffect(()=>{getDate()},[])

      async function changeState(value){
        setState(value)
        const id = await AsyncStorage.getItem('idUser@foodRestaurante')
        const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
        const idPlace = responsePlace.data[0]._id
        await api.put(`place/updateOpen/${idPlace}`,{
          open: value
        })
        await api.post(`comand/all-clients/atualizar status de abertura`)
        await api.post(`comand/${idPlace}/atualizar status de abertura`)
      }

  return (
  <View style={Styles.section}>
    {state=='true'?
    <>
    <Text style={Styles.txtStatusOn}>Aberto</Text>
        <Switch
            style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
            value={true}
            onValueChange={()=>changeState('false')}
        />
    </>
      :
      <>
      <Text style={Styles.txtStatusOff}>Fechado</Text>
          <Switch
              style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] }}
              value={false}
              onValueChange={()=>changeState('true')}
          />
      </>}
  </View>
)
}

const Styles = StyleSheet.create({
    section: {
        width: '100%',
        paddingTop: 25,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 20,
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },

    txtStatusOn: {
        color: '#72B76B',
      },
    
    txtStatusOff: {
        color: '#DC143C',
      },
})