module.exports = {
    async connected(req, res) {
        res.send(req.connectedUsers)
    },

    async comand(req, res){
        const id = req.params.id
        const msg = req.params.msg
        req.io.emit('canal', {id, msg})
        res.send(msg)
    }
}