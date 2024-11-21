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

  // Adicionar um novo cuidador
async createCuidador(cuidador) {
  const { name, senha, cpf_cuidador, endereco, complemento, descricao } = cuidador;
  await sql`
      INSERT INTO cuidadores (id_cuidador, senha, name, cpf_cuidador, endereco, complemento, descricao)
      VALUES (gen_random_uuid(), ${senha}, ${name}, ${cpf_cuidador}, ${endereco}, ${complemento}, ${descricao});
  `;
}

// Listar todos os cuidadores
async listCuidadores() {
  const cuidadores = await sql`SELECT * FROM cuidadores`;
  return cuidadores;
}

// Atualizar informações de um cuidador
async updateCuidador(id, cuidador) {
  const { senha, name, cpf_cuidador, endereco, complemento, descricao } = cuidador;
  await sql`
      UPDATE cuidadores
      SET senha = ${senha}, name = ${name}, cpf_cuidador = ${cpf_cuidador}, endereco = ${endereco}, complemento = ${complemento}, descricao = ${descricao}
      WHERE id_cuidador = ${id};
  `;
}

// Deletar um cuidador
async deleteCuidador(id) {
  await sql`DELETE FROM cuidadores WHERE id_cuidador = ${id}`;
}

// Adicionar um novo admin
async createAdmin(admin) {
  const { id_admin, senha } = admin;
  await sql`
      INSERT INTO admins (id_admin, senha)
      VALUES (${id_admin}, ${senha});
  `;
}

// Listar todos os admins
async listAdmins() {
  const admins = await sql`SELECT * FROM admins`;
  return admins;
}

// Atualizar informações de um admin
async updateAdmin(id, admin) {
  const { senha } = admin;
  await sql`
      UPDATE admins
      SET senha = ${senha}
      WHERE id_admin = ${id};
  `;
}

// Deletar um admin
async deleteAdmin(id) {
  await sql`DELETE FROM admins WHERE id_admin = ${id}`;
}
}