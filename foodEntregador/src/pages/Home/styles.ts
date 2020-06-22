import {StyleSheet, Dimensions} from 'react-native';
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 25,
  },

  header: {
    width: '100%',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: '#c1c1c1',
    borderBottomWidth: 0.5,
  },

  labelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '95%',
    paddingRight: 10,
  },

  txtStatusOn: {
    color: '#72B76B',
  },

  txtStatusOff: {
    color: '#DC143C',
  },

  map: {
    width: '100%',
    height: '100%',
  },

  labelErro:{
    zIndex: 3,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFD700',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignItems: 'center',
  },

  erro: {
     fontSize: 10,
     width: '80%',
     color: '#424242',
     textAlign: 'center',
  },

  section1: {
    marginTop: 75,
    zIndex: 2,
    position: 'absolute',
    width: '100%',
    height: ScreenHeight - 125,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(42,42,42,0.5)',
  },

  labelCall:{
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    backgroundColor: '#72B76B',
    borderRadius: 10,
  },

  section2: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    maxHeight: 160,
    minHeight: 160,
    backgroundColor: '#e1e1e1',
    borderTopWidth: 0.5,
    borderTopColor: '#c1c1c1',
  },

  label:{
    width: '90%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  labelDados:{
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    backgroundColor: '#f9f9f9',
    padding: 5,
  },

  rota:{
    textDecorationLine: 'underline',
    color: '#2E8B57',
    fontSize: 12,
  },

  buttons:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },

  titleEntrega:{
    fontSize: 18,
    color: '#f5f5f5',
    paddingTop: 10,
    fontWeight: 'bold',
  },

  txtEntrega:{
    width: '80%',
    textAlign: 'center',
    color: '#424242',
  },

  txtButtonEntrega:{
    color: '#72B76B',
    fontSize: 14,
    fontWeight: 'bold',
  },

  button: {
    width: '80%',
    height: 40,
    backgroundColor: '#72B76B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },

  textoButton:{
    color: '#fff',
    fontWeight: 'bold',
  },

  button2: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  title:{
    color: '#555',
  },

  nomePlace:{
    fontWeight: 'bold',
  },

  labelProduto: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },

  labelScroll:{
    maxHeight: 45,
  },

  texto:{
    paddingHorizontal: 5,
  },

  nomeUser:{
    fontSize: 12,
    fontWeight: 'bold',
  },

  labelEnd:{
    maxWidth: '95%',
    flexDirection: 'row',
  },

  end:{
    maxWidth: '90%',
    fontSize: 9,
    color: '#555',
  },

  endComp:{
    fontSize: 9,
    color: '#555',
  },

  labelNomeUser:{
    maxWidth: '80%',
    flexDirection: 'row',
  },

  foneUser:{
    paddingLeft: 10,
    textDecorationLine: 'underline',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },

  receber:{
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    fontSize: 16,
    marginTop: 3,
  },

  labelDados2: {
    alignItems: 'center',
  },

  indicator:{
    marginTop: ScreenHeight/3
  },

  indicator2:{
    zIndex: 2,
    position: 'absolute',
    backgroundColor: 'rgba(42,42,42,0.7)',
    height: 160,
    width: '100%',
    bottom: 0,
  },

  progress:{
    position: 'absolute',
  }
})

export default styles
