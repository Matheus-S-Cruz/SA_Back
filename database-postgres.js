import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres { 
  async listClientes() {
    const clientes = await sql`select * from clientes`;
    return clientes;
  }


  async createCliente(Cliente) {
    const id = randomUUID();
    const { name, descricao, complemento, endereco  } = cliente;

    await sql`insert into clientes (id, name, endereco, descricao, complemento) 
              values (${id}, ${name}, ${endereco}, ${descricao}, ${complemento})`;
  }

  async updateCliente(id, cliente) {
    const { name, endereco, descricao, complemento } = cliente;

    await sql`update cliente set 
    name = ${name},
    endereco = ${endereco},
    descricao = ${descricao},
    complemento = ${complemento}
    where id = ${id}
`;

  }

  async deleteCliente(id) {
    await sql`delete from clientes where id = ${id}`

  }

}