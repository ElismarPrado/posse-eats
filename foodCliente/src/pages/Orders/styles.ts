import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({

    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#e1e1e1',
    },

    header:{
        paddingTop: 20,
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
        alignItems: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    section2:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    scrollContainer:{
        width: '100%',
    },

    label:{
        elevation: 2,
        margin: 10,
        width: '95%',
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 100,
    },

    label2:{
        padding: 10,
    },

    labelPlace:{
        flexDirection: 'row',
        paddingBottom: 10,
        borderBottomColor: '#999',
        borderBottomWidth: 0.5,
        alignItems: 'center',
    },

    sectionPlace:{
        width: '65%',
        marginHorizontal: 10,
    },

    noDate:{
        width: '100%',
        alignItems: "center",
        color: '#555',
        marginTop: ScreenHeight/1.4,
    },

    labelProduto:{
        margin: 3,
        flexDirection: 'row',
        backgroundColor: '#e1e1e1',
        alignItems: 'center',
    },

    produto:{
        fontSize: 15,
        color: '#424242',
        fontWeight: 'bold',
        paddingVertical: 5,
    },

    cancelar:{
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
    },

    textoCancelar:{
        color: '#424242',
        borderBottomColor: '#424242',
        borderBottomWidth: 0.5,
    },

    imagePlace:{
        width: 40,
        height: 40,
        borderRadius: 40,
    },

    imageProduto:{
        marginVertical: 2,
        marginHorizontal: 5,
        width: 25,
        height: 25,
        borderRadius: 1,
    },

    labelNome:{
        width: '55%',
        paddingHorizontal: 5,
    },

    nomeProduto:{
        fontSize: 10,
        maxHeight: 45,
    },

    descricaoProduto:{
        fontSize: 8,
        color: '#555',
    },

    quantidadeProduto:{
        backgroundColor: '#999',
        fontSize: 20,
        width: 30,
        height: '100%',
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    valorProduto:{
        color: '#999',
    },

    labelTotalProduto:{
        width: '100%',
        opacity: 0.5,
        alignItems: 'flex-end',
        padding: 5,
    },

    frete:{
        fontSize: 10,
        fontWeight: 'bold',
        color: '#999',
    },

    totalProduto:{
        fontWeight: 'bold',
        color: '#1B7F10',
    },

    labelStatus:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
    },

    textoStatus:{
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },

    labelPA:{
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        borderRadius: 5,
        marginVertical: 5,
        backgroundColor: '#f5f5f5', 
    },

    labelPA2:{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightColor: '#c1c1c1',
        borderRightWidth: 0.5,
        backgroundColor: '#8FBC8F',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },

    labelPA3:{
        width: '78%',
    },

    horaPA:{
        fontSize: 22,
    },

    dataPA:{
        fontSize: 10,
    },

    labelPA4:{
        marginVertical: 1,
        flexDirection: 'row',
        padding: 1,
    },

    textoPA: {
        fontSize: 12,
        paddingRight: 5,
        color: '#555',
        backgroundColor: '#e1e1e1',
    },

    aviso:{
        marginTop: ScreenHeight/2.8,
    },


    miniatureLabel: {
        width: '30%',
        height: 100,
        padding: 3,
        backgroundColor: '#fff',
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 5,
    },

    miniatureLabel2:{
        paddingBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },

    miniatureImage:{
        width: 25,
        height: 25,
        borderRadius: 5,
        marginRight: 3,
    },

    miniatureText:{
        fontSize: 8,
        width: '70%',
    },
    
    miniatureLabelProduct2:{
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },

    miniatureAmountProduct:{
        paddingHorizontal: 3,
    },

    miniatureNameProduct:{
        fontSize: 7,
        width: '40%',
    },

    miniatureValueProduct:{
        fontSize: 8,
    },

    miniatureStatusLabel:{
        position: 'absolute',
        bottom: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    miniatureStatus:{
        color: '#424242',
        marginRight: 5,
        fontSize: 10,
        fontWeight: 'bold',
    },

    miniatureTextMore:{
        color: '#555',
        width: '90%',
        position: 'absolute',
        bottom: 30,
        textAlign: 'right',
        fontSize: 20,
        fontWeight: 'bold',
    },

    scrollLabelDetail:{
        marginTop: 85,
        position: 'absolute',
        backgroundColor: 'rgba(42,42,42,0.7)',
        width: '100%',
        height: ScreenHeight,
    },

    labelDetail:{
        width: '100%',
        minHeight: ScreenHeight,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },

    miniatureInfo:{
        paddingHorizontal: 10,
        width: '100%',
        paddingTop: 5,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        marginBottom: 10,
    },

    miniatureLabelState:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    miniatureColor1:{
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: '#72B76B',
    },

    miniatureColor2:{
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: 'tomato',
    },

    miniatureColor3:{
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: '#CD853F',
    },
    miniatureTextStatus:{
        paddingHorizontal: 3,
        fontSize: 10,
        color: '#555',
    }

})

export default styles