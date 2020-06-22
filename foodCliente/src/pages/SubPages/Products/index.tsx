import React, {useState, useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import api from '../../../services/api';
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'

import Cart from '../../Components/cart';
import MsgCart from '../../Components/msgAddCart';

interface Params {
    id: string
}

interface Data {
    _id: string
    idplace: string
    nomeplace: string
    fotoplace: string
    foneplace: string
    url: string
    nome: string
    descricao: string
    categoria: string
    valor: number
    opcao1: string
    opcao2: string
    opcao3: string
}

const Products = () => {

    const navigation = useNavigation()
    const route = useRoute()

    const routeParams = route.params as Params
    const id = routeParams.id

    const [date, setDate] = useState<Data>();
    const [amount, setAmount] = useState(1);
    const [observacao, setObservacao] = useState<String>('')

    const [showCart, setShowCart] = useState(false);
    const [state, setState] = useState(false);

    const [opcao1, setOpcao1] = useState<String>('')
    const [opcao2, setOpcao2] = useState<String>('')
    const [opcao3, setOpcao3] = useState<String>('')

  const [statusMsg, setStatusMsg] = useState(false)
  useEffect(()=>{
    if(statusMsg==true){
    setTimeout(()=>{setStatusMsg(false)},2500)
    }
  },[statusMsg])

  function add() {
    if (amount < 15) {
      let soma = amount;
      setAmount(soma + 1);
    }
  }

  function sub() {
    if (amount > 1) {
      let diminui = amount;
      setAmount(diminui - 1);
    }
  }

  async function getDate(){
    const response = await api.get(`/product/get/${id}`)
    setDate(response.data)
  }
  useEffect(()=>{getDate()},[])


    async function addCart(){
        if(date){

            const id = await AsyncStorage.getItem('idUser@foodCliente');
            const response = await api.post('cart/create', {
                idplace: date.idplace,
                nomeplace: date.nomeplace,
                fotoplace: date.fotoplace,
                foneplace: date.foneplace,
                iduser: id,
                foto: date.url,
                nome: date.nome,
                descricao: date.descricao,
                categoria: date.categoria,
                valor: date.valor,
                quantidade: amount,
                observacao,
                opcao1,
                opcao2,
                opcao3
            })
            const { success, error } = response.data
            if(success){
                setAmount(1)
                setShowCart(true)
                setState(!state)
                setStatusMsg(true)
            }else{
                alert(error)
                setAmount(1)
                setShowCart(false)
            }
        }
    }

    function format(value: string){
      const array = []
      const x = value.split("'")
      for (let i = 0; i < x.length; i++) {
        if(i%2 == 1){array.push(x[i])}
      }
      return array
    }

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

      <View style={styles.cart}>
      <Cart status={state} />
      {statusMsg && <MsgCart />}
      </View>

      <View style={styles.header}>
        <Icon
          name="chevron-left"
          size={40}
          color="#34CB79"
          style={styles.back}
          onPress={() => navigation.goBack()}/>
          <Text>DETALHES DO ITEM</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}>
        <View style={styles.section}>

          <View style={styles.section2} >
            <Image source={{uri: `${date.url}`}} style={styles.image} />
            <View style={styles.label}>
              <View style={styles.labelNomeDescricao}>
              <Text style={styles.nome}>{date.nome}</Text>
              <Text style={styles.descricao}>{date.descricao}</Text>
              </View>
              <Text style={styles.valor}>R$ {date.valor.toFixed(2)}</Text>
            </View>
          </View>
  
        </View>

        {date.opcao1?
        <View style={styles.sectionOpcao}>
              {format(date.opcao1).map(date=>(
              date.split(".")[1]?
              <TouchableOpacity onPress={()=>setOpcao1(date)} style={styles.labelOpcao}>
                <View style={styles.labelOpcao2}>
                  <Text style={styles.titleOpcao2}>{date.split(".",1)}</Text>
                  <Text style={styles.txtOpcao}>{date.split(".")[1]}</Text>
                </View>
                {opcao1==date?
                <Icon name="radio-button-checked" size={20} color="#34CB79"/>
                :<Icon name="radio-button-unchecked" size={20} color="#555"/>
                }
              </TouchableOpacity>
              :
              <Text style={styles.titleOpcao}>{date.split(".",1)}</Text>
              ))}
        </View>
        :null}

        {date.opcao2?
        <View style={styles.sectionOpcao}>
              {format(date.opcao2).map(date=>(
              date.split(".")[1]?
              <TouchableOpacity onPress={()=>setOpcao2(date)} style={styles.labelOpcao}>
                <View style={styles.labelOpcao2}>
                  <Text style={styles.titleOpcao2}>{date.split(".",1)}</Text>
                  <Text style={styles.txtOpcao}>{date.split(".")[1]}</Text>
                </View>
                {opcao2==date?
                <Icon name="radio-button-checked" size={20} color="#34CB79"/>
                :<Icon name="radio-button-unchecked" size={20} color="#555"/>
                }
              </TouchableOpacity>
              :
              <Text style={styles.titleOpcao}>{date.split(".",1)}</Text>
              ))}
        </View>
        :null}

        {date.opcao3?
        <View style={styles.sectionOpcao}>
              {format(date.opcao3).map((date: String)=>(
              date.split(".")[1]?
              <TouchableOpacity onPress={()=>setOpcao3(date)} style={styles.labelOpcao}>
                <View style={styles.labelOpcao2}>
                  <Text style={styles.titleOpcao2}>{date.split(".",1)}</Text>
                  <Text style={styles.txtOpcao}>{date.split(".")[1]}</Text>
                </View>
                {opcao3==date?
                <Icon name="radio-button-checked" size={20} color="#34CB79"/>
                :<Icon name="radio-button-unchecked" size={20} color="#555"/>
                }
              </TouchableOpacity>
              :
              <Text style={styles.titleOpcao}>{date.split(".",1)}</Text>
              ))}
        </View>
        :null}
        

        <View style={styles.observacao}>
        <Text style={styles.txtObservacao}>Alguma observação?</Text>
            <TextInput
                style={styles.inputText}
                multiline={true}
                autoCorrect={false}
                placeholder="Ex: Tirar cebola, maionese à parte, etc"
                maxLength={70}
                value={String(observacao)}
                onChangeText={setObservacao}
              />
          </View>
      </ScrollView>

      <View style={styles.labelAmount}>

        <View style={styles.labelChangeAmount}>
          <Icon onPress={()=>sub()} name="remove" size={25} color="#34CB79" />
            <Text style={styles.textAmount}>{amount}</Text>
          <Icon onPress={()=>add()} name="add" size={30} color="#34CB79" />
        </View>

        <TouchableOpacity onPress={() => addCart()} style={styles.adicionar}>
          <Text style={styles.txtAdicionar}>Adicionar</Text>
        </TouchableOpacity>

        </View>

    </View>
        
    </SafeAreaView>
    )
}

export default Products