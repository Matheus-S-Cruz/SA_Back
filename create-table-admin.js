import { sql } from './db.js'

sql`
  CREATE TABLE admins (
      id_admin serial PRIMARY KEY,
      senha varchar(255)
  );
`.then(() => {
  console.log('tabela criada');
})