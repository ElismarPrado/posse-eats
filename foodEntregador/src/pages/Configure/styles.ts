import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
        paddingTop: 25,
    },

    title:{
        fontSize: 16,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        padding: 10,
        color: '#424242'
    },

    button:{
        paddingVertical: 15,
        width: '90%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
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