const moment = require('moment')
const conexao = require('../DAO/conexao')


class Pacientes {
    cadastrarPaciente(paciente, res){
        const data_atual = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_nascimento = moment(paciente.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const dataValida = moment(data_nascimento).isSameOrAfter(data_atual)
        const paciente_completo = {...paciente, data_nascimento}
        const pacienteValido = paciente.nome_paciente.length >= 5
        

        const validacao =[
            {
                campo: 'data',
                valido: !dataValida,
                mensagem: "Data deve ser menor que a data atual"
            },
            {
                campo: 'nome_paciente',
                valido: pacienteValido,
                mensagem: "Nome do paciente deve ter no minimo 5 caracteres"
            }
        ]
        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }
        else{
            const sql = 'INSERT INTO Pacientes SET ?'
            conexao.query(sql, paciente_completo, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }
                else{             
                res.status(201).json(paciente) 
                }            
            })
        }

    }

    listarPacientes(res){
        const sql = 'SELECT * FROM Pacientes'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    pesquisarPacientePorId(id_paciente, res){
        const sql = 'SELECT * FROM Pacientes WHERE id_paciente='+id_paciente        
        conexao.query(sql, (erro, resultados) => {
            
            const pesquisa = resultados[0]
            if(erro){
                res.status(400).json(erro)
                obj = erro
            }
            else{
                res.status(200).json(pesquisa)
                obj = pesquisa
            }
        })        
    }

    alterarPaciente(id_paciente, valores, res) {
        if(valores.data_nascimento){
            valores.data_nascimento = moment(valores.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        
        const sql = 'UPDATE Pacientes SET ? WHERE id_paciente=?'
    
        conexao.query(sql, [valores, id_paciente], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({...valores, id_paciente})
            }
        })
    
    }

    excluirPaciente(id_paciente, res){
        const sql = 'DELETE FROM Pacientes WHERE id_paciente=?'

        conexao.query(sql, id_paciente, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }
}



module.exports = new Pacientes