import { FastifyPluginAsync } from 'fastify';
import { createLabController } from 'modules/lab/use-cases';

const RouteName = '/lab';

const labRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createLabController.execute);
};

export default labRouter;
