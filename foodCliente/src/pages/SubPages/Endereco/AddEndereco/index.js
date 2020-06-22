import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, TextInput, ScrollView, SafeAreaView, ActivityIndicator} from 'react-native';
import Styles from './styles';
import {MaterialIcons as Icon} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../../services/api';
import MapView from 'react-native-maps';
import * as Location from 'expo-location'

import Geocoder from 'react-native-geocoding'

const GOOGLE_API_KEY = 'chave de acesso'

export default function AddEndereco({ navigation }) {
  const [position, setPosition] = useState({
    latitude: "",
    longitude: "",
  })

  const [region, setRegion] = useState({
    latitude: "",
    longitude: ""
  })

  const [getendereco, setGetEndereco] = useState("")

  const [error, setError] = useState("")
  const [erro, setErro] = useState("")

  const [refress, setRefress] = useState(false)
  const [showLabel, setShowLabel] = useState(false)

  const [numero, setNumero] = useState()
  const [complemento, setComplemento] = useState()
  const [referencia, setReferencia] = useState()
  const [name, setName] = useState()


  // Obtem a posição atual do GPS-------------------------------------------------------------------------  
  useEffect(() => {
    async function loadPosition() {
        const { status } = await Location.requestPermissionsAsync()

        if(status !== 'granted') {
            Alert.alert('Oooops...', 'Precisamos de sua permissão para obter a localização')
        }

        const location = await Location.getCurrentPositionAsync()

        const { latitude, longitude } = location.coords

        setPosition({
          longitude: longitude,
          latitude: latitude
         })
        
      }
      loadPosition()
  }, [])
// Obtem a posição atual do GPS--------------------------------------------------------------------------


      function getEnd(){
        if(region.latitude){
            Geocoder.init(GOOGLE_API_KEY)
                Geocoder.from(region.latitude, region.longitude)
                .then(json => {
                  var addressComponent = json.results[0].formatted_address
                        setGetEndereco(addressComponent)
                })
                .catch(error => setErro(error))
          }
          else{
            Geocoder.init(GOOGLE_API_KEY)
            Geocoder.from(position.latitude, position.longitude)
            .then(json => {
              var addressComponent = json.results[0].formatted_address
                    setGetEndereco(addressComponent)
            })
            .catch(error => setErro(error))
          }    
        }         


        async function confirmEnd(){

          const id = await AsyncStorage.getItem('idUser@foodCliente');

          let nameAtual = ""
          let latitudeAtual = ""
          let longitudeAtual = ""

          if(name){
           nameAtual = name
          }else{
           nameAtual = getendereco.split(',')[0]
          }

          if(region.latitude){
           latitudeAtual = region.latitude
           longitudeAtual = region.longitude
          }else{
           latitudeAtual = position.latitude
           longitudeAtual = position.longitude
          }

          const response = await api.get('address/get')
          const dados = response.data
          dados.map(date =>(
              api.put(`address/updateStatus/${date._id}`,{
              status: false
            })
          ))

          await api.post('address/create', {
            iduser: id,
            name: nameAtual,
            logradouro: getendereco,
            numero: numero,
            complemento: complemento,
            referencia: referencia,
            lat: latitudeAtual,
            lgt: longitudeAtual,
            status: true
          })
          navigation.goBack(null)
        }


  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={Styles.container}>
      {!showLabel?
      position.latitude?<>
      <Icon name="place" size={45} color="#555" style={Styles.marker}/>
      
      <TouchableOpacity
      onPress={()=>{setShowLabel(true), getEnd()}}
      style={Styles.button}>
        <Text style={Styles.txtButton}>Confirmar localização</Text>
      </TouchableOpacity>
      </>:null
      :
      <TouchableOpacity
      onPress={()=>confirmEnd()}
      style={Styles.button}>
        <Text style={Styles.txtButton}>Confirmar Endereço</Text>
      </TouchableOpacity>
    }
      <View style={Styles.header}>
      {!showLabel?
      <>
        <Icon
          name="chevron-left"
          size={40}
          color="#34CB79"
          style={Styles.back}
          onPress={() => navigation.goBack(null)}/>
          {!error?<Text style={Styles.title}>AJUSTE SUA POSIÇÃO</Text>:
          <>
          <Text style={Styles.error}>{error}</Text>
          <Icon name="refresh" size={30} color="#34CB79"  style={Styles.refress} 
          onPress={() => setRefress(!refress)}/></>
          }
          </>
          :
          <>
          <Icon
            name="chevron-left"
            size={40}
            color="#34CB79"
            style={Styles.back}
            onPress={() => setShowLabel(false)}/>
            <Text style={Styles.title}>CONFIRME SEU ENDEREÇO</Text>
            </>
          }

      </View>

    {position.latitude?
      <MapView
      style={Styles.map}
      initialRegion={{
          longitude: parseFloat(position.longitude),
          latitude: parseFloat(position.latitude),
          longitudeDelta: 0.002,
          latitudeDelta: 0.001,
      }}
      onRegionChange={(region)=>setRegion(region)}
      showsUserLocation
      loadingEnabled
      />
      :<ActivityIndicator size="large" color="#34CB79" />}

    {showLabel?
    <ScrollView style={Styles.label2Scroll}>
    <View style={Styles.label2}>
      <View style={Styles.labelEnd}>
      <Text style={Styles.street}>{(getendereco.split(',')[0])}</Text>
      <Text style={Styles.logradouro}>{getendereco.split(',')[1]}, {getendereco.split(',')[2]}</Text>
      </View>
      <View style={Styles.labelInput}>
        <View style={Styles.labelComplemento}>
          <TextInput
            style={Styles.inputNumero}
            keyboardType={"numeric"}
            placeholder="Número"
            maxLength={40}
            value={numero}
            onChangeText={setNumero}
          />

           <TextInput
            style={Styles.inputComplemento}
            placeholder="Complemento"
            maxLength={40}
            value={complemento}
            onChangeText={setComplemento}
          />
        </View>
        <TextInput
            style={Styles.inputReferencia}
            placeholder="Ponto de Referência"
            maxLength={40}
            value={referencia}
            onChangeText={setReferencia}
          />
      </View>

        <Text style={Styles.titleFavoritar}>Favoritar como</Text>
      <View style={Styles.labelIcon} >
        <TouchableOpacity
        style={[Styles.icon, name=='Casa'?Styles.select:null]} onPress={()=>setName('Casa')}>
          <Icon name="home" size={25} color="#999" />
          <Text style={Styles.txtFavoritar}>Casa</Text>
        </TouchableOpacity>

        <TouchableOpacity
        style={[Styles.icon, name=='Trabalho'?Styles.select:null]} onPress={()=>setName('Trabalho')}>
          <Icon name="local-cafe" size={25} color="#999" />
          <Text style={Styles.txtFavoritar}>Trabalho</Text>
        </TouchableOpacity>
      </View>


    </View>
    </ScrollView>
    :null}
    
    </View>
    </SafeAreaView>
  );
}
