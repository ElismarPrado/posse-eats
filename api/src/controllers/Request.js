const Request = require('../models/Request')

module.exports = {
    //query all
    async getAll(req, res) {
        const requests = await Request.find()
        res.json(requests)
    },

    //query one
    async getOne(req, res) {
        const requests = await Request.findById(req.params.id)
        res.json(requests)
    },

    // idPlace query
    async getIdPlace(req, res) {
        const idplace = req.params.id
        const requests = await Request.find({ idplace })
        res.json(requests)
    },
    
    // idUser query
    async getIdUser(req, res) {
        const iduser = req.params.id
        const requests = await Request.find({ iduser })
        res.json(requests)
    },

    // idEntregador query
    async getIdEntregador(req, res) {
        const identregador = req.params.id
        const requests = await Request.find({ identregador })
        res.json(requests)
    },

     // idEntregador query
     async getIdEntregadorStatus(req, res) {
        const {identregador, status} = req.query
        const requests = await Request.find({ identregador, status }).limit(50)
        res.json(requests)
    },

    // idUser Status query
    async getStatus(req, res) {
        const { status } = req.query
        const requests = await Request.find({ status })
        res.json(requests)
    },
    
    // idUser Status query
    async getIdUserStatus(req, res) {
        const { iduser, status } = req.query
        const requests = await Request.find({ iduser, status })
        res.json(requests)
    },

    // idPlace Status query
    async getIdPlaceStatus(req, res) {
        const { idplace, status } = req.query
        const requests = await Request.find({ idplace, status })
        res.json(requests)
    },

    //add
    async create(req, res) {
        const { idplace, iduser, nomeuser, fotouser, foneuser, produto, end, numero, complemento, referencia, lat,
            lgt, status, total, pagamento, frete } = req.body
        try{
        const requests = await Request.create({
            idplace,
            iduser,
            nomeuser,
            fotouser,
            foneuser,
            produto,
            end,
            numero,
            complemento,
            referencia,
            lat,
            lgt,
            status,
            total,
            pagamento,
            frete,
        })
            res.json(requests)
        }catch{
            res.json({ error: "Falha no registro, tente novamente! " })
        }
    },


    //update status
    async updateStatus(req, res) {
        const { status } = req.body
        await Request.findByIdAndUpdate(req.params.id, {
            status
        }).then(() => {
            res.json({ success: "Status atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar status: " + err })
        })
    },

    //update pagamento
    async updatePagamento(req, res) {
        const { pagamento } = req.body
        await Request.findByIdAndUpdate(req.params.id, {
            pagamento
        }).then(() => {
            res.json({ success: "Pagamento atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar pagamento: " + err })
        })
    },

      //update id entregador
      async updateIdEntregador(req, res) {
        const { identregador } = req.body
        await Request.findByIdAndUpdate(req.params.id, {
            identregador
        }).then(() => {
            res.json({ success: "id atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar id: " + err })
        })
    },


    //delete
    async delete(req, res) {
        await Request.findByIdAndDelete(req.params.id).then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },

     //delete all
     async deleteAll(req, res) {
        const iduser = req.params.id
       await Request.deleteMany({ iduser }).then(() => {
           res.json({ success: "Dados deletados!" })
       }).catch((err) => {
           res.json({ error: "Erro ao deletar dados " + err })
       })
   },
}