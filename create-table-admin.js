import { sql } from './db.js'

sql`
  CREATE TABLE admins (
      id text PRIMARY KEY,
      senha int
  );
`.then(() => {
  console.log('tabela criada');
})