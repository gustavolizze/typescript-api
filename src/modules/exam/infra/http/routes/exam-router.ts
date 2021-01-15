import { FastifyPluginAsync } from 'fastify';
import {
  createExamController,
  getActiveExamsController,
  removeExamController,
  updateExamController,
} from 'modules/exam/use-cases';

const RouteName = '/exam';

const examRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    RouteName,
    {
      schema: createExamController.schema,
    },
    createExamController.execute,
  );

  fastify.get(
    RouteName,
    {
      schema: getActiveExamsController.schema,
    },
    getActiveExamsController.execute,
  );

  fastify.delete(
    `${RouteName}/:id`,
    {
      schema: removeExamController.schema,
    },
    removeExamController.execute,
  );

  fastify.put(
    `${RouteName}/:id`,
    {
      schema: updateExamController.schema,
    },
    updateExamController.execute,
  );
};

export default examRouter;
