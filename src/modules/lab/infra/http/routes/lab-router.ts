import { FastifyPluginAsync } from 'fastify';
import {
  createLabController,
  getActiveLabsController,
} from 'modules/lab/use-cases';

const RouteName = '/lab';

const labRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createLabController.execute);
  fastify.get(RouteName, getActiveLabsController.execute);
};

export default labRouter;
