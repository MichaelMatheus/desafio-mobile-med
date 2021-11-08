const moment = require('moment')
const conexao = require('../DAO/conexao')

class Consultas {
    criar(atendimento, res){
        const data_agendamento = moment().format('YYYY-MM-DD HH:MM:SS')
        const data_consulta = moment(atendimento.data_consulta, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        const consultaComData = {...atendimento, data_agendamento, data_consulta}       
        const dataValida = moment(data_consulta).isSameOrAfter(data_agendamento)

        const validacao = [ 
            {
                campo: 'data',
                valido: dataValida,
                mensagem: "Data deve ser maior que a data atual"
            },
        ]

        const erros = validacao.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }
        else{
            const sql = 'INSERT INTO consultas SET ?'
            conexao.query(sql, consultaComData, (erro, resultados) =>{
                if(erro){
                    res.status(400).json(erro)
                }
                else{
                    res.status(201).json(atendimento)
                }

            })
        }
        
    }

    lista(res){
        const sql = 'SELECT * FROM Consultas'

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json(resultados)
            }
        })
    }

    pesquisarPorId(id_consulta, res){
        const sql = 'SELECT * FROM consultas WHERE id='+id_consulta

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

    altera(id_paciente, valores, res) {
        if(valores.data_consulta){
            valores.data_consulta = moment(valores.data_consulta, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE consultas SET ? WHERE id_paciente=?'
    
        conexao.query(sql, [valores, id_paciente ], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json({...valores, id_paciente})
            }
        })
    
    }

    excluir(id_consulta, res){
        const sql = 'DELETE FROM consultas WHERE id_consulta=?'

        conexao.query(sql, id_consulta, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro)
            }
            else{
                res.status(200).json('Paciente id:' + resultados.id_paciente + 'Deletado')
            }
        })
    }
}



module.exports = new Consultas