const Frete = require('../models/Frete')

module.exports = {
  //Get
  async get(req, res) {
    const frete = await Frete.find()
    res.json(frete)
},

//add
async create(req, res) {
    const { valor } = req.body
    try{
    const frete = await Frete.create({
        valor
    })
        res.json(frete)
    }catch{
        res.json({ error: "Falha no registro, tente novamente! " })
    }
},

//update
async update(req, res) {
    const { valor } = req.body
    await Frete.findByIdAndUpdate(req.params.id, {
      valor
    }).then(() => {
        res.json({ success: "Dado Atualizado com sucesso!" })
    }).catch((err) => {
        res.json({ error: "Erro ao atualizar dado: " + err })
    })
},

//delete
async delete(req, res) {
    await Frete.findByIdAndDelete(req.params.id).then(() => {
        res.json({ success: "Dado deletado!" })
    }).catch((err) => {
        res.json({ error: "Erro ao deletar dados " + err })
    })
},

}