const consulta = require("../models/consultas")


module.exports = app => {
    app.get('/consultas', (req, res) => {
        consulta.lista(res)
    })

    app.get('/consultas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        
        consulta.pesquisarPorId(id, res)
    })

    app.post('/consultas', (req, res) => {
        console.log('Consulta enviada')
        const atendimento = req.body

        consulta.criar(atendimento, res)
        
    })

    app.patch('/consultas/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        consulta.altera(id, valores, res)

    })

    app.delete('/consultas/:id',(req, res) => {
        const id = parseInt(req.params.id)
        
        consulta.excluir(id, res)
    })

    
     
     
}