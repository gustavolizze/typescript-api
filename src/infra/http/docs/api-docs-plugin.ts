import { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { ExamDtoSchema } from 'modules/exam/dto';
import { LabDtoSchema } from 'modules/lab/dto';

export const apiDocsPlugin = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(swagger, {
    mode: 'dynamic',
    swagger: {
      info: {
        title: 'Dasa API Challenge',
        description: 'Instruções de consumo da api',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Laboratórios',
          description: 'Endpoints para manutenção de laboratórios',
        },
        {
          name: 'Exames',
          description: 'Endpoints para manutenção de exames',
        },
        {
          name: 'Associações',
          description: 'Associar exames a laboratórios e vice-versa',
        },
      ],
      host: 'localhost',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    exposeRoute: false,
  });

  fastifyInstance.route({
    url: '/api/docs',
    method: 'GET',
    schema: { hide: true },
    handler(_, reply) {
      reply.sendFile('index.html');
    },
  });

  fastifyInstance.route({
    url: '/api/docs/json',
    method: 'GET',
    schema: { hide: true },
    handler(_, reply) {
      reply.send(fastifyInstance.swagger());
    },
  });

  fastifyInstance.route({
    url: '/api/docs/yaml',
    method: 'GET',
    schema: { hide: true },
    handler(_, reply) {
      reply
        .type('application/x-yaml')
        .send(fastifyInstance.swagger({ yaml: true }));
    },
  });
};
