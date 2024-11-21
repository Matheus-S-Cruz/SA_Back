
import { fastify } from 'fastify';
import cors from '@fastify/cors';
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const databasePostgres = new DatabasePostgres;

// CORS
server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})


// CREATE
server.post('/clientes', async (request, reply) => {
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.name) {
        error.name = 'Valor name não foi informado.'
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.'
    }
    if (!body.cpf_cliente) {
        error.cpf_cliente = 'Valor cpf_cliente não foi informado.'
    }
    if (!body.endereco) {
        error.endereco = 'Valor endereço não foi informado.'
    }
    if (!body.complemento) {
        error.complemento = 'Valor complemento não foi informado.'
    }
    if (!body.descricao) {
        error.descricao = 'Valor descrição não foi informado.'
    }

    // Se todos os campos obrigatórios estiverem presentes, cria o cliente
    if (body.name && body.endereco) {
        await databasePostgres.createCliente(body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// READ
server.get('/clientes', async () => {
    const clientes = await databasePostgres.listClientes();
    return clientes;
});

// UPDATE
server.put('/clientes/:id', async (request, reply) => {
    const clienteID = request.params.id;
    const body = request.body;
  

    let error = {};

    if(!body.name){
        error.name = 'Valor name não foi informado.'

    } if (!body.senha){
        error.senha = 'Valor senha não foi informado.'
    }
    if (!body.cpf_cliente){
        error.cpf_cliente = 'Valor cpf_cliente não foi informado.'
    }
    if (!body.endereco){
        error.endereco = 'Valor endereço não foi informado.'
    }
    if (!body.complemento){
    error.complemento = 'Valor complemento não foi informado.'
     }
     if (!clienteID){
        error.complemento = 'Valor ID não foi informado.'
         }
     if (!body.descricao){
error.descricao = 'Valor descrição não foi informado.'
    }
    if(body.name && body.endereco && clienteID){
        await databasePostgres.updateCliente(clienteID, body);
        return reply.status(201).send();

    }else{
        return reply.status(400).send(error);

    }
})

// DELETE
server.delete('/clientes/:id', async (request, reply) => {
    const clienteID = request.params.id;
    await databasePostgres.deleteCliente(clienteID);

    return reply.status(204).send();
})


server.listen({
    port: 3000
});
