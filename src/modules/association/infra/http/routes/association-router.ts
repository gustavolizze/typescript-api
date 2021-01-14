import { FastifyPluginAsync } from 'fastify';
import { createAssociationController } from 'modules/association/use-cases';

const RouteName = '/association';

const associationRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createAssociationController.execute);
};

export default associationRouter;
