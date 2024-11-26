import { randomUUID } from "crypto";
import { sql } from './db.js';
import bcrypt from 'bcryptjs';

export class DatabasePostgres {

  // Listar todos os clientes
  async listClientes() {
    const clientes = await sql`SELECT * FROM clientes`;
    return clientes;
  }

  // Criar um novo cliente
  async createCliente(Cliente) {
    const id_cliente = randomUUID();
    const { name, senha, email, cpf_cliente, descricao, complemento, endereco } = Cliente;

    // Criptografando a senha antes de salvar
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await sql`
      INSERT INTO clientes (id_cliente, name, senha, email, cpf_cliente, endereco, descricao, complemento)
      VALUES (${id_cliente}, ${name}, ${senhaCriptografada}, ${email}, ${cpf_cliente}, ${endereco}, ${descricao}, ${complemento})
    `;
  }

  // Atualizar um cliente existente
  async updateCliente(id_cliente, Cliente) {
    const { name, senha, email, cpf_cliente, endereco, descricao, complemento } = Cliente;

    // Criptografando a nova senha antes de atualizar
    const senhaCriptografada = senha ? await bcrypt.hash(senha, 10) : undefined;

    await sql`
      UPDATE clientes
      SET 
        name = ${name},
        senha = ${senhaCriptografada || sql`senha`},  // Caso a senha não tenha sido fornecida, mantém a senha atual
        email = ${email},  -- Atualizando o email
        cpf_cliente = ${cpf_cliente},
        endereco = ${endereco},
        descricao = ${descricao},
        complemento = ${complemento}
      WHERE id_cliente = ${id_cliente}
    `;
  }

  // Deletar um cliente
  async deleteCliente(id_cliente) {
    await sql`DELETE FROM clientes WHERE id_cliente = ${id_cliente}`;
  }

  // Criar um novo cuidador
  async createCuidador(cuidador) {
    const { name, senha, email, cpf_cuidador, endereco, complemento, descricao } = cuidador;
    await sql`
      INSERT INTO cuidadores (id_cuidador, senha, name, email, cpf_cuidador, endereco, complemento, descricao)
      VALUES (gen_random_uuid(), ${senha}, ${name}, ${email}, ${cpf_cuidador}, ${endereco}, ${complemento}, ${descricao})
    `;
  }

  // Listar todos os cuidadores
  async listCuidadores() {
    const cuidadores = await sql`SELECT * FROM cuidadores`;
    return cuidadores;
  }

  // Atualizar informações de um cuidador
  async updateCuidador(id, cuidador) {
    const { senha, name, email, cpf_cuidador, endereco, complemento, descricao } = cuidador;
    await sql`
      UPDATE cuidadores
      SET senha = ${senha}, name = ${name}, email = ${email}, cpf_cuidador = ${cpf_cuidador}, endereco = ${endereco}, complemento = ${complemento}, descricao = ${descricao}
      WHERE id_cuidador = ${id}
    `;
  }

  // Deletar um cuidador
  async deleteCuidador(id) {
    await sql`DELETE FROM cuidadores WHERE id_cuidador = ${id}`;
  }

  // Criar um novo admin
  async createAdmin(admin) {
    const { usuario_admin, senha } = admin;
    await sql`
      INSERT INTO admins (id_admin, usuario_admin, senha)
      VALUES (gen_random_uuid(), ${usuario_admin}, ${senha})
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
      WHERE id_admin = ${id}
    `;
  }

  // Deletar um admin
  async deleteAdmin(id) {
    await sql`DELETE FROM admins WHERE id_admin = ${id}`;
  }

  // Criar um novo serviço
  async createServico(servico) {
    const { tipo, data, id_cliente, id_cuidador } = servico;
    await sql`
      INSERT INTO servicos (id, tipo, data, id_cliente, id_cuidador)
      VALUES (gen_random_uuid(), ${tipo}, ${data}, ${id_cliente}, ${id_cuidador})
    `;
  }

  // Listar todos os serviços
  async listServicos() {
    const servicos = await sql`SELECT * FROM servicos`;
    return servicos;
  }

  // Atualizar um serviço
  async updateServico(id, servico) {
    await sql`
      UPDATE servicos
      SET tipo = ${servico.tipo}, data = ${servico.data}, horario = ${servico.horario}, id_cliente = ${servico.id_cliente}, id_cuidador = ${servico.id_cuidador}
      WHERE id = ${id}
    `;
  }

  // Deletar um serviço
  async deleteServico(id) {
    await sql`DELETE FROM servicos WHERE id = ${id}`;
  }
}