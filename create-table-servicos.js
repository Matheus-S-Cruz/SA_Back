import { sql } from './db.js'

sql`
  CREATE TABLE servicos (
      id_servicos text PRIMARY KEY,
      tipo varchar(255) NOT NULL,
      data DATE NOT NULL,
      horario TIMESTAMP NOT NULL,
      id_cliente int REFERENCES clientes(id_cliente),
      id_cuidador int REFERENCES cuidadores(id_cuidador)
  );
`.then(() => {
  console.log('tabela criada');
})