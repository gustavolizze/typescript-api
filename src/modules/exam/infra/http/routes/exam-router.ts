import { FastifyPluginAsync } from 'fastify';
import { createExamController } from 'modules/exam/use-cases';

const RouteName = '/exam';

const examRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createExamController.execute);
};

export default examRouter;
