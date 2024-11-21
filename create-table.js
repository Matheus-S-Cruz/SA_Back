import { sql } from './db.js'

sql`
  CREATE TABLE clientes (
      id_cliente text PRIMARY KEY,
      senha varchar(255),
      name varchar(255),
      cpf_cliente varchar(11),
      endereco varchar(255),
      complemento varchar(255),
      descricao varchar(255)
  );
`.then(() => {
  console.log('tabela criada');
})