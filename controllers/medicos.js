const Medico = require("../models/medicos")

module.exports = app => {
    app.get('/medicos', (req, res) => {
        Medico.listarMedicos(res)
    })

    app.get('/medicos/:id_medico', (req, res) => {
        const id_medico = parseInt(req.params.id_medico)
        
        Medico.pesquisarMedicoPorId(id_medico, res)
    })

    app.post('/medicos', (req, res) => {
        console.log('Consulta enviada')
        const medico = req.body

        Medico.cadastrarMedico(medico, res)
        
    })

    app.patch('/medicos/:id_medico', (req, res) => {
        const id_medico = parseInt(req.params.id_medico)
        const valores = req.body

        Medico.alterarMedico(id_medico, valores, res)

    })

    app.delete('/medicos/:id_medico',(req, res) => {
        const id_medico = parseInt(req.params.id_medico)
        
        Medico.excluirMedico(id_medico, res)
    })

    
     
     
}