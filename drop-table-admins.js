import { sql } from './db.js'

sql`
DROP TABLE admins
`.then(() => {
    console.log('Tabela Apagada')
})