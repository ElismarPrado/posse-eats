import React from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
    const navigation = useNavigation()

    function handleNavigateToPlace() {
      navigation.navigate('Other')
    }

    return(
    <View>
        <Text>Hello Home</Text>
        <TouchableOpacity onPress={handleNavigateToPlace}>
            <Text>for Place</Text>
        </TouchableOpacity>
    </View>
    )
}

export default Home