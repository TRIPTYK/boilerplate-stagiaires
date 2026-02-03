import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { UserUpdateSchema, UserResponseSchema, type UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { hashPassword } from "@lib/utils/auth.utils.js";
import { object, string, type z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class UpdateRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserSchemaType>
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.patch('/:id', {
            schema: {
                params: object({
                    id: string(),
                }),
                body: UserUpdateSchema,
                response: {
                    200: object({
                        data: UserResponseSchema,
                    }),
                },
            },

        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const { id } = request.params as { id: string };
            const body = request.body as z.infer<typeof UserUpdateSchema>;
            const currentUser = request.user!;

            // Authorization: users can only update themselves
            if (currentUser.id !== id) {
                return reply.code(403).send({
                    message: 'You can only update your own profile',
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

            // Update fields if provided
            if (body.email !== undefined) {
                user.email = body.email;
            }
            if (body.firstName !== undefined) {
                user.firstName = body.firstName;
            }
            if (body.lastName !== undefined) {
                user.lastName = body.lastName;
            }
            if (body.password !== undefined) {
                user.password = await hashPassword(body.password);
            }

            await this.userRepository.getEntityManager().flush();

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
