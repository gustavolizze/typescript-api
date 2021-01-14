import { FastifyPluginAsync } from 'fastify';
import {
  createLabController,
  getActiveLabsController,
  getActiveLabsByExamController,
  removeLabController,
  updateLabController,
} from 'modules/lab/use-cases';

const RouteName = '/lab';

const labRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createLabController.execute);
  fastify.get(`${RouteName}/by-exam`, getActiveLabsByExamController.execute);
  fastify.get(RouteName, getActiveLabsController.execute);
  fastify.delete(`${RouteName}/:id`, removeLabController.execute);
  fastify.put(`${RouteName}/:id`, updateLabController.execute);
};

export default labRouter;
