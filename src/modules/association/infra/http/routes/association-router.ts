import { FastifyPluginAsync } from 'fastify';
import {
  createAssociationController,
  removeAssociationController,
} from 'modules/association/use-cases';

const RouteName = '/association';

const associationRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    RouteName,
    {
      schema: createAssociationController.schema,
    },
    createAssociationController.execute,
  );

  fastify.delete(
    `${RouteName}/:id`,
    {
      schema: removeAssociationController.schema,
    },
    removeAssociationController.execute,
  );
};

export default associationRouter;
