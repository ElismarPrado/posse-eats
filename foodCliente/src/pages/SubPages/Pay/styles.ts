import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    section:{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
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

    labelImage:{
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },

    image:{
        width: 200,
        height: 20,
    },

    sectionInput:{
        width: '85%',
        height: 300,
        justifyContent: 'space-around',
    },

    inputNumber:{
        fontWeight: 'bold',
        fontSize: 18,
        color: '#555',
        width: '100%',
        paddingVertical: 4,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },

    labelValidade:{
        fontSize: 18,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    inputValidade:{
        fontSize: 18,
        width: '50%',
        color: '#555',
        paddingVertical: 4,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },

    inputCvv:{
        fontSize: 18,
        width: '35%',
        color: '#555',
        paddingVertical: 4,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },

    inputTitular:{
        fontSize: 16,
        width: '100%',
        color: '#555',
        paddingVertical: 4,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },

    inputCpf:{
        fontSize: 18,
        width: '100%',
        color: '#555',
        paddingVertical: 4,
        borderBottomColor: '#e1e1e1',
        borderBottomWidth: 0.5,
    },

    button:{
        width: '80%',
        borderRadius: 10,
        backgroundColor: '#34CB79',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 80,
    },

    txtButton: {
        color: '#fff',
        fontSize: 16,
    }

})

export default styles