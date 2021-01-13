import { FastifyPluginAsync } from 'fastify';
import glob from 'fast-glob';

export const v1Router: FastifyPluginAsync = async (fastifyInstance) => {
  const files = await glob('src/modules/**/infra/http/routes/*.{ts,js}', {
    absolute: true,
  });
  const modules = files.map((file) => require(file).default);

  for (const module of modules) {
    fastifyInstance.register(module);
  }
};
