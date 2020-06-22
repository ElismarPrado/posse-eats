import React, { useState, useEffect } from 'react'
import { Alert, Text, View, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api'
import styles from './styles'
import dateFormat from 'dateformat';

interface Date {
    _id: string
    createAt: string
    identregador: string
    total: number
    frete: number
    pagamento: boolean
    produto: [{
      quantidade: number
      nome: string
    }] 
  }

const Bill = () => {
    const navigation = useNavigation()

    dateFormat.masks.data = 'dd/mm/yyyy';
    dateFormat.masks.hora = 'HH:MM';

    const [date1, setDate1] = useState<Date[]>([])
    const [date2, setDate2] = useState<Date[]>([])

    const [status, setStatus] = useState('receber')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getDate()
        });
        return unsubscribe;
      }, [navigation]);

    async function getDate(){
        const id = await AsyncStorage.getItem('idUser@foodRestaurante')
        const responsePlace = await api.get(`place/getIdUser?iduser=${id}`)
        const idPlace = responsePlace.data[0]._id
        const response1 = await api.get(`/requestContas/getIdPlaceRepasse?idplace=${idPlace}&&repasse=false&&status=ENTREGUE`)
        const response2 = await api.get(`/requestContas/getIdPlaceRepasse?idplace=${idPlace}&&repasse=true&&status=ENTREGUE`)
       
        setDate1(response1.data)
        setDate2(response2.data)
      }
      useEffect(()=>{getDate()},[])


      function changeStateConfirm(id: String){
        Alert.alert(
          'Você recebeu do entregador?',
          'Atenção, Esta operação não pode ser revertida!',
          [
            {text: 'NÃO', style: 'cancel'},
            {text: 'SIM', onPress: () => changeState(id) },
          ],
          { cancelable: true }
        );
      }

      async function changeState(id: String){
        await api.put(`requestContas/updateRepasse/${id}`, {
            repasse: true
          })
          getDate()
      }

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.8} style={[styles.button, status=='receber'?styles.selected:null]} onPress={()=>setStatus('receber')}>
                    <Text style={[styles.txtButton, status=='receber'?styles.txtSelected:null]}>A RECEBER</Text>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.8} style={[styles.button, status=='recebidas'?styles.selected:null]} onPress={()=>setStatus('recebidas')}>
                    <Text style={[styles.txtButton, status=='recebidas'?styles.txtSelected:null]}>RECEBIDAS</Text>
                </TouchableOpacity>
            </View>

            {status === 'receber' ?
            <ScrollView>
            <View style={styles.section}>
                {date1?
                date1.map(date => (
                    !date.pagamento ?
                    <View style={styles.label} >
                        <View style={styles.label3} >
                        <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
                        <View style={styles.mainLabelHour}>
                            <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                            <Text style={styles.txtDataProduto}>{dateFormat(date.createAt, "data")}</Text>
                        </View>
                        </View>
                        {date.produto.slice(0, 2).map(date => (
                            <View style={styles.mainLabelProduto}>
                            <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                                <View style={styles.labelProduto2}>
                                <Text style={styles.nomeProduto}>{date.nome}</Text>
                                </View>
                            </View>
                            ))}
                            <Text style={styles.valores}>Receber: R$ {(date.total + date.frete).toFixed(2)}</Text>
                            <TouchableOpacity onPress={() => changeStateConfirm(date._id)} style={styles.buttonChange}>
                                <Text style={styles.txtButtonChange}>Recebido</Text>
                            </TouchableOpacity>
                    </View>
                    :null
                ))
                :null}
            </View>
            </ScrollView>

            :status === 'recebidas' ?
            <ScrollView>
            <View style={styles.section}>
                {date2?
                date2.map(date => (
                    !date.pagamento ?
                    <View style={styles.label2} >
                        <View style={styles.label3} >
                        <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
                        <View style={styles.mainLabelHour}>
                            <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                            <Text style={styles.txtDataProduto}>{dateFormat(date.createAt, "data")}</Text>
                        </View>
                        </View>
                        {date.produto.slice(0, 2).map(date => (
                            <View style={styles.mainLabelProduto}>
                            <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                                <View style={styles.labelProduto2}>
                                <Text style={styles.nomeProduto}>{date.nome}</Text>
                                </View>
                            </View>
                            ))}
                            <View style={styles.labelButton}>
                                <Text style={styles.valores}>Recebido: R$ {(date.total + date.frete).toFixed(2)}</Text>
                            </View>
                    </View>
                    :null
                ))
                :null}
            </View>
            </ScrollView>
            :null}

        </View>

    </SafeAreaView>
    )
}

export default Bill