import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import type { UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { object, string } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class DeleteRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserSchemaType>
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.delete('/:id', {
            schema: {
                params: object({
                    id: string(),
                }),
            },
        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as { id: string };
            const currentUser = request.user!;

            // Authorization: users can only delete themselves
            if (currentUser.id !== id) {
                return reply.code(403).send({
                    message: 'You can only delete your own profile',
                    code: 'FORBIDDEN',
                    status: 403,
                });
            }

            const user = await this.userRepository.findOne({ id });

            if (!user) {
                return reply.code(404).send({
                    message: `User with id ${id} not found`,
                    code: 'USER_NOT_FOUND',
                    status: 404,
                });
            }

            await this.userRepository.getEntityManager().remove(user).flush();

            return reply.code(204).send();
        });
    }
}
