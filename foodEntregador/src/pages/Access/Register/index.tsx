import React, {useState, useEffect} from 'react'
import { Text, View, TextInput, ScrollView,  TouchableOpacity, SafeAreaView, ActivityIndicator} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'
import {MaterialIcons as Icon} from '@expo/vector-icons';

import api from '../../../services/api';

import styles from './styles'

const Register = () => {
    const navigation = useNavigation()

    const [name, setName] = useState<String>('')
    const [email, setEmail] = useState<String>('')
    const [fone, setFone] = useState<String>('')
    const [key, setKey] = useState<String>('')
    const [keyAgain, setKeyAgain] = useState<String>('')

    const [erro, setErro] = useState<String>('')
    const [seePass, setSeePass] = useState<Boolean>(true)
    const [seePass2, setSeePass2] = useState<Boolean>(true)
    const [indicator, setIndicator] = useState<Boolean>(false)

    async function cadastrar() {
        setIndicator(true)
        if (name && email && fone && key) {
        if (key === keyAgain) {
            if (name.length > 8) {
            if (key.length > 5) {
                const response = await api.post('user/create', {
                name,
                email,
                fone,
                password: key,
                type: 'Entregador',
                })
                const { user, error } = response.data

                if (user){
                await AsyncStorage.multiSet([
                ["idUser@foodEntregador", String(user._id)],
                ["nameUser@foodEntregador", String(user.name)],
                ["emailUser@foodEntregador", String(user.email)],
                ["foneUser@foodEntregador", String(user.fone)]
                ])

                navigation.navigate('Home')
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
                });
                
                } else if (error){
                  setErro(error)
                }

            } else { setErro('Senha muito curta!') }
            } else { setErro('Nome muito curto!') }
        } else { setErro('Senhas não conferem!') }
        } else { setErro('Preencha todos os campos!') }

    }

    useEffect(()=>{
        if(erro){
        setTimeout(() => {
            setIndicator(false)
            setErro("")
        }, 2000);
        }
    },[erro])

    return(
    <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Icon name="chevron-left" size={40} color="#34CB79" style={styles.back} 
            onPress={()=>navigation.navigate('FirstScreen')}/>
          </View>


        <ScrollView style={styles.scrollSection} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>


          <View style={styles.label}>

            <View style={styles.inputLabel}>

              <Icon name="person" size={22} color="#999" />

              <TextInput
                style={styles.inputText}
                keyboardType="default"
                placeholder="Nome completo"
                placeholderTextColor="#777"
                autoCorrect={false}
                maxLength={60}
                value={String(name)}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputLabel}>

              <Icon name="email" size={22} color="#999" />
              <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                //autoFocus={true}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#777"
                autoCorrect={false}
                maxLength={60}
                value={String(email)}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputLabel}>

              <Icon name="call" size={22} color="#999" />
                <TextInput
                style={styles.inputText}
                keyboardType="numeric"
                placeholder="Telefone com DDD"
                placeholderTextColor="#777"
                autoCorrect={false}
                maxLength={11}
                value={String(fone)}
                onChangeText={setFone}
              />
            </View>

            <View style={styles.inputLabel}>

              <Icon name="lock" size={22} color="#999" />
              <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={Boolean(seePass)}
                placeholder="Senha"
                placeholderTextColor="#777"
                autoCorrect={false}
                maxLength={30}
                value={String(key)}
                onChangeText={setKey}
              />

              <TouchableOpacity
                style={styles.eye}
                onPress={() => setSeePass(!seePass)}>
                <Icon name="visibility-off" size={22} color="#c1c1c1" />
              </TouchableOpacity>
            </View>
            <View style={styles.inputLabel}>

              <Icon name="lock" size={22} color="#999" />
              <TextInput
                style={styles.inputText}
                autoCapitalize="none"
                keyboardType="default"
                secureTextEntry={Boolean(seePass2)}
                placeholder="Repita a senha"
                placeholderTextColor="#777"
                autoCorrect={false}
                maxLength={30}
                value={String(keyAgain)}
                onChangeText={setKeyAgain}
              />

              <TouchableOpacity
                style={styles.eye}
                onPress={() => setSeePass2(!seePass2)}>
                <Icon name="visibility-off" size={22} color="#c1c1c1" />
              </TouchableOpacity>
            </View>
          </View>

        </View>

    </ScrollView>
    <TouchableOpacity
            style={styles.button}
            onPress={() => cadastrar()}>
            <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      </View>

          {erro?
            <View style={styles.erroLabel}>
              <Text style={styles.erro}>{erro}</Text>
            </View>
            :
              indicator?<ActivityIndicator size="large" color="#34CB79" style={styles.indicator}/>:null
          }

    </SafeAreaView>
    )
}

export default Register