import { StyleSheet, Dimensions } from 'react-native'
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    
    header:{
        paddingTop: 20,
        width: '100%',
        height: 80,
        justifyContent: 'center',
        backgroundColor: '#fff',
        alignItems: 'center',
    },

    back:{
        zIndex: 1,
        position: 'absolute',
        paddingHorizontal: 5,
        paddingTop: 20,
        left: 0,
    },

    sectionScroll:{
        width: '100%',
    },

    section:{
        flex: 1,
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
        height: 80,
        backgroundColor: '#fff',
        borderRadius: 5,
        alignItems: 'center',
    },
  
    imagePlace:{
        width: 90,
        height: '100%',
        backgroundColor: '#fff',
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
        width: 60,
        height: 60,
        borderRadius: 70,
        backgroundColor: '#34CB79',
        opacity: 0.9,
    },

    labelAviso:{
        marginTop: ScreenHeight/2.8,
    }

})

export default styles