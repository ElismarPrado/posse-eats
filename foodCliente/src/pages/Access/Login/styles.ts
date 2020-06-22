import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 25,
  },

  header:{
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
},

  back:{
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 10,
    paddingVertical: 10,
    left: 0,
  },


  section: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '85%',
    height: windowHeight,
  },

  label: {
    width: '100%',
    justifyContent: 'center',
  },

  inputLabel: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 5,
    width: '100%',
    flexDirection: 'row',
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 1,
  },

  inputText: {
    paddingLeft: 5,
    paddingVertical: 0,
    width: '100%',
    color: '#424242',
    fontSize: 16,
  },

  eye: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 5,
  },

  erroLabel: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 42, 42, 0.4)',
  },

  erro:{
    width: '80%',
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 215, 0, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },

  labelButton:{
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },

  button: {
    elevation: 2,
    borderRadius: 20,
    alignItems: 'center',
    width: '50%',
    padding: 12,
    backgroundColor: '#34CB79',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  image: {
    width: 150,
    height: 150,
},

indicator: {
  width: '100%',
  height: '100%',
  position: 'absolute',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(42, 42, 42, 0.4)',
}

})

export default styles