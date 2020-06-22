import {StyleSheet, Dimensions, ColorPropType} from 'react-native';
const ScreenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#e1e1e1',
  },

  section:{
    flex: 1,
    width: '100%',
    height: ScreenHeight,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
},

title:{
  width: '100%',
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
  color: '#424242',
  textAlignVertical: 'center',
  paddingTop: 20,
  height: 75,
  backgroundColor: '#f5f5f5',
  borderBottomColor: '#c1c1c1',
  borderBottomWidth: 0.5,
},

nomePlace:{
  width: '100%',
  textAlign: 'center',
  fontSize: 8,
  color: '#424242',
  backgroundColor: 'rgba(42,42,42,0.1)',
  paddingHorizontal: 2,
},

scrollSection:{
  width: '100%',
},

label:{
  width: '30%',
  padding: 5,
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'rgba(43, 160, 43, 0.322)',
  borderColor: '#72B76B',
  borderWidth: 2,
},

labelRepasse:{
  width: '30%',
  padding: 5,
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'rgba(231, 201, 31, 0.322)',
  borderColor: '#D2B48C',
  borderWidth: 2,
},

labelPagamento:{
  width: '30%',
  padding: 5,
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'rgba(95,158,160, 0.322)',
  borderColor: '#ADD8E6',
  borderWidth: 2,
},

label2:{
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 5,
},


numeroPedido: {
  width: '55%',
  fontSize: 14,
  fontWeight: 'bold',
  color: '#424242',
},

mainLabelProduto:{
  backgroundColor: 'rgba(100,100,100,0.1)',
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#c1c1c1',
  borderWidth: 0.5,
  marginTop: 2,
  marginBottom: 2,
  borderRadius: 5,
},


quantidadeProduto:{
  paddingHorizontal: 3,
  fontSize: 16,
  color: '#555',
  fontWeight: 'bold',
},

nomeProduto:{
  color: '#424242',
  fontSize: 8,
  fontWeight: 'bold',
  paddingRight: 5,
},

mainLabelHour:{
  paddingLeft: 5,
  borderLeftColor: '#555',
  borderLeftWidth: 0.5,
  width: '45%',
  alignItems: 'center',
},

labelProduto2:{
  width: '65%',
},

txtHoraProduto:{
  color: '#424242',
  fontSize: 12,
  fontWeight: 'bold',
},

txtDataProduto:{
  color: '#424242',
  fontSize: 6,
  fontWeight: 'bold',
},

miniatureInfo:{
  paddingHorizontal: 10,
  width: '100%',
  paddingTop: 5,
  paddingBottom: 10,
  flexDirection: 'row',
  justifyContent: 'space-around',
  borderBottomColor: '#c1c1c1',
  borderBottomWidth: 0.5,
  marginBottom: 10,
},

miniatureLabelState:{
  flexDirection: 'row',
  alignItems: 'center',
},

miniatureColor1:{
  width: 15,
  height: 15,
  borderRadius: 15,
  backgroundColor: '#72B76B',
},

miniatureColor2:{
  width: 15,
  height: 15,
  borderRadius: 15,
  backgroundColor: '#ADD8E6',
},

miniatureColor3:{
  width: 15,
  height: 15,
  borderRadius: 15,
  backgroundColor: '#D2B48C',
},
miniatureTextStatus:{
  paddingHorizontal: 3,
  fontSize: 10,
  color: '#555',
},

valores: {
  textAlign: 'center',
  fontSize: 10,
  color: '#424242',
  backgroundColor: 'rgba(231, 201, 31, 0.3)',
},

totalReceber:{
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: 3,
  textAlign: 'center',
  backgroundColor: '#e1e1e1',
  color: '#424242',
  fontWeight: 'bold'
}

})

export default styles