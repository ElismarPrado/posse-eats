import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Historic = () => {
    const navigation = useNavigation()

    function handleNavigateToFirstScreen() {
      navigation.navigate('FirstScreen')
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstScreen' }],
      });
    }
    return(
    <View>
        <Text>Hello Historic</Text>
        <TouchableOpacity onPress={handleNavigateToFirstScreen}>
            <Text>Sair do app fake</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Historic