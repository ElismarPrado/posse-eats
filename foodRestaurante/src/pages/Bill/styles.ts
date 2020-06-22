import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#e1e1e1',
    },

    header:{
        paddingTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    button:{
        paddingTop: 30,
        paddingBottom: 15,
        alignItems: 'center',
        width: '50%',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },

    selected:{
        borderBottomColor: '#72B76B',
        borderBottomWidth: 2,
    },

    txtButton:{
        color: '#424242',
    },

    txtSelected:{
        color: '#72B76B',
    },

    section:{
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
    },

    label:{
        width: '30%',
        height: 160,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(114,183,107,0.4)',
        borderColor: '#72B76B',
        borderWidth: 2,
    },

    label2:{
        width: '30%',
        height: 130,
        padding: 5,
        margin: 5,
        borderRadius: 10,
        backgroundColor: 'rgba(231, 201, 31, 0.322)',
        borderColor: '#D2B48C',
        borderWidth: 2,
    },

    label3:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },

    numeroPedido: {
        width: '55%',
        fontSize: 14,
        fontWeight: 'bold',
        color: '#424242',
    },

    mainLabelProduto:{
        backgroundColor: 'rgba(100,100,100,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 5,
    },

    
    quantidadeProduto:{
        paddingHorizontal: 3,
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
    },

    nomeProduto:{
        color: '#424242',
        fontSize: 8,
        fontWeight: 'bold',
        paddingRight: 5,
    },

    mainLabelHour:{
        paddingLeft: 5,
        borderLeftColor: '#555',
        borderLeftWidth: 0.5,
        width: '45%',
        alignItems: 'center',
    },

    labelProduto2:{
        width: '65%',
    },

    txtHoraProduto:{
        color: '#424242',
        fontSize: 12,
        fontWeight: 'bold',
    },

    txtDataProduto:{
        color: '#424242',
        fontSize: 6,
        fontWeight: 'bold',
    },

    containerDetail:{
        flex: 1,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(42,42,42,0.5)'
    },

    buttonChange: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        margin: 5,
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#72B76B',
    },

    txtButtonChange: {
        color: '#fff',
    },

    labelButton:{
        
    },

    valores: {
        textAlign: 'center',
        fontSize: 10,
        color: '#424242',
        backgroundColor: 'rgba(231, 201, 31, 0.3)',
    }

})  

export default styles