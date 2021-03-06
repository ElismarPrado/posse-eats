import React, { useEffect, useState } from 'react'
import { Text, View, TouchableOpacity, SafeAreaView} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import styles from './styles'

const FirstScreen = () => {
    const navigation = useNavigation()

    const [state, setState] = useState<Boolean>(false)

    async function getDateAsync(){
        const id = await AsyncStorage.getItem('idUser@foodEntregador');
        const nome = await AsyncStorage.getItem('nameUser@foodEntregador');
        if(id){
          if(nome){
            navigation.navigate('Home')
          }else{
            navigation.navigate('Login')
          }
        }else{
          setState(true)
        }
    }
    useEffect(()=>{getDateAsync()},[])


    if(!state) {
        return null
    }
    
    return(
    <SafeAreaView style={{flex: 1}}> 
        <View style={styles.container}>
            
            <View style={styles.labelTitle}>
              <Text style={styles.title}>POSSE EATS</Text>
              <Text style={styles.title2}>APP DO ENTREGADOR</Text>
            </View>

            <View style={styles.labelTexto}>
            <Text style={styles.texto}>Ganhe dinheiro extra no seu tempo livre</Text>
            <Text style={styles.texto2}>Faça entregas no seu horário.</Text>
            </View>
            <View style={styles.buttons}>

            <TouchableOpacity
            style={styles.buttonRegister}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonRegisterText}>Cadastrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.buttonLogin}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonLoginText}>Entrar</Text>
            </TouchableOpacity>

            </View>
        </View>
    </SafeAreaView>
    )
}

export default FirstScreen