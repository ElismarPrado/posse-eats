import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
    },

    containerScroll:{
        width: '100%',
    },

    endereco:{
        marginVertical: 10,
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },

    butons:{
        width: '90%',
        flexDirection: 'row',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },

    txtButtonsOff:{
        fontSize: 16,
        color: '#555',
        marginRight: 20,
    },

    txtButtonsOn:{
        fontSize: 16,
        color: '#34CB79',
        marginRight: 20,
        borderBottomColor: '#34CB79',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },

    street:{
        flexDirection: 'row',
        width: '90%',
    },

    title:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginHorizontal: 20,
        marginVertical: 5,
        
    },

    label:{
        width: '100%',
        alignItems: 'center',
    },

    places:{
        elevation: 1,
        borderColor: '#e1e1e1',
        borderWidth: 0.5,
        marginVertical: 8,
        flexDirection: 'row',
        width: '90%',
        height: 90,
        borderRadius: 5,
        alignItems: 'center',
    },

    openClose:{
        zIndex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 5,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },

    txtOpenClose:{
        color: '#424242',
        fontSize: 16,
        fontWeight: 'bold',
    },

    imagePlace:{
        width: 90,
        height: '100%',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        borderRightWidth: 0.5,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#e1e1e1',
    },

    nomePlace:{
        color: '#555',
        fontWeight: 'bold',
    },

    avaliacaoPlace:{
        fontSize: 12,
        color: '#DAA520',
    },

    categoriaPlace:{
        color: '#555',
    },

    image:{
        width: 70,
        height: 70,
        borderRadius: 70,
        backgroundColor: '#34CB79',
        opacity: 0.9,
    },

    labelAviso: {
        marginTop: ScreenHeight/2,
    },

    txtPlace: {
        
    }

})

export default styles