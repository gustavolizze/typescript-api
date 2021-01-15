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
  fastify.post(
    RouteName,
    {
      schema: createLabController.schema,
    },
    createLabController.execute,
  );

  fastify.get(
    `${RouteName}/by-exam`,
    {
      schema: getActiveLabsByExamController.schema,
    },
    getActiveLabsByExamController.execute,
  );

  fastify.get(
    RouteName,
    {
      schema: getActiveLabsController.schema,
    },
    getActiveLabsController.execute,
  );

  fastify.delete(
    `${RouteName}/:id`,
    {
      schema: removeLabController.schema,
    },
    removeLabController.execute,
  );

  fastify.put(
    `${RouteName}/:id`,
    {
      schema: updateLabController.schema,
    },
    updateLabController.execute,
  );
};

export default labRouter;
