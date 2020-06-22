import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';
import styles from  './styles'
import NetInfo from "@react-native-community/netinfo"

export default function Info() {

const [infoNet, setInfoNet] = useState(true)

function getInfoNet(){
    NetInfo.fetch().then(state => {
    setInfoNet(state.isConnected)
})}

useEffect(()=>{
    setInterval(()=>{getInfoNet()},5000)
},[])

  return (
    <>
      {!infoNet?<Text style={styles.infonet}>Sem conexão com a Internet</Text>:null}
    </>
  );
}
