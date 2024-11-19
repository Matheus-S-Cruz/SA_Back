import { sql } from './db.js'

sql`
DROP TABLE cuidadores
`.then(() => {
    console.log('Tabela Apagada')
})