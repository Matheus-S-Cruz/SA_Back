import { sql } from './db.js'

sql`
  CREATE TABLE servicos (
      id text PRIMARY KEY,
      tipo varchar(255) NOT NULL,
      data TIMESTAMP NOT NULL,
      id_cliente text REFERENCES clientes(id_cliente),
      id_cuidador text REFERENCES cuidadores(id_cuidador)
  );
`.then(() => {
  console.log('tabela criada');
})