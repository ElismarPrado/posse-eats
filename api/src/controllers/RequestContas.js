const RequestContas = require('../models/Request')

module.exports = {

    //query one
    async getOne(req, res) {
        const requestsContas = await RequestContas.findById(req.params.id)
        res.json(requestsContas)
    },
    

    // idPlace, Repasse
    async getIdPlaceRepasse(req, res) {
        const { idplace, repasse, status } = req.query
        const requestsContas = await RequestContas.find({ idplace, repasse, status }).limit(50)
        res.json(requestsContas)
    },
    
    // idPlace Status query
    async getIdPIdERepasse(req, res) {
        const { idplace, identregador, repasse, status } = req.query
        const requestsContas = await RequestContas.find({ idplace, identregador, repasse, status }).limit(50)
        res.json(requestsContas)
    },

    //update status Operacao
    async updateRepasse(req, res) {
        const { repasse } = req.body
        await RequestContas.findByIdAndUpdate(req.params.id, {
            repasse
        }).then(() => {
            res.json({ success: "Repasse atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar repasse: " + err })
        })
    },

}