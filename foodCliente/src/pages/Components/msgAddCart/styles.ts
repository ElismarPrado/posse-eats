import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    label:{
        zIndex: 2,
        position: 'absolute',
        right: 5,
        bottom: 5,
        height: 50, 
        borderRadius: 50,    
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#f3f3f3',
    },

    texto:{
        paddingHorizontal: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242'
    },

    icon:{
        width: 80,
    }
})

export default styles