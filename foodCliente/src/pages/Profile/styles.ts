import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
    },

    perfil:{
        width: '100%',
        height: 100,
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
        paddingHorizontal: 10,
        alignItems: 'center',
    },

    labelPerfil:{
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    labelFotoNome:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    image:{
        marginRight: 10,
        width: 60,
        height: 60,
        borderRadius: 60,
        backgroundColor: '#555',
    },

    scrollLabel:{
        width: '100%',
    },

    label:{
        width: '100%',
        alignItems: 'center',
    },

    div:{
        paddingVertical: 15,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },

    divIconNome:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    txtNome:{
        marginHorizontal: 5,
    }

})

export default styles