import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',

  },

  header: {
    position: 'absolute',
    top: 0,
    zIndex: 2,
    width: '100%',
    height: 80,
    paddingTop: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  back: {
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 5,
    paddingTop: 20,
    left: 5,
  },

  title: {
    textAlign: 'center',
    width: '70%',
    color: '#666',
  },

  error:{
    fontSize: 10,
    width: '70%',
    color: '#666',
  },

  refress: {
    zIndex: 1,
    position: 'absolute',
    paddingHorizontal: 5,
    paddingTop: 20,
    right: 10,
  },

  map: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  marker: {
    zIndex: 2,
  },

  button:{
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    padding: 16,
    borderRadius: 5,
    backgroundColor: '#34CB79',
    alignItems: 'center',
  },

  txtButton:{
    color: '#fff',
    fontSize: 15,
  },

  label2Scroll: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
  },

  label2: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingVertical: 80,
  },

  inputNumero: {
    width: '20%',
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 1,
    paddingVertical: 2,
    fontSize: 16,
    color: '#555',
  },

  inputComplemento: {
    width: '70%',
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 1,
    paddingVertical: 2,
    fontSize: 16,
    color: '#555',
  },

  labelEnd:{
    marginVertical: 10,
    width: '90%',
  },

  street: {
    color: '#424242',
    fontSize: 16,
    fontWeight: 'bold',
  },

  logradouro: {
    color: '#999',
  },

  labelInput:{
    width: '90%',
  },
  
  labelComplemento:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
  },

  inputReferencia: {
    width: '100%',
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 1,
    paddingVertical: 2,
    fontSize: 16,
    color: '#555',
  },

  titleFavoritar:{
    width: '90%',
    paddingVertical: 10,
    marginTop: 40,
    color: '#555',
  },

  labelIcon:{
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 200,
  },

  icon:{
    width: '47%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#c1c1c1',
    borderWidth: 1,
  },

  txtFavoritar:{
    fontSize: 16,
    color: '#555',
    paddingHorizontal: 10,
  },

  select:{
    borderColor: 'rgba(0,255,0,0.5)',
    backgroundColor: 'rgba(0,255,0,0.1)',
  },

});

export default styles