const Request = require('../models/Request')
const fetch = require('node-fetch');

module.exports = {
	async central(req, res){
		res.json('Central')
    },
}


async function setCont(id, id2, valor){
    const status = 'CHAMAR ENTREGADOR'
    const x = valor + 1
   
    await Request.findByIdAndUpdate(id, { cont1: x })

    if(valor >= 20){
        await Request.findByIdAndUpdate(id, { status, })
        await Request.findByIdAndUpdate(id, { cont1: 0 })

        await fetch(`http://3.23.146.65:3333/comand/${id2}/sem entregador`, {method: 'POST'})
        await fetch(`http://3.23.146.65:3333/comand/all-entregadores/cancelar solicitacao`, {method: 'POST'})
    }
}


async function setCont2(id, id2, id3, valor){
    const status = 'RECUSADO'
    const x = valor + 1
   
    await Request.findByIdAndUpdate(id, { cont2: x })

    if(valor >= 180){
        await Request.findByIdAndUpdate(id, { status, })

        await fetch(`http://3.23.146.65:3333/comand/${id2}/recusado`, {method: 'POST'})
        await fetch(`http://3.23.146.65:3333/comand/${id3}/recusado`, {method: 'POST'})
    }
}

async function getDate(){
    const status = 'AGUARDANDO ENTREGADOR'
    const status2 = 'AGUARDANDO'
    const requests = await Request.find({ status })

    const requests2 = await Request.find({ status: status2 })

    requests.map(date => (
        setCont(date._id, date.idplace, date.cont1)
      ))

    requests2.map(date => (
      setCont2(date._id, date.iduser, date.idplace, date.cont2)
    ))
}


setInterval(()=>{getDate()},5000)