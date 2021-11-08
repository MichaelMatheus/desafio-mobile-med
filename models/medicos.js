const moment = require('moment')
const conexao = require('../DAO/conexao')


class Medicos {
    cadastrarMedico(medico, res){
        
            const sql = 'INSERT INTO Medicos SET ?'
            conexao.query(sql, medico, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }
                else{             
                res.status(201).json(medico) 
                }            
            })
        }

    listarMedicos(res){
        const sql = 'SELECT * FROM Medicos'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    pesquisarMedicoPorId(id_medico, res){
        const sql = 'SELECT * FROM Medicos WHERE id_medico='+id_medico

        conexao.query(sql, (erro, resultados) => {
            const consulta = resultados[0]
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(consulta)
            }
        })
    }

    alterarMedico(id_medico, valores, res) {
        
        const sql = 'UPDATE Medicos SET ? WHERE id_medico=?'
    
        conexao.query(sql, [valores, id_medico], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({...valores, id_medico})
            }
        })
    
    }

    excluirMedico(id_medico, res){
        const sql = 'DELETE FROM Medicos WHERE id_medico=?'

        conexao.query(sql, id_medico, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }
}



module.exports = new Medicos