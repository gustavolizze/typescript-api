import { FastifyPluginAsync } from 'fastify';
import path from 'path';
import glob from 'fast-glob';

export const v1Router: FastifyPluginAsync = async (fastifyInstance) => {
  const files = await glob(
    path.join(
      process.cwd(),
      process.env.NODE_PATH,
      'modules/**/infra/http/routes/!(*.d).{ts,js}',
    ),
    {
      absolute: true,
    },
  );

  const modules = files.map((file) => require(file).default);

  for (const module of modules) {
    fastifyInstance.register(module);
  }
};
