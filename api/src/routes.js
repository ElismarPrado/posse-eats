const express = require('express')
const User = require('./controllers/User')
const Place = require('./controllers/Place')
const Product = require('./controllers/Product')
const Cart = require('./controllers/Cart')
const Categoria = require('./controllers/Categoria')
const Request = require('./controllers/Request')
const RequestContas = require('./controllers/RequestContas')
const Conected = require('./controllers/ConnectedUsers')
const Pay = require('./controllers/Pay')
const Frete = require('./controllers/Frete')
const Address = require('./controllers/Address')
const Central = require('./controllers/Central')
const routes = express.Router()

const multer = require('multer');
const multerConfig = require('./config/multer')

//Welcome---------------------------------
routes.get('/', (req,res)=>{ res.send("Welcome to Food Aplication")})

//User-----------------------------------
routes.get('/user/get', User.getAll)
routes.get('/user/get/:id', User.getOne)
routes.post('/user/create', User.create)
routes.post('/user/login', User.login)
routes.put('/user/update/:id', User.update)
routes.put('/user/updateStatus/:id', User.updateStatus)
routes.put('/user/updateOperation/:id', User.updateOperation)
routes.put('/user/updateFoto/:id', User.updateFoto)
routes.put('/user/updateKey/:id', User.updateKey)
routes.delete('/user/delete/:id', User.delete)

//Place----------------------------------
routes.get('/place/get', Place.getAll)
routes.get('/place/get/:id', Place.getOne)
routes.get('/place/getCategory', Place.getCategory)
routes.get('/place/getIdUser', Place.getIdUser)
routes.get('/place/getCustom', Place.getCustom)
routes.post('/place/create', multer(multerConfig).single('file'), Place.create)
routes.put('/place/update/:id', Place.update)
routes.put('/place/updateAvaliacao/:id', Place.updateAvaliacao)
routes.put('/place/updateOpen/:id', Place.updateOpen)
routes.delete('/place/delete/:id', multer(multerConfig).single('file'), Place.delete)

//Categoria---------------------------------
routes.get('/categoria/get', Categoria.getAll)
routes.get('/categoria/getCategoria', Categoria.getCategoria)
routes.post('/categoria/create', Categoria.create)
routes.put('/categoria/update/:id', Categoria.update)
routes.delete('/categoria/delete/:id', Categoria.delete)
routes.delete('/categoria/deleteAll/:id', Categoria.deleteAll)

//Products----------------------------------
routes.get('/product/get', Product.getAll)
routes.get('/product/get/:id', Product.getOne)
routes.get('/product/getPosicao', Product.getPosicao)
routes.get('/product/getCategory', Product.getCategory)
routes.get('/product/getCustom', Product.getCustom)
routes.get('/product/getIdPlace/:id', Product.getIdPlace)
routes.post('/product/create', multer(multerConfig).single('file'), Product.create)
routes.put('/product/update/:id', Product.update)
routes.put('/product/updatePosicao/:id', Product.updatePosicao)
routes.delete('/product/delete/:id', multer(multerConfig).single('file'), Product.delete)

//Cart--------------------------------------
routes.get('/cart/get', Cart.getAll)
routes.get('/cart/getId', Cart.getId)
routes.get('/cart/getIdUser', Cart.getIdUser)
routes.get('/cart/getIdUserIdPlace', Cart.getIdUserIdPlace)
routes.post('/cart/create', Cart.create)
routes.delete('/cart/delete/:id', Cart.delete)
routes.delete('/cart/deleteAll/:id', Cart.deleteAll)

//Request-----------------------------------
routes.get('/request/get', Request.getAll)
routes.get('/request/get/:id', Request.getOne)
routes.get('/request/getIdPlace/:id', Request.getIdPlace)
routes.get('/request/getIdUser/:id', Request.getIdUser)
routes.get('/request/getIdEntregador/:id', Request.getIdEntregador)
routes.get('/request/getIdEntregadorStatus', Request.getIdEntregadorStatus)
routes.get('/request/getStatus', Request.getStatus)
routes.get('/request/getIdUserStatus', Request.getIdUserStatus)
routes.get('/request/getIdPlaceStatus', Request.getIdPlaceStatus)
routes.post('/request/create', Request.create)
routes.put('/request/updateStatus/:id', Request.updateStatus)
routes.put('/request/updatePagamento/:id', Request.updatePagamento)
routes.put('/request/updateIdEntregador/:id', Request.updateIdEntregador)
routes.delete('/request/delete/:id', Request.delete)
routes.delete('/request/deleteAll/:id', Request.deleteAll)

//RequestContas----------------------------
routes.get('/requestContas/get/:id', Request.getOne)
routes.get('/requestContas/getIdPlaceRepasse', RequestContas.getIdPlaceRepasse)
routes.get('/requestContas/getIdPIdERepasse', RequestContas.getIdPIdERepasse)
routes.put('/requestContas/updateRepasse/:id', RequestContas.updateRepasse)

//Address---------------------------------
routes.get('/address/get', Address.getAll)
routes.get('/address/getIdUser/:id', Address.getIdUser)
routes.get('/address/getIdUserStatus', Address.getIdUserStatus)
routes.post('/address/create', Address.create)
routes.put('/address/update/:id', Address.update)
routes.put('/address/updateStatus/:id', Address.updateStatus)
routes.delete('/address/delete/:id', Address.delete)

//Conected Users
routes.get('/conectedUsers', Conected.connected)
routes.post('/comand/:id/:msg', Conected.comand)

//Frete
routes.get('/frete/get', Frete.get)
routes.post('/frete/create', Frete.create)
routes.put('/frete/update/:id', Frete.update)
routes.delete('/frete/delete/:id', Frete.delete)

//Payments
routes.post('/pay/sessao', Pay.sessao)
routes.post('/pay/bandeira', Pay.bandeira)
routes.post('/pay/token', Pay.token)
routes.post('/pay/pay', Pay.pay)

//Central
routes.get('/central', Central.central)

module.exports = routes