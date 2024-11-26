
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

// Adicionando a rota para login do admin
server.post('/login-admin', async (request, reply) => {
    const { usuario_admin, senha } = request.body;
    let error = {};

    // Verifica se o usuário e senha foram fornecidos
    if (!usuario_admin) {
        error.usuario_admin = 'Usuário não foi informado.';
    }
    if (!senha) {
        error.senha = 'Senha não foi informada.';
    }

    if (error.usuario_admin || error.senha) {
        return reply.status(400).send(error);
    }

    try {
        // Verifique se o admin existe no banco de dados
        const admin = await databasePostgres.verifyAdmin(usuario_admin, senha);
        
        if (admin) {
            // Retorne uma resposta de sucesso
            return reply.status(200).send({
                message: 'Login realizado com sucesso!',
                admin: admin // ou outro dado relevante
            });
        } else {
            // Se não encontrar, retorna um erro
            return reply.status(401).send({ error: 'Usuário ou senha incorretos.' });
        }
    } catch (err) {
        // Em caso de erro no banco ou algum erro interno
        console.error('Erro ao realizar o login:', err);
        return reply.status(500).send({ error: 'Erro ao realizar o login.' });
    }
});

// CREATE
server.post('/clientes', async (request, reply) => {
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.name) {
        error.name = 'Valor name não foi informado.';
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }
    if (!body.email) {
        error.email = 'Valor email não foi informado.';  // Adicionando validação de email
    }
    if (!body.cpf_cliente) {
        error.cpf_cliente = 'Valor cpf_cliente não foi informado.';
    }
    if (!body.endereco) {
        error.endereco = 'Valor endereço não foi informado.';
    }
    if (!body.complemento) {
        error.complemento = 'Valor complemento não foi informado.';
    }
    if (!body.descricao) {
        error.descricao = 'Valor descrição não foi informado.';
    }

    // Se todos os campos obrigatórios estiverem presentes, cria o cliente
    if (body.name && body.endereco && body.cpf_cliente) {
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

    if (!body.name) {
        error.name = 'Valor name não foi informado.';
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }
    if (!body.email) {
        error.email = 'Valor email não foi informado.';
    }
    if (!body.cpf_cliente) {
        error.cpf_cliente = 'Valor cpf_cliente não foi informado.';
    }
    if (!body.endereco) {
        error.endereco = 'Valor endereço não foi informado.';
    }
    if (!body.complemento) {
        error.complemento = 'Valor complemento não foi informado.';
    }
    if (!body.descricao) {
        error.descricao = 'Valor descrição não foi informado.';
    }

    if (body.name && body.endereco && clienteID) {
        await databasePostgres.updateCliente(clienteID, body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// DELETE
server.delete('/clientes/:id', async (request, reply) => {
    const clienteID = request.params.id;
    await databasePostgres.deleteCliente(clienteID);

    return reply.status(204).send();
})

// CREATE - Cuidadores
server.post('/cuidadores', async (request, reply) => {
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.name) {
        error.name = 'Valor name não foi informado.';
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }
    if (!body.email) {
        error.email = 'Valor email não foi informado.';  // Adicionando validação de email
    }
    if (!body.cpf_cuidador) {
        error.cpf_cuidador = 'Valor cpf_cuidador não foi informado.';
    }
    if (!body.endereco) {
        error.endereco = 'Valor endereço não foi informado.';
    }
    if (!body.complemento) {
        error.complemento = 'Valor complemento não foi informado.';
    }
    if (!body.descricao) {
        error.descricao = 'Valor descrição não foi informado.';
    }

    // Se todos os campos obrigatórios estiverem presentes, cria o cuidador
    if (body.name && body.endereco && body.cpf_cuidador) {
        await databasePostgres.createCuidador(body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// READ - Cuidadores
server.get('/cuidadores', async () => {
    const cuidadores = await databasePostgres.listCuidadores();
    return cuidadores;
});

// UPDATE - Cuidadores
server.put('/cuidadores/:id', async (request, reply) => {
    const cuidadorID = request.params.id;
    const body = request.body;

    let error = {};

    if (!body.name) {
        error.name = 'Valor name não foi informado.';
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }
    if (!body.email) {
        error.email = 'Valor email não foi informado.';  // Adicionando validação de email
    }
    if (!body.cpf_cuidador) {
        error.cpf_cuidador = 'Valor cpf_cuidador não foi informado.';
    }
    if (!body.endereco) {
        error.endereco = 'Valor endereço não foi informado.';
    }
    if (!body.complemento) {
        error.complemento = 'Valor complemento não foi informado.';
    }
    if (!body.descricao) {
        error.descricao = 'Valor descrição não foi informado.';
    }

    if (body.name && body.endereco && cuidadorID) {
        await databasePostgres.updateCuidador(cuidadorID, body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// DELETE - Cuidadores
server.delete('/cuidadores/:id', async (request, reply) => {
    const cuidadorID = request.params.id;
    await databasePostgres.deleteCuidador(cuidadorID);
    return reply.status(204).send();
});

// CREATE - Admins
server.post('/admins', async (request, reply) => {
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.usuario_admin) {
        error.usuario_admin = 'Valor usuario_admin não foi informado.';
    }
    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }

    // Se todos os campos obrigatórios estiverem presentes, cria o admin
    if (body.usuario_admin && body.senha) {
        await databasePostgres.createAdmin(body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// READ - Admins
server.get('/admins', async () => {
    const admins = await databasePostgres.listAdmins();
    return admins;
});

// UPDATE - Admins
server.put('/admins/:id', async (request, reply) => {
    const adminID = request.params.id;
    const body = request.body;

    let error = {};

    if (!body.senha) {
        error.senha = 'Valor senha não foi informado.';
    }
    if (!adminID) {
        error.id = 'Valor ID não foi informado.';
    }

    if (body.senha && adminID) {
        await databasePostgres.updateAdmin(adminID, body);
        return reply.status(200).send();
    } else {
        return reply.status(400).send(error);
    }
});

// DELETE - Admins
server.delete('/admins/:id', async (request, reply) => {
    const adminID = request.params.id;
    await databasePostgres.deleteAdmin(adminID);
    return reply.status(204).send();
});

// CREATE - Serviços
server.post('/servicos', async (request, reply) => {
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.tipo) {
        error.tipo = 'O tipo do serviço não foi informado.';
    }
    if (!body.data) {
        error.data = 'A data do serviço não foi informada.';
    }
    if (!body.id_cliente) {
        error.id_cliente = 'O ID do cliente não foi informado.';
    }
    if (!body.id_cuidador) {
        error.id_cuidador = 'O ID do cuidador não foi informado.';
    }

    if (Object.keys(error).length === 0) {
        await databasePostgres.createServico(body);
        return reply.status(201).send();
    } else {
        return reply.status(400).send(error);
    }
});

// READ - Serviços
server.get('/servicos', async (request, reply) => {
    try {
        const servicos = await databasePostgres.listServicos();
        return reply.status(200).send(servicos);
    } catch (err) {
        return reply.status(500).send({ error: 'Erro ao buscar serviços' });
    }
});

// UPDATE - Serviços
server.put('/servicos/:id', async (request, reply) => {
    const servicoID = request.params.id;
    const body = request.body;
    let error = {};

    // Validação de campos obrigatórios
    if (!body.tipo) {
        error.tipo = 'O tipo do serviço não foi informado.';
    }
    if (!body.data) {
        error.data = 'A data do serviço não foi informada.';
    }
    if (!body.horario) {
        error.horario = 'O horário do serviço não foi informado.';
    }
    if (!body.id_cliente) {
        error.id_cliente = 'O ID do cliente não foi informado.';
    }
    if (!body.id_cuidador) {
        error.id_cuidador = 'O ID do cuidador não foi informado.';
    }

    if (Object.keys(error).length === 0 && servicoID) {
        await databasePostgres.updateServico(servicoID, body);
        return reply.status(200).send();
    } else {
        return reply.status(400).send(error);
    }
});

// DELETE - Serviços
server.delete('/servicos/:id', async (request, reply) => {
    const servicoID = request.params.id;

    if (servicoID) {
        await databasePostgres.deleteServico(servicoID);
        return reply.status(204).send();
    } else {
        return reply.status(400).send({ error: 'O ID do serviço não foi informado.' });
    }
});

server.listen({
    port: 3000
});
