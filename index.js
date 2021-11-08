const customExpress = require('./config/customExpress')
const conexao = require('./DAO/conexao')
const Tabelas = require('./DAO/tabelas')
conexao.connect((erro) => {
    if(erro){
        console.log("Erro de conexão"+ erro)
    }
    else{
        console.log("Finalmente conectou")
        Tabelas.init(conexao)
        const app = customExpress()
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})

