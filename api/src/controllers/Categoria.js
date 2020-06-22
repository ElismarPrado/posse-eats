const Categoria = require('../models/Categoria')

module.exports = {
    //query all
    async getAll(req, res) {
        const categorias = await Categoria.find()
        res.json(categorias)
    },


    // idUser query
    async getCategoria(req, res) {
        const { categoria } = req.query
        const categorias = await Categoria.find({ categoria })
        res.json(categorias)
    },

    //add
    async create(req, res) {
        const { categoria, image, name } = req.body
        try{
         await Categoria.create({
            categoria,
            image,
            name,
        })
            res.json({ success: "Categoria adicionada com sucesso!" })
        }catch{
            res.json({ error: "Falha ao adicionar categoria, tente novamente!" })
        }
    },

      //update
      async update(req, res) {
        const { categoria, image, name } = req.body
        await Categoria.findByIdAndUpdate(req.params.id, {
            categoria,
            image,
            name,
        }).then(() => {
            res.json({ success: "Dados Atualizados com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar dados: " + err })
        })
    },

    //delete
    async delete(req, res) {
        await Categoria.findByIdAndDelete(req.params.id).then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },

     //delete all
     async deleteAll(req, res) {
         const id = req.params.id
        await Categoria.deleteMany({ id }).then(() => {
            res.json({ success: "Dados deletados!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar dados " + err })
        })
    },
}