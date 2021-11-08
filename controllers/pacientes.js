const Paciente = require("../models/pacientes")

module.exports = app => {
    app.get('/pacientes', (req, res) => {
        Paciente.listarPacientes(res)
    })

    app.get('/pacientes/:id_paciente', (req, res) => {
        const id_paciente = parseInt(req.params.id_paciente)
        
        Paciente.pesquisarPacientePorId(id_paciente, res)
    })

    app.post('/pacientes', (req, res) => {
        console.log('Consulta enviada')
        const paciente = req.body

        Paciente.cadastrarPaciente(paciente, res)
        
    })

    app.patch('/pacientes/:id_paciente', (req, res) => {
        const id_paciente = parseInt(req.params.id_paciente)
        const valores = req.body

        Paciente.alterarPaciente(id_paciente, valores, res)

    })

    app.delete('/pacientes/:id_paciente',(req, res) => {
        const id_paciente = parseInt(req.params.id_paciente)
        
        Paciente.excluirPaciente(id_paciente, res)
    })

    
     
     
}