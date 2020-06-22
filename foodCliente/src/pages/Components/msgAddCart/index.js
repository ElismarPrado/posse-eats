import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import styles from './styles'
import {MaterialIcons as Icon} from '@expo/vector-icons';

export default function MsgAddCart() {

  const [logo, setLogo] = useState(1)

    useEffect(()=>{
    const int = setInterval(()=>{
        if(logo<3){
            let b = logo + 1
            setLogo(b)
            }else{
                setLogo(1)
            }
            clearInterval(int)
    },250)
    },[logo])

  return (
      <View style={styles.label}>
        <Text style={styles.texto}>Produto adicionado</Text>
        <View style={styles.icon}>
        <Icon style={logo==1?{marginLeft: 10}:logo==2?{marginLeft: -10}:logo==3?{marginLeft:0}:null} name="chevron-right" size={30} color="#555" />
        </View>
      </View>
  )
}
