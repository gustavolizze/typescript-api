import { FastifyPluginAsync } from 'fastify';
import {
  createLabController,
  getActiveLabsController,
  removeLabController,
} from 'modules/lab/use-cases';

const RouteName = '/lab';

const labRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createLabController.execute);
  fastify.get(RouteName, getActiveLabsController.execute);
  fastify.delete(`${RouteName}/:id`, removeLabController.execute);
};

export default labRouter;
