import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#e1e1e1',
    },

    section:{
        width: '95%',
    },

    titleSection:{
        width: '100%',
        textAlign: 'center',
        color: '#424242',
        marginTop: 5,
        fontSize: 14,
        fontWeight: 'bold',
    },

    labelClient:{
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        paddingBottom: 5,
    },

    labelClient2:{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },

    labelProduto:{
        backgroundColor: 'rgba(114,183,107,0.4)',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        borderRadius: 5,
    },

    labelProduto2:{
        width: '65%',
    },

    quantidadeProduto:{
        paddingHorizontal: 3,
        fontSize: 14,
        color: '#555',
        fontWeight: 'bold',
    },

    quantidadeProdutoDetail:{
        paddingHorizontal: 3,
        fontSize: 20,
        color: '#555',
        fontWeight: 'bold',
    },

    nomeProduto:{
        color: '#424242',
        fontSize: 8,
        fontWeight: 'bold',
    },

    descricaoProduto:{
        color: '#555',
        fontSize: 7,
    },

    opcaoProduto:{
        color: '#2E8B57',
        fontSize: 7,
        textDecorationLine: 'underline',
    },

    obsProduto:{
        color: '#555',
        fontSize: 7,
        fontWeight: 'bold',
    },

    valorProduto:{
        fontSize: 12,
        color: '#2E8B57',
    },

    labelPagamentoProduto:{
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    labelBotaoProduto:{
        backgroundColor: '#999',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    labelBotaoProduto2:{
        width: '78%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    botao1Produto:{
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#DC143C',
    },

    txtBotao1Produto:{
        fontSize: 12,
        color: '#f5f5f5',
    },

    botao2Produto:{
        padding: 8,
        borderRadius: 5,
        backgroundColor: '#72B76B',
    },

    txtBotao2Produto:{
        fontSize: 12,
        color: '#f5f5f5',
    },

    txtPagamentoProduto1:{
        fontSize: 14,
        color: '#555'
    },

    txtPagamentoProduto2:{
        paddingRight: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },

    txtHoraProduto:{
        color: '#424242',
        fontSize: 14,
        fontWeight: 'bold',
    },

    aviso:{
        color: '#424242',
        marginVertical: ScreenHeight/2.6,
        width: '100%',
        textAlign: 'center',
    },

    sectionContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },

    labelSection:{
        flex: 1,
        alignItems: 'center',
        width: '33.3%',
        borderRightColor: '#c1c1c1',
        borderRightWidth: 0.5,
    },

    mainLabel:{
        marginTop: 10,
        padding: 5,
        width: '90%',
        backgroundColor: 'rgba(114,183,107,0.4)',
        borderRadius: 10,
        borderColor: '#72B76B',
        borderWidth: 2,
    },

    colorBorder2:{
        backgroundColor: 'rgba(231, 201, 31, 0.322)',
        borderColor: '#D2B48C',
    },

    colorBorder3:{
        backgroundColor: 'rgba(95,158,160, 0.322)',
        borderColor: '#5F9EA0'
    },

    numeroPedido: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424242'
    },

    numeroPedidoDetail: {
        paddingLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424242'
    },

    sectionDetail:{
        zIndex: 1,
        position: 'absolute',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(42,42,42,0.8)'
    },

    icon:{
        zIndex: 1,
        position: 'absolute',
        right: 10,
        top: 10,
    },

    scrollLabelDetail:{
        width: '100%',
    },

    labelDetail:{
        flex: 1,
        width: '100%',
        height: ScreenHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    labelDetail2:{
        marginVertical: 100,
        padding: 5,
        width: '90%',
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
    },

    mainLabelHour:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },

    mainLabelProduto:{
        backgroundColor: 'rgba(100,100,100,0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        marginTop: 1,
        marginBottom: 1,
        borderRadius: 5,
    },

    mainLabelClient:{
        alignItems: 'center',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        paddingBottom: 1,
    },

    detailIndicator:{
        marginBottom: 100,
    },


    mainTextClient:{
        fontSize: 12,
        color: '#424242',
    },

    labelButtonAction: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },

    buttonAction:{
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#DC143C', 
    },

    buttonAction2:{
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#72B76B', 
    },

    buttonAction3:{
        width: '80%',
        alignItems: 'center',
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#72B76B', 
    },

    buttonAction4:{
        marginHorizontal: 5,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#5F9EA0', 
    },

    buttonActionTxt: {
        color: '#fff',
        fontSize: 12,
    },

    txtAction: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },

    txtAction2: {
        paddingHorizontal: 2,
        paddingVertical: 2,
        textAlign: 'center',
        borderRadius: 4,
        backgroundColor: 'rgba(43, 160, 43, 0.3)',
        color: '#424242',
        fontSize: 7,
        fontWeight: 'bold'
    },

    txtAction3: {
        textAlign: 'center',
        color: '#424242',
        fontSize: 7,
        fontWeight: 'bold'
    },

    txtAction4: {
      borderRadius: 4,
      paddingHorizontal: 2,
      paddingVertical: 2,
      flexDirection: 'row',
      backgroundColor: 'rgba(255,215,0,0.3)',
    },

    color1:{
        backgroundColor: 'rgba(255,215,0,0.7)',
    },

    color2:{
        backgroundColor: 'rgba(95,158,160, 0.7)',
    }


})

export default styles