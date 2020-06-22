import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    header:{
        width: '100%',
        height: 150,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },

    image:{
        position: 'absolute',
        opacity: 0.5,
        width: '100%',
        height: '100%',
    },

    back:{
        zIndex: 1,
        top: 30,
        left: 10,
        position: 'absolute',
    },


    placeLabel:{
        width: '100%',
        borderTopColor: '#999',
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingHorizontal: 20,
        borderTopWidth: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
    },

    txtNome:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#424242',
    },

    txtCategoria:{
        color: '#555',
    },

    avaliacao:{
        marginRight: 5,
        color: '#555',
    },

    divRight:{
        alignItems: 'flex-end',
    },

    title:{
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
        paddingVertical: 8,
    },

    title2:{
        width: '100%',
        fontSize: 18,
        fontWeight: 'bold',
        paddingVertical: 20,
        color: '#555',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
    },


    scrollLabel:{
        width: '90%',
    },

    scrollDestaque:{
        width: '100%',
    },

    labelDestaque:{
        width: 130,
        paddingBottom: 10,
        borderWidth: 0.5,
        borderColor: '#c1c1c1',
        borderRadius: 5,
        marginVertical: 10,
        marginRight: 20,
        alignItems: 'center',
    },

    imageDestaque:{
        width: '100%',
        height: 110,
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
    },

    labelProduto:{
        width: '100%',
        paddingVertical: 10,
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        justifyContent: 'center',
    },

    div:{
        width: '100%',
        flexDirection: 'row',
    },

    div1:{
        width: '70%',
        paddingRight: 5,
    },

    div2:{
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    imageProduto: {
        width: 90,
        height: 90,
        borderRadius: 5,
    },
    
    padding10:{
        paddingHorizontal: 5,
        paddingTop: 5,
    },

    nomeProduto:{
        color: '#424242',
        fontSize: 12,
    },
    descricaoProduto:{
        fontSize: 11,
        color: '#999',
    },
    valorProduto:{
        marginTop: 5,
        color: '#424242',
        width: '100%',
    },

    labelAviso: {
        marginTop: ScreenHeight/2,
    }

})

export default styles