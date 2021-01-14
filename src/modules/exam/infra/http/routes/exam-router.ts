import { FastifyPluginAsync } from 'fastify';
import {
  createExamController,
  getActiveExamsController,
} from 'modules/exam/use-cases';

const RouteName = '/exam';

const examRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createExamController.execute);
  fastify.get(RouteName, getActiveExamsController.execute);
};

export default examRouter;
