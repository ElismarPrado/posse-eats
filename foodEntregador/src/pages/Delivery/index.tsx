import React, {useState, useEffect} from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import api from '../../services/api'
import styles from './styles'
import dateFormat from 'dateformat';


interface Data {
  _id: string
  createAt: string
  identregador: string
  total: number
  frete: number
  pagamento: boolean
  repasse: boolean
  produto: [{
    nomeplace: string
    quantidade: number
    nome: string
  }] 
}

const Delivery = () => {
    const navigation = useNavigation()
    dateFormat.masks.data = 'dd/mm/yyyy';
    dateFormat.masks.hora = 'HH:MM';

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        getDate()
      });
      return unsubscribe;
    }, [navigation]);

    const [date, setDate] = useState<Data[]>([])

    const [totalReceber, setTotalReceber] = useState<Number>()
  

    async function getDate(){
        const id = await AsyncStorage.getItem('idUser@foodEntregador');
        const id2 = `entregador-${id}`
        const response = await api.get(`/request/getIdEntregadorStatus?identregador=${id2}&&status=ENTREGUE`)
        setDate(response.data)

        let valor = 0
        response.data.map((date: any) => (
          date.repasse || date.pagamento ?
          valor =+ date.frete
          :null
        ))

        setTotalReceber(valor)

    }
    useEffect(() => {getDate()}, [])

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
            <Text style={styles.title}>Minhas entregas</Text>

            <View style={styles.miniatureInfo}>
              <View style={styles.miniatureLabelState}>
                <View style={styles.miniatureColor1}></View>
                <Text style={styles.miniatureTextStatus}>Á repassar</Text>
              </View>
              <View style={styles.miniatureLabelState}>
                <View style={styles.miniatureColor3}></View>
                <Text style={styles.miniatureTextStatus}>Repassadas</Text>
              </View>
              <View style={styles.miniatureLabelState}>
                <View style={styles.miniatureColor2}></View>
                <Text style={styles.miniatureTextStatus}>Pagas pelo App</Text>
              </View>
          </View>

            <ScrollView  style={styles.scrollSection}>
            <View style={styles.section}>
                {date?
                date.map(date => (
                    <View key={date._id} style={date.repasse ? styles.labelRepasse 
                    : date.pagamento? styles.labelPagamento: styles.label} >
                        <View style={styles.label2} >
                        <Text style={styles.numeroPedido}>{date._id.slice((date._id.length-5), date._id.length)}</Text>
                        <View style={styles.mainLabelHour}>
                            <Text style={styles.txtHoraProduto}>{dateFormat(date.createAt, "hora")}</Text>
                            <Text style={styles.txtDataProduto}>{dateFormat(date.createAt, "data")}</Text>
                        </View>
                        </View>

                        <Text style={styles.nomePlace}>{date.produto[0].nomeplace}</Text> 

                        {date.produto.slice(0, 1).map(date => (
                            <View style={styles.mainLabelProduto}>
                            <Text style={styles.quantidadeProduto}>{date.quantidade}</Text>
                                <View style={styles.labelProduto2}>
                                <Text style={styles.nomeProduto}>{date.nome}</Text>
                                </View>
                            </View>
                            ))}
                        <Text style={styles.valores}>Total: R$ {(date.total + date.frete).toFixed(2)}</Text>
                    </View>
                ))
                :null}
            </View>
            </ScrollView>

        </View>
          {totalReceber ? <Text style={styles.totalReceber}>Meu saldo à receber: <Text style={{color: '#72B76B'}}> R$ {totalReceber.toFixed(2).replace('.', ',')}</Text></Text>: null}
    </SafeAreaView>
    )
}

export default Delivery