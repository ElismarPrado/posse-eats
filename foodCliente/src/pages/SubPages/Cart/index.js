import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import Styles from './styles';
import api from '../../../services/api';
import AsyncStorage from '@react-native-community/async-storage';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const LATITUDE_BASE = -14.0920718
const LONGITUDE_BASE = -46.3726593

import End from '../../Components/End';

export default function Cart() {

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDateAsync();
      setRefresh(true);
      getDate();
      setTimeout(() => {setRefresh(false)}, 500)
    });
    return unsubscribe;
  }, [navigation]);

  const [raio, setRaio] = useState() // perimetro para realização de pedidos
  const [refresh, setRefresh] = useState(false)

  const [date, setDate] = useState();
  const [total, setTotal] = useState(0);
  const [id1, setId1] = useState([]);
  const [pag, setPag] = useState(false);
  const [end, setEnd] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [tipoPagamento, setTipoPagamento] = useState('');
  const [numberCard, setNumberCard] = useState();

  const [frete, setFrete] = useState(0)

  async function getDateAsync(){
    const number = await AsyncStorage.getItem('numberCard@foodCliente');
    setNumberCard(number);
  }
  useEffect(() => {
    getDateAsync();
  }, []);

  //Função para obter todos os itens do carrinho ------------------------------------------------------------------------
  async function getDate(){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const response = await api.get(`cart/getIdUser?iduser=${id}`);
    const responseEnd = await api.get(`address/getIdUserStatus?iduser=${id}&&status=true`)
    setEnd(responseEnd.data)
    setDate(response.data);
    const dados = response.data;
    const array = [];
    dados.map(date => array.push(date.idplace));
    const array2 = [...new Set(array)];
    setId1(array2);


    const resFrete = await api.get('frete/get')
    const x =  resFrete.data[0].valor
    if(x){
      setFrete(x*array2.length)
    }


    //codigo para determinar perimetro para realizar pedido
    const responseAdress = await api.get(`address/getIdUserStatus?iduser=${id}&&status=true`)
    const {lat, lgt} = responseAdress.data[0]
    const coords = (parseFloat(lat)+parseFloat(lgt)).toFixed(2)
    const coordsMax = (parseFloat(coords)-0.15).toFixed(2) // + 15km
    const coordsMin = (parseFloat(coords)+0.15).toFixed(2) // - 15km
    const coordsRef = (parseFloat(LATITUDE_BASE)+parseFloat(LONGITUDE_BASE)).toFixed(2)
    if(coordsRef<=coordsMax && coordsRef>=coordsMin){
      setRaio(true)
    }else{
      setRaio(false)
    }
  }
  useEffect(() => {
    getDate();
  }, []);

  async function deleteDate(value){
    await api.delete(`cart/delete/${value}`);
    getDate();
  }
//----------------------------------------------------------------------------------------------------------------------


// Função para somar itens do carrinho ----------------------------------------------------------------------------------
  function somaTotal(){
    if (date) {
      let value = 0;
      date.map(dados => (value += dados.valor * dados.quantidade));
      setTotal(value);
    }
  }
  useEffect(() => {
    somaTotal();
  }, [date]);
// ----------------------------------------------------------------------------------------------------------------------

async function deleteAllDate(){
  const id = await AsyncStorage.getItem('idUser@foodCliente');
  await api.delete(`cart/deleteAll/${id}`);
  getDate();
}

// Função para finalizar pedido -----------------------------------------------------------------------------------------
  async function finalizarConfirm(t){
    const id = await AsyncStorage.getItem('idUser@foodCliente');
    const nome = await AsyncStorage.getItem('nameUser@foodCliente');
    const fone = await AsyncStorage.getItem('foneUser@foodCliente');

    const responseEnd = await api.get(`address/getIdUserStatus?iduser=${id}&&status=true`)
    const dadosEnd = responseEnd.data[0]
    const logradouro = dadosEnd.logradouro
    const numero = dadosEnd.numero
    const complemento = dadosEnd.complemento
    const referencia = dadosEnd.referencia
    const lattitude = dadosEnd.lat
    const longitude = dadosEnd.lgt

    const frete2 = frete/id1.length

    let value = 0;
    for (let i = 0; i < id1.length; i++) {
      const response = await api.get(`cart/getIdUserIdPlace?iduser=${id}&&idplace=${id1[i]}`)
      const dados = response.data
      dados.map(date=>(
        value += date.valor*date.quantidade
      ))
      await api.post('request/create',{
        produto: 
          dados.map(date=>(
            {
              fotoplace: date.fotoplace,
              nomeplace: date.nomeplace,
              foneplace: date.foneplace,
              foto: date.foto,
              nome: date.nome,
              descricao: date.descricao,
              categoria: date.categoria,
              quantidade: date.quantidade,
              valor: date.valor,
              observacao: date.observacao,
              opcao1: date.opcao1,
              opcao2: date.opcao2,
              opcao3: date.opcao3,
            }
          ))
        ,
        idplace: id1[i],
        iduser: id,
        nomeuser: nome,
        fotouser: "",
        foneuser: fone,
        end: logradouro,
        numero,
        complemento,
        referencia,
        lat: lattitude,
        lgt: longitude,
        status: "AGUARDANDO",
        total: value,
        pagamento: t, 
        frete: frete2,
      })
      value = 0
    }
    deleteAllDate()
    comand()
    navigation.navigate('Início')
    navigation.navigate('Pedidos')
}
// ----------------------------------------------------------------------------------------------------------------------

async function comand(){
    for (let i = 0; i < id1.length; i++) {
      await api.post(`comand/${id1[i]}/novo pedido`)
    }
}

function finalizar(){

  if(tipoPagamento=='Dinheiro'){
    finalizarConfirm(false)
  }
  else if(tipoPagamento=='Cartão'){
    alert('tipo de pagamento invalido')
    //finalizarConfirm(true)
  }
}

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={Styles.container}>
       <View style={Styles.header}>
        <Icon
          name="chevron-left"
          size={40}
          color="#34CB79"
          style={Styles.back}
          onPress={() => navigation.goBack(null)}/>
          <Text>SACOLA</Text>
      </View>

      <ScrollView style={Styles.scrollSection} showsVerticalScrollIndicator={false}>
        <View style={Styles.section}>

        {date?
          date.length > 0?
          <>

        <View style={Styles.endereco}>
          <Text style={Styles.titleEndereco}>Entregar em</Text>
          <TouchableOpacity style={Styles.labelEndereco} onPress={() => navigation.navigate('Endereco')}>
            <View style={Styles.labelEnderecoMap}>
              <Icon name="location-on" style={Styles.iconMap} size={40} color="#555" />
                  <End all={false} refresh={refresh}/>
            </View>
          <Icon name="chevron-right"  style={Styles.iconEndereco} size={22} color="#34CB79" />
          </TouchableOpacity>
        </View>


          <TouchableOpacity style={Styles.frete} onPress={()=>
            alert('Ao adicionar produtos de estabelecimentos diferentes, o valor de entrega pode aumentar.')}>
            <View>
              <Text style={Styles.freteTitle}>Entrega padrão</Text>
             <Text style={Styles.freteTexto}>Agora - R$ {frete.toFixed(2)}</Text>
             </View>
          <Icon name="help-outline"  style={Styles.freteIcon} size={25} color="#999" />
          </TouchableOpacity>
       
          <View style={Styles.labelTitle}>
          <Text style={Styles.title}>Itens da sacola</Text>
          </View>
          
          {date.map(dados=>(
            <View key={dados._id} style={Styles.label}>
              <TouchableOpacity
                style={Styles.close}
                onPress={()=>deleteDate(dados._id)}>
                <Icon  name="close" size={30} color="red" />
              </TouchableOpacity>
              <Text style={Styles.quantidade}>{dados.quantidade}</Text>
              <Image 
                style={Styles.image}
                source={{uri: `${dados.foto}`}}/>
                <View style={Styles.labelNome}>
                    <Text style={Styles.nome}>{dados.nome}</Text>
                    <Text style={Styles.descricao}>{dados.descricao}</Text>
                    {dados.observacao?<Text style={Styles.descricao}>Obs: {dados.observacao}</Text>:null}
                </View>
              <Text style={Styles.valor}>R$ { (dados.valor * dados.quantidade).toFixed(2) }</Text>
            </View>
          ))}
          </>
          :<Text style={Styles.noItens}>Não há itens na sacola</Text>
          :null}
      
        </View>
      </ScrollView>
      {date&&date.length > 0 ?
      <>
      {tipoPagamento?
      <TouchableOpacity style={Styles.labelTotal} onPress={()=>setShowLabel(true)}>
      {tipoPagamento=='Dinheiro'?<Text style={Styles.tipoPagText}>Pagamento com DINHEIRO na entrega</Text>:
      tipoPagamento=='Cartão'?<Text style={Styles.tipoPagText}>Pagamento com CARTÃO DE CRÉDITO</Text>:null}
      <View style={Styles.labelTotalIcon}>
       <Text style={Styles.totalText}>Total: R$ {(total + frete).toFixed(2)}</Text>
       <Icon
          name="chevron-right"
          size={17}
          color="#555"/>
          </View>
       </TouchableOpacity>
       :
       <View style={Styles.labelTotal2}>
       <Text style={Styles.totalText}>Total: R$ {(total + frete).toFixed(2)}</Text>
       </View>
       }
        

          {
          end&& end.length > 0?
              pag?
                  raio?
                  <TouchableOpacity 
                    onPress={()=>finalizar()}
                    style={Styles.buttom}>
                      <Text style={Styles.buttomText}>Finalizar pedido </Text>
                  </TouchableOpacity>
                  :
                  <TouchableOpacity 
                    onPress={()=>alert('Desculpe, não podemos entregar no seu endereço, porque está fora da nossa zona de entregas.')}
                    style={Styles.buttom}>
                    <Text style={Styles.buttomText}>Finalizar pedido </Text>
                  </TouchableOpacity>
              :
                <TouchableOpacity 
                onPress={()=>setShowLabel(true)}
                style={Styles.buttom}>
                    <Text style={Styles.buttomText}>Escolher forma de pagamento</Text>
                </TouchableOpacity>
          :
              <TouchableOpacity 
              onPress={()=>navigation.navigate('Endereco')}
              style={Styles.buttom}>
                  <Text style={Styles.buttomText}>Complete seu endereço</Text>
              </TouchableOpacity>
          }
          </>
          :null
        }    


        {showLabel?
        <View style={Styles.labelPagamento}>
          <View style={Styles.subLabelPagamento}>
            <Icon
              style={Styles.labelPagamentoClose}
              name="close"
              size={35}
              color="#555"
              onPress={()=>setShowLabel(false)}/>

            <Text style={Styles.titlePagamento}>Escolha uma opção:</Text>
              <TouchableOpacity 
              onPress={()=>{setTipoPagamento('Dinheiro'), setShowLabel(false), setPag(true)}}
              style={[Styles.buttonPagamento, tipoPagamento == 'Dinheiro'? Styles.selected: null]}>
                   <Icon
                    name="local-atm"
                    size={30}
                    color="#555"/>
                  <View style={Styles.subLabelPagamento2}>
                  <Text style={Styles.txtPagamento}>DINHEIRO</Text>
                  <Text style={Styles.txtPagamento2}>Pagar com dinheiro na entrega</Text>
                  </View>
              </TouchableOpacity>

              {numberCard?
              <TouchableOpacity 
              onPress={()=>{setTipoPagamento('Cartão'), setShowLabel(false), setPag(true)}}
              style={[Styles.buttonPagamento, tipoPagamento == 'Cartão'? Styles.selected: null]}>
                    <Icon
                    name="credit-card"
                    size={30}
                    color="#555"/>
                  <View style={Styles.subLabelPagamento2}>
                  <Text style={Styles.txtPagamento}>CARTÃO DE CRÉDITO</Text>
                  <Text style={Styles.txtPagamento2}>final {numberCard.slice(12)}</Text>
                  </View>
              </TouchableOpacity>
              :
              <TouchableOpacity 
              onPress={()=>alert('Dísponivel em breve')}
              style={Styles.buttonPagamento}>
                    <Icon
                    name="credit-card"
                    size={30}
                    color="#555"/>
                  <View style={Styles.subLabelPagamento2}>
                  <Text style={Styles.txtPagamento}>CARTÃO DE CRÉDITO</Text>
                  <Text style={Styles.txtPagamento2}>Adicionar cartão</Text>
                  </View>
              </TouchableOpacity>
              }
          </View>
        </View>
        :null}

    </View>
    </SafeAreaView>
  )
}