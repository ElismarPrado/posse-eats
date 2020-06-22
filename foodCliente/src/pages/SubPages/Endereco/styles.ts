import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  header: {
    paddingTop: 20,
    width: '100%',
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  back: {
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 5,
    paddingVertical: 10,
    left: 5,
    top: 20,
  },

  endAtual: {
    width: '100%',
    paddingVertical: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  icon: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scroolLabel: {
    width: '95%',
  },

  labelEndereco: {
    marginVertical: 10,
    paddingVertical: 15,
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#e1e1e1',
  },

  labelEnderecoTrue: {
    borderWidth: 1,
    borderColor: 'rgba(0,255,0,0.5)',
    backgroundColor: 'rgba(0,255,0,0.1)'
  },

  txtName:{
    width: '80%',
    fontSize: 18,
  },

  txtLogradouro:{
    maxWidth: '78%',
    minWidth: '60%',
    color: '#999',
    fontSize: 12,
  },

  txtReferencia:{
    fontSize: 12,
    color: '#424242',
  },

  close:{
    padding: 10,
    position: 'absolute',
    right: 10,
    top: 10,
  },

  aviso:{
    color: '#555',
    marginTop: '40%',
  }

});

export default styles