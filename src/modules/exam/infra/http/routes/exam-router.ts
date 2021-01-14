import { FastifyPluginAsync } from 'fastify';
import {
  createExamController,
  getActiveExamsController,
  removeExamController,
  updateExamUseCase,
} from 'modules/exam/use-cases';

const RouteName = '/exam';

const examRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createExamController.execute);
  fastify.get(RouteName, getActiveExamsController.execute);
  fastify.delete(`${RouteName}/:id`, removeExamController.execute);
  fastify.put(`${RouteName}/:id`, updateExamUseCase.execute);
};

export default examRouter;
