import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginHorizontal: 18,
        marginVertical: 5,
    },

    categorias:{
        width: '100%',
        height: 100,
        marginBottom: 20,   
     },

    itens:{
        width: 90,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15,
        marginRight: 5,
    },

    labelImage:{
        width: 90,
        height: 70,
        backgroundColor: '#34CB79',
        marginVertical: 8,
        borderRadius: 7,
        opacity: 0.9,
    },

    image:{
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },

    nameItens:{
        fontSize: 12,
        color: '#555',
    },
})

export default styles