import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    
    header:{
        paddingTop: 20,
        width: '100%',
        height: 100,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    back:{
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 5,
        paddingTop: 20,
        left: 0,
    },

    scrollSection: {
        width: '90%',
    },

    section:{
        width: '100%',
        alignItems: 'center'
    },

    nome:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#424242',
    },

    descricao:{
        marginBottom: 5,
        color: '#555',
        fontSize: 12,
    },

    categoria:{
        color: '#555',
    },

    div:{
        width: '100%',
        paddingBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        marginTop: 5,
        marginBottom: 20,
    },

    subDiv:{
        width:  '80%',
    },

    funcionamento:{
        fontWeight: 'bold',
        color: '#424242',
    },

    horario:{
        fontSize: 12,
        color: '#555',
    },

    avaliacao:{
        padding: 5,
        fontSize: 18,
        color: '#DAA520',
    },

    image:{
        width: '100%',
        height: 140,
    },

    map: {
        marginVertical: 10,
        width: '100%',
        height: 250,
    }

})

export default styles