import { sql } from './db.js'

sql`
DROP TABLE clientes
`.then(() => {
    console.log('Tabela Apagada')
})