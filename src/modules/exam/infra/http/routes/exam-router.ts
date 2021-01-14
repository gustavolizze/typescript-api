import { FastifyPluginAsync } from 'fastify';
import {
  createExamController,
  getActiveExamsController,
  removeExamController,
} from 'modules/exam/use-cases';

const RouteName = '/exam';

const examRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createExamController.execute);
  fastify.get(RouteName, getActiveExamsController.execute);
  fastify.delete(`${RouteName}/:id`, removeExamController.execute);
};

export default examRouter;
