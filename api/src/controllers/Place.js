const Place = require('../models/Place')

module.exports = {
    //query all
    async getAll(req, res) {
        const places = await Place.find().sort({open: -1})
        res.json(places)
    },

    //query one
    async getOne(req, res) {
        const places = await Place.findById(req.params.id)
        res.json(places)
    },

    //category query 
    async getCategory(req, res) {
        const { categoria } = req.query
        const places = await Place.find({ categoria })
        res.json(places)
    },

    //get IdIser
    async getIdUser(req, res) {
        const { iduser } = req.query
        const places = await Place.find({ iduser })
        res.json(places)
    },

    //custom query 
    async getCustom(req, res) {
        const { custom } = req.query
        const places = await Place.find({$or:[ {categoria:{$regex: `.*${custom}.*`, $options: 'i' }}, {nome:{$regex: `.*${custom}.*`, $options: 'i' }}]})
        res.json(places)
    },

    //add
    async create(req, res) {
        const { iduser, nome, descricao, categoria, ssh1, ssh2, sh1, sh2, dh1, dh2, lat, lgt } = req.headers
        const { originalname: name, size, key, location: url = '' } = req.file
        try{
        const places = await Place.create({
            name,
            size,
            key,
            url,
            iduser,
            nome,
            descricao,
            categoria,
            ssh1,
            ssh2,
            sh1,
            sh2,
            dh1,
            dh2,
            lat,
            lgt,
        })
            res.json(places)
        }catch{
            res.json({ error: "Falha no registro, tente novamente! " })
        }
    },

    //update
    async update(req, res) {
        const { nome, descricao, categoria, ssh1, ssh2, sh1, sh2, dh1, dh2, lat, lgt } = req.body
        await Place.findByIdAndUpdate(req.params.id, {
            nome,
            descricao,
            categoria,
            ssh1,
            ssh2,
            sh1,
            sh2,
            dh1,
            dh2,
            lat,
            lgt
        }).then(() => {
            res.json({ success: "Dados Atualizados com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar dados: " + err })
        })
    },

       //update avaliação
       async updateAvaliacao(req, res) {
        const { avaliacao } = req.body
        await Place.findByIdAndUpdate(req.params.id, {
            avaliacao
        }).then(() => {
            res.json({ success: "Nota atualizada com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar nota: " + err })
        })
    },

      //update Open
      async updateOpen(req, res) {
        const { open } = req.body
        await Place.findByIdAndUpdate(req.params.id, {
            open
        }).then(() => {
            res.json({ success: "Open atualizada com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar open: " + err })
        })
    },


    //delete
    async delete(req, res) {
        const place = await Place.findById(req.params.id)
        await place.remove().then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },
}