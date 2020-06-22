const Address = require('../models/Address')

module.exports = {
    //get all
    async getAll(req, res) {
        const address = await Address.find()
        res.json(address)
    },

    //get idUser
    async getIdUser(req, res) {
        const iduser = req.params.id
        const address = await Address.find({ iduser })
        res.json(address)
    },
    
     //get idUser Status
     async getIdUserStatus(req, res) {
        const {iduser, status} = req.query
        const address = await Address.find({ iduser, status })
        res.json(address)
    },

    //add
    async create(req, res) {
        const { iduser, name, logradouro, numero, complemento, referencia, lat, lgt, status } = req.body
        try{
        const address = await Address.create({
            iduser,
            name,
            logradouro,
            numero,
            complemento,
            referencia,
            lat,
            lgt,
            status,
        })
            res.json(address)
        }catch{
            res.json({ error: "Falha no registro, tente novamente! " })
        }
    },

    //update
    async update(req, res) {
        const { iduser, name, logradouro, numero, complemento, referencia, lat, lgt, status } = req.body
        await Address.findByIdAndUpdate(req.params.id, {
            iduser,
            name,
            logradouro,
            numero,
            complemento,
            referencia,
            lat,
            lgt,
            status,
        }).then(() => {
            res.json({ success: "Dados Atualizados com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar dados: " + err })
        })
    },

       //update avaliação
       async updateStatus(req, res) {
        const { status } = req.body
        await Address.findByIdAndUpdate(req.params.id, {
            status
        }).then(() => {
            res.json({ success: "Status atualizada com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar Status: " + err })
        })
    },


    //delete
    async delete(req, res) {
        await Address.findByIdAndDelete(req.params.id).then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },
}