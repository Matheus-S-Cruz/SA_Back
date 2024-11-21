import { sql } from './db.js'

sql`
  CREATE TABLE cuidadores (
      id_cuidador text PRIMARY KEY,
      senha varchar(255),
      name varchar(255),
      cpf_cuidador varchar(11),
      endereco varchar(255),
      complemento varchar(255),
      descricao varchar(255)
  );
`.then(() => {
  console.log('tabela criada');
})