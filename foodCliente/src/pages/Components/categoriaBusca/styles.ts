import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    categorias:{
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },

    itens:{
        width: '48%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },

    labelImage:{
        opacity: 0.7,
        width: '90%',
        height: 80,
        backgroundColor: '#999',
        marginVertical: 8,
        borderRadius: 7,
    },

    image:{
        width: '100%',
        height: '100%',
        borderRadius: 7,
    },

    nameItens:{
        position: 'absolute',
        fontSize: 13,
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default styles