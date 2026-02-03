import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { UserResponseSchema, type UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { object, string } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class GetRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserSchemaType>
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.get('/:id', {
            schema: {
                params: object({
                    id: string(),
                }),
                response: {
                    200: object({
                        data: UserResponseSchema,
                    }),
                },
            },

        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as { id: string };

            const user = await this.userRepository.findOne({ id });

            if (!user) {
                return reply.code(404).send({
                    message: `User with id ${id} not found`,
                    code: 'USER_NOT_FOUND',
                    status: 404,
                });
            }

            return reply.send({
                data: {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
            });
        });
    }
}
