import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './styles'
import { useNavigation } from '@react-navigation/native'
import {MaterialIcons as Icon} from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Info from '../Components/info';

export default function Perfil() {

  const navigation = useNavigation()
  const [nome, setNome] = useState()

 
  async function getDadosAsync(){
    const nome = await AsyncStorage.getItem("nameUser@foodCliente")
    setNome(nome)
  }
  useEffect(()=>{getDadosAsync()},[])

  function checkoutConfirm(){
    Alert.alert(
      'Deseja sair do app?',
      'Você será redirecionado para pagina de login',
      [
        {text: 'NÃO', style: 'cancel'},
        {text: 'SIM', onPress: () => checkout() },
      ],
      { cancelable: true }
    );
  }

  async function checkout(){
      await AsyncStorage.removeItem("idUser@foodCliente")
      await AsyncStorage.removeItem("nameUser@foodCliente")
      await AsyncStorage.removeItem("emailUser@foodCliente")
      await AsyncStorage.removeItem("foneUser@foodCliente")
      navigation.navigate('Login')
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container}>
      <Info />
      <View style={styles.perfil}>
        <TouchableOpacity
        onPress={()=>alert('Disponível em breve!')}
        style={styles.labelPerfil}>
          <View style={styles.labelFotoNome}>
              <View style={styles.image}>

              </View>
              <View>
                <Text>{nome}</Text>
                <Text>Editar perfil</Text>
              </View>
          </View>
          <Icon name="chevron-right" size={22} color="#555" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollLabel}>
        <View style={styles.label}>
          
          <TouchableOpacity style={styles.div}
          onPress={()=>alert('App Seguro')}>
            <View style={styles.divIconNome}>
              <Icon name="verified-user" size={25} color="#999" />
              <Text style={styles.txtNome}>Segurança</Text>
            </View>
            <Icon name="chevron-right" size={22} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.div}
          onPress={()=>checkoutConfirm()}>
            <View style={styles.divIconNome}>
              <Icon name="power-settings-new" size={25} color="#999" />
              <Text style={styles.txtNome}>Sair do Aplicativo</Text>
            </View>
            <Icon name="chevron-right" size={22} color="#555" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
    </SafeAreaView>
  );
}