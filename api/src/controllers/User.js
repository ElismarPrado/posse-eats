process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
const User = require('../models/User')
const nodemailer = require('nodemailer')


async function mail(email, senha) {
    //let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'insitetecnologia2020@gmail.com', // generated ethereal user
        pass: 'elismar9620', // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'Posse Eats', // sender address
      to: email, // list of receivers
      subject: "Bem vindo ao Posse Eats", // Subject line
      text: "Olá, Seja bem vido ao maior APP de delivery da região.", // plain text body
      html: `<h6>Seus dados de acesso: <br/> Email: ${email} <br/> Senha: ${senha}</h6>`, // html body
    });
  
    console.log("Message sent:", info.messageId);
  }


module.exports = {
    //query all
    async getAll(req, res) {
        const { page } = req.query
        const users = await User.paginate({}, { page, limit: 100 })
            res.json(users)
    },

    //query one
    async getOne(req, res) {
        const users = await User.findById(req.params.id)
            res.json({ user: users })
    },

    //login
    async login(req, res) {
        const { email, password } = req.body
        const users = await User.findOne({ email }).select('+password')
            if (!users)
                res.json({ error: "Usuario não cadastrado!" })
            if (password != users.password)
                res.json({ error: "Senha incorreta!" })

            users.password = undefined
            res.json({ user: users })
    },

    //add
    async create(req, res) {
        const { name, email, fone, password, type } = req.body
        if (await User.findOne({ email })) {
            res.json({ error: "Email já cadastrado!" })
        } else if (await User.findOne({ fone })) {
            res.json({ error: "Telefone já cadastrado!" })
        } else {
            try{
            const users = await User.create({
                name,
                email,
                fone,
                password,
                type
            })
                mail(users.email, users.password)
                users.password = undefined
                res.json({ user: users })

            }catch {
                res.json({ error: "erro ao salvar dados "})
            }
        }
    },

    //update
    async update(req, res) {
        const { name, email, fone } = req.body
        await User.findByIdAndUpdate(req.params.id, {
            name,
            email,
            fone,
        }).then(() => {
            res.json({ success: "Dados Atualizados com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar dados: " + err })
        })
    },


    //update status
    async updateStatus(req, res) {
        const { status } = req.body
        await User.findByIdAndUpdate(req.params.id, {
            status
        }).then(() => {
            res.json({ success: "Status atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar status: " + err })
        })
    },

      //update status
      async updateOperation(req, res) {
        const { operation } = req.body
        await User.findByIdAndUpdate(req.params.id, {
            operation
        }).then(() => {
            res.json({ success: "Operação atualizada com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar operação: " + err })
        })
    },

    async updateFoto(req, res) {
        const { foto } = req.body
        await User.findByIdAndUpdate(req.params.id, {
            foto
        }).then(() => {
            res.json({ success: "Foto atualizado com sucesso!" })
        }).catch((err) => {
            res.json({ error: "Erro ao atualizar foto: " + err })
        })
    },

    //update password
    async updateKey(req, res) {
        const { email, currentPassword, password } = req.body
        const users = await User.findOne({ email }).select('+password')

        if (currentPassword != users.password) {
            res.json({ error: "Senha atual incorreta!" })
        } else {

            await User.findByIdAndUpdate(req.params.id, {
                password
            }).then(() => {
                res.json({ success: "Senha atualizada com sucesso!" })
            }).catch((err) => {
                res.json({ error: "Erro ao atualizar senha: " + err })
            })
        }
    },

    //delete
    async delete(req, res) {
        await User.findByIdAndDelete(req.params.id).then(() => {
            res.json({ success: "Dado deletado!" })
        }).catch((err) => {
            res.json({ error: "Erro ao deletar!" + err })
        })
    },
}