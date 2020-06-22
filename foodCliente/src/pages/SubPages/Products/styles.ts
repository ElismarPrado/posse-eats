import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: ScreenHeight,
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    cart:{
        position: 'absolute',
        bottom: 75,
        width: '100%',
        height: 50,
    },

    scroll:{
        width: '90%',
    },

    header:{
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
        paddingVertical: 10,
        left: 0,
    },

    label:{
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 20,
    },

    labelAmount:{
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        borderTopColor: '#c1c1c1',
        borderTopWidth: 0.5,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    labelChangeAmount:{
        width: '35%',
        borderColor: '#999',
        borderWidth: 0.5,
        borderRadius: 5,
        paddingHorizontal: 10,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textAmount:{
        paddingHorizontal: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#424242',
    },

    adicionar:{
        width: '55%',
        elevation: 1,
        paddingVertical: 15,
        backgroundColor: '#34CB79',
        borderRadius: 5,
        alignItems: 'center',
    },

    txtAdicionar:{
        color: '#fff',
    },

    section:{
        alignItems: 'center',
        width: '100%',
        borderBottomColor: '#c1c1c1',
        borderBottomWidth: 0.5,
        marginBottom: 30,
    },

    section2: {
        width: '100%',
    },

    image:{
        width: 150,
        height: 150,
    },

    labelNomeDescricao:{
        width: '75%',
    },

    nome: {
        fontWeight: 'bold',
        color: '#424242',
        paddingBottom: 1,
    },

    descricao: {
        fontSize: 12,
        color: '#666',
        paddingBottom: 10,
    },

    valor: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
    },

    observacao:{
        paddingVertical: 10,
        marginBottom: 150,
    },

    txtObservacao:{
        color: '#555',
        paddingBottom: 5,
    },

    inputText: {
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        borderRadius: 5,
        marginTop: 5,
        paddingLeft: 5,
        paddingVertical: 4,
        width: '100%',
        color: '#424242',
    },


    sectionOpcao:{
        marginBottom: 40,
    },

    labelOpcao:{
        width: '100%',
        borderColor: '#c1c1c1',
        borderWidth: 0.5,
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 2,
        paddingHorizontal: 5,
    },

    labelOpcao2:{
        width: '90%',
    },

    titleOpcao:{
        fontWeight: 'bold',
        color: '#424242',
        paddingVertical: 10,
    },

    titleOpcao2:{
        color: '#555',
    },

    txtOpcao:{
        fontSize: 12,
        color: '#999',
    },

    labelAviso: {
        marginTop: ScreenHeight/2,
    }

})

export default styles