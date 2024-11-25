import { sql } from './db.js'

sql`
  CREATE TABLE admins (
      id_admin text PRIMARY KEY,
      usuario_admin varchar(20) NOT NULL,
      senha varchar(255) NOT NULL
  );
`.then(() => {
  console.log('tabela criada');
})