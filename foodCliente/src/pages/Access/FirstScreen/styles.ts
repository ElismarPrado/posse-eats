import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',

        paddingVertical: 25,
    },

    title: {
        paddingTop: 25,
        fontSize: 22,
        fontWeight: 'bold',
        color: '#34CB79',
    },

    labelTexto: {
        alignItems: 'center',
        width: '80%',
        height: 80,
        justifyContent: 'space-between',
    },

    texto: {
        fontSize: 16,
        paddingTop: 20,
        textAlign: 'center',
        color: '#555',
        fontWeight: 'bold',
    },

    texto2: {
        textAlign: 'center',
        color: '#555',
    },

    buttons: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '80%',
    },

    buttonLogin: {
        elevation: 1,
        width: '45%',
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderRadius: 20,
    },

    buttonLoginText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#666',
    },

    buttonRegister: {
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '45%',
        backgroundColor: '#34CB79',
        borderRadius: 20,
        padding: 12,
    },

    buttonRegisterText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },

    image: {
        width: 200,
        height: 200,
    }
})

export default styles