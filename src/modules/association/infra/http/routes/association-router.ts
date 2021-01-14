import { FastifyPluginAsync } from 'fastify';
import {
  createAssociationController,
  removeAssociationController,
} from 'modules/association/use-cases';

const RouteName = '/association';

const associationRouter: FastifyPluginAsync = async (fastify) => {
  fastify.post(RouteName, createAssociationController.execute);
  fastify.delete(`${RouteName}/:id`, removeAssociationController.execute);
};

export default associationRouter;
