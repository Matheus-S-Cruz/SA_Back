import { sql } from './db.js'

sql`
  CREATE TABLE clientes (
      id text PRIMARY KEY,
      senha int,
      name character varying(255),
      endereco character varying(255),
      complemento character varying(255),
      descricao character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})