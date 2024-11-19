import { sql } from './db.js'

sql`
  CREATE TABLE admins (
      id_admin serial PRIMARY KEY,
      senha int
  );
`.then(() => {
  console.log('tabela criada');
})