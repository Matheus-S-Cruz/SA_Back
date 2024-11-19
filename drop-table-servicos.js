import { sql } from './db.js'

sql`
DROP TABLE servicos
`.then(() => {
    console.log('Tabela Apagada')
})