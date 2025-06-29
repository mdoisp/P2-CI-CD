module.exports = {
  openapi: '3.0.0',
  info: {
    title: 'API de Usuários - P2 Fatec',
    version: '1.0.0',
    description: 'API RESTful para gerenciamento de usuários com integração CI/CD',
  },
  servers: [
    { url: 'http://localhost:3000', description: 'Servidor local' }
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Listar todos os usuários',
        responses: {
          200: {
            description: 'Lista de usuários',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/User' } }
              }
            }
          }
        }
      },
      post: {
        summary: 'Criar um novo usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' }
            }
          }
        },
        responses: {
          201: {
            description: 'Usuário criado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          400: { description: 'Erro de validação' }
        }
      }
    },
    '/users/{id}': {
      get: {
        summary: 'Buscar usuário por ID',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: {
            description: 'Usuário encontrado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          404: { description: 'Usuário não encontrado' }
        }
      },
      put: {
        summary: 'Atualizar usuário',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UserInput' }
            }
          }
        },
        responses: {
          200: {
            description: 'Usuário atualizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/User' }
              }
            }
          },
          400: { description: 'Erro de validação' },
          404: { description: 'Usuário não encontrado' }
        }
      },
      delete: {
        summary: 'Remover usuário',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } }
        ],
        responses: {
          200: { description: 'Usuário removido com sucesso' },
          404: { description: 'Usuário não encontrado' }
        }
      }
    }
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          name: { type: 'string', example: 'João Silva' },
          email: { type: 'string', example: 'joao@email.com' },
          createdAt: { type: 'string', example: '2024-06-23T12:00:00.000Z' },
          updatedAt: { type: 'string', example: '2024-06-23T12:00:00.000Z' }
        }
      },
      UserInput: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'João Silva' },
          email: { type: 'string', example: 'joao@email.com' }
        },
        required: ['name', 'email']
      }
    }
  }
};

