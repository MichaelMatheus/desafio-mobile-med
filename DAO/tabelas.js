class Tabelas {    
    init(conexao) {
        this.conexao = conexao
        this.criarConsultas();
        this.criarMedicos();
        this.criarPacientes();
    }

    criarConsultas() {
        const sql = 'CREATE TABLE IF NOT EXISTS Consultas (id_consulta int NOT NULL AUTO_INCREMENT,'+            
            'id_paciente int NOT NULL,'+
            'id_medico int NOT NULL,'+
            'tipo_consulta varchar(50) NOT NULL,'+
            'status varchar(20) NOT NULL,'+
            'data_agendamento datetime NOT NULL,'+
            'data_consulta datetime NOT NULL,'+
            'observacoes text,'+            
            'PRIMARY KEY(id_consulta))'
            
        
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log('Tabela Consultas Criada')
            }

        })

    }

    criarMedicos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Medicos (id_medico int NOT NULL AUTO_INCREMENT,'+                
            'tipo_medico varchar(50) NOT NULL,'+            
            'nome_medico varchar(50) NOT NULL,'+                        
            'PRIMARY KEY(id_medico))'
            
        
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log('Tabela Medicos Criada')
            }

        })

    }

    criarPacientes() {
        const sql = 'CREATE TABLE IF NOT EXISTS Pacientes (id_paciente int NOT NULL AUTO_INCREMENT,'+
            
            'nome_paciente varchar(50) NOT NULL,'+
            'data_nascimento datetime NOT NULL,'+
            'PRIMARY KEY(id_paciente))'
            
        
        this.conexao.query(sql, erro => {
            if(erro){
                console.log(erro)
            }
            else{
                console.log('Tabela Pacientes Criada')
            }

        })

    }

}

module.exports = new Tabelas