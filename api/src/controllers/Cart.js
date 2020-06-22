const Cart = require('../models/Cart')

module.exports = {
    //query all ############# teste
    async getAll(req, res) {
        const carts = await Cart.find()
        res.json(carts)
    },


    // id query
    async getId(req, res) {
        const { idplace, iduser } = req.query
        const carts = await Cart.find({ idplace, iduser })
        res.json(carts)
    },

    // idUser query
    async getIdUser(req, res) {
        const { iduser } = req.query
        const carts = await Cart.find({ iduser })
        res.json(carts)
    },

     // idUser idPlace query
    async getIdUserIdPlace(req, res) {
        const { iduser, idplace } = req.query
        const carts = await Cart.find({ iduser, idplace })
        res.json(carts)
    },

    //add
    async create(req, res) {
        const { idplace, nomeplace, fotoplace, foneplace, iduser, foto, nome, descricao, categoria, estoque, valor, quantidade, observacao, opcao1, opcao2, opcao3 } = req.body
        try{
         await Cart.create({
            idplace,
            nomeplace,
            fotoplace,
            foneplace,
            iduser,
            foto,
            nome,
            descricao,
            categoria,
            estoque,
            valor,
            quantidade,
            observacao,
            opcao1,
            opcao2,
            opcao3,
        })
            res.json({ success: "Produto adicionado com sucesso!" })
        }catch{
            res.json({ error: "Falha ao adicionar produto, tente novamente!" })
        }
    },

    //delete
    async delete(req, res) {
        await Cart.findByIdAndDelete(req.params.id).then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },

     //delete all
     async deleteAll(req, res) {
         const iduser = req.params.id
        await Cart.deleteMany({ iduser }).then(() => {
            res.json({ success: "Dados deletados!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },
}