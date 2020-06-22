import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    alignItems: 'center',
  },

    labelSearch:{
      paddingTop: 8,
      alignItems: 'center',
      width: '100%',
      backgroundColor: '#fff',
    },

    search:{
      marginBottom: 10,
      backgroundColor: '#f3f3f3',
      borderRadius: 5,
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
  },

  inputText: {
      paddingHorizontal: 8,
      paddingVertical: 8,
      marginRight: 20,
      width: '80%',
      color: '#424242',
      fontSize: 16,
    },

    close:{
        position: 'absolute',
        right: 8,
    },

    scrollSearch:{
        width: '95%',
    },

    sectionSearch:{
        width: '100%',
        alignItems: 'center',
        paddingBottom: 40,
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


  

  labelProduto:{
    width: '90%',
    paddingVertical: 5,
    borderColor: '#c1c1c1',
    borderWidth: 0.5,
    justifyContent: 'center',
    padding: 5,
    marginVertical: 5,
    borderRadius: 10,
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
    width: 60,
    height: 60,
    borderRadius: 5,
},

nomeProduto:{
    color: '#424242',
    fontSize: 12,
},
descricaoProduto:{
    fontSize: 10,
    color: '#999',
},
valorProduto:{
    fontSize: 12,
    marginTop: 5,
    color: '#424242',
    width: '100%',
},

  })

export default styles