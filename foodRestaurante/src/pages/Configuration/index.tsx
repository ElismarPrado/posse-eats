import React from 'react'
import { Alert, Text, View, TouchableOpacity, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {MaterialIcons as Icon} from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage'
import styles from './styles'

const Configuration = () => {
    const navigation = useNavigation()

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
        await AsyncStorage.removeItem("idUser@foodRestaurante")
        await AsyncStorage.removeItem("nameUser@foodRestaurante")
        await AsyncStorage.removeItem("emailUser@foodRestaurante")
        await AsyncStorage.removeItem("foneUser@foodRestaurante")
        navigation.navigate('Login')
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
    }
  
    return(
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Configurações</Text>
        <TouchableOpacity style={styles.button}
          onPress={()=>checkoutConfirm()}>
            <View style={styles.divIconNome}>
              <Icon name="power-settings-new" size={25} color="#999" />
              <Text style={styles.txtNome}>Sair do Aplicativo</Text>
            </View>
            <Icon name="chevron-right" size={22} color="#555" />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
    )
}

export default Configuration