import { randomUUID } from "crypto";
import { sql } from './db.js';

export class DatabasePostgres {

  async listClientes() {
    const clientes = await sql`select * from clientes`;
    return clientes;
  }


  async createCliente(Cliente) {
    const  id_cliente = randomUUID();
    const { name, senha, cpf_cliente, descricao, complemento, endereco  } = Cliente;

    await sql`insert into clientes ( id_cliente, name, senha, cpf_cliente, endereco, descricao, complemento) 
              values ( ${id_cliente}, ${name}, ${senha}, ${cpf_cliente}, ${endereco}, ${descricao}, ${complemento})`;
  }

  async updateCliente( id_cliente, Cliente) {
    const { name, senha, cpf_cliente, endereco, descricao, complemento } = Cliente;

    await sql`update clientes set 
    name = ${name},
    senha = ${senha},
    cpf_cliente = ${cpf_cliente},
    endereco = ${endereco},
    descricao = ${descricao},
    complemento = ${complemento}
    where id_cliente = ${ id_cliente}`
    ;
}

  async deleteCliente( id_cliente) {
    await sql`delete from clientes where  id_cliente = ${ id_cliente}`

  }

}