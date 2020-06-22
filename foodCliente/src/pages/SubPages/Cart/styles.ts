import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 25,
    },

    header:{
        flexDirection: 'row',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    back:{
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 5,
        paddingVertical: 10,
        left: 0,
    },

    scrollSection:{
        width: '100%',
    },

    section:{
        width: '100%',
        alignItems: 'center',
        marginBottom: 100,
    },

    label:{
        elevation: 1,
        width: '90%',
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#fff',
    },

    labelTitle:{
        marginTop: 10,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title:{
        color: '#555',
        fontSize: 12,
    },

    endereco:{
        width: '90%',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        marginBottom: 20,
    },

    labelEndereco:{
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 10,
    },

    iconMap:{
        marginRight: 10,
    },

    labelEnderecoMap:{
        flexDirection: 'row',
        alignItems: 'center',
    },

    titleEndereco:{
        fontSize: 12,
        color: '#555',
    },

    close:{
        zIndex: 1,
        padding: 5,
        position: 'absolute',
        right: 0,
    },

    labelNome:{
        width: '40%',
        paddingHorizontal: 5,
    },

    nome:{
        fontSize: 10,
        maxHeight: 45,
    },

    descricao:{
        fontSize: 8,
        color: '#555',
    },

    quantidade:{
        paddingHorizontal: 15,
        fontSize: 20,
        color: '#fff',
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        backgroundColor: '#FFA700',
    },

    valor:{
        paddingLeft: 5,
        fontSize: 11,
        color: '#1B7F10',
        fontWeight: 'bold',
    },

    image:{
        marginVertical: 4,
        marginLeft: 5,
        width: 40,
        height: 40,
        borderRadius: 5,
    },

    buttom:{
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#34CB79',
        flexDirection: 'row',
    },

    buttomText:{
        fontSize: 16,
        alignItems: 'center',
        color: '#fff',
        fontWeight: 'bold',  
    },

    labelTotal:{
        width: '100%',
        position: 'absolute',
        bottom: 60,
        height: 25,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderTopColor: '#c1c1c1',
        borderTopWidth: 0.5,
    },

    labelTotalIcon:{
        flexDirection: 'row',
    },

    labelTotal2:{
        width: '100%',
        position: 'absolute',
        bottom: 60,
        height: 25,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    totalText:{
        fontSize: 12,
        paddingHorizontal: 10,
        color: '#424242',
        fontWeight: 'bold',
    },

    tipoPagText:{
        fontSize: 10,
        padding: 5,
        color: '#424242',
        fontWeight: 'bold',
    },

    noItens:{
        color: '#555',
        marginTop: '50%',
    },

    labelPagamento:{
        position: 'absolute',
        width: '100%',
        height: '105%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    labelPagamentoClose:{
        position: 'absolute',
        top: 15,
        right: 15,
    },

    subLabelPagamento:{
        width: '80%',
        height: '60%',
        backgroundColor: '#fff',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titlePagamento:{
        marginBottom: 20,
        color: '#555',
        fontWeight: 'bold',
    },

    buttonPagamento:{
        flexDirection: 'row',
        width: '80%',
        margin: 10,
        padding: 10,
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        borderRadius: 5,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    selected:{
        borderWidth: 1,
        borderColor: 'rgba(0,255,0,0.5)',
        backgroundColor: 'rgba(0,255,0,0.1)'
    },

    subLabelPagamento2:{
        width: '75%',
    },

    txtPagamento:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },

    txtPagamento2:{
        fontSize: 10,
        color: '#555',
    },

    frete: {
        width: '90%',
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },

    freteTitle: {
        fontSize: 12,
        color: '#999',
    },

    freteTexto:{
        fontSize: 12,
        color: '#999',
    },

    freteIcon:{
        paddingLeft: 5,
    }


})

export default styles