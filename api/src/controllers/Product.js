const Product = require('../models/Product')

module.exports = {
    //query all
    async getAll(req, res) {
        const products = await Product.find()
        res.json(products)
    },

    //query one
    async getOne(req, res) {
        const products = await Product.findById(req.params.id)
        res.json(products)
    },

    //posiçao query 
    async getPosicao(req, res) {
        const { posicao, idplace } = req.query
        const products = await Product.find({ posicao, idplace })
        res.json(products)
    },

    //category query 
    async getCategory(req, res) {
        const { categoria } = req.query
        const products = await Product.find({ categoria })
        res.json(products)
    },

    //custom query 
    async getCustom(req, res) {
        const { custom } = req.query
        const products = await Product.find({$or:[ {categoria:{$regex: `.*${custom}.*`, $options: 'i' }}, {nome:{$regex: `.*${custom}.*`, $options: 'i' }}]})
        res.json(products)
    },


    // idPlace query
    async getIdPlace(req, res) {
        const idplace = req.params.id
        const products = await Product.find({ idplace })
        res.json(products)
    },

    //add
    async create(req, res) {
        const { idplace, nomeplace, fotoplace, foto, nome, descricao, categoria, valor, posicao, opcao1, opcao2, opcao3} = req.headers
        const { originalname: name, size, key, location: url = ''} = req.file
        try{
        await Product.create({
            name,
            size,
            key,
            url,
            idplace,
            nomeplace,
            fotoplace,
            foto,
            nome,
            descricao,
            categoria,
            valor,
            posicao,
            opcao1,
            opcao2,
            opcao3
        })
            res.json({ success: 'Produto inserido com sucesso!'})
        }catch{
            res.json({ error: "Falha ao inserir produto, tente novamente! " })
        }
    },

    //update
    async update(req, res) {
        const { nome, descricao, categoria, valor, posicao } = req.body
        await Product.findByIdAndUpdate(req.params.id, {
            nome,
            descricao,
            categoria,
            valor,
            posicao,
        }).then(() => {
            res.json({ success: "Produto Atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar produto: " + err })
        })
    },

    //update estoque
    async updatePosicao(req, res) {
        const { posicao } = req.body
        await Product.findByIdAndUpdate(req.params.id, {
            posicao
        }).then(() => {
            res.json({ success: "Posição atualizada com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar posição: " + err })
        })
    },


    //delete
    async delete(req, res) {
        const product = await Product.findById(req.params.id)
        await product.remove().then(() => {
            res.json({ success: "Produto removido com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao remover produto " + err })
        })
    },
}