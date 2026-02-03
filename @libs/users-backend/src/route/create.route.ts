import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { UserCreateSchema, UserResponseSchema, type UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { hashPassword } from "@lib/utils/auth.utils.js";
import type { FastifyRequest, FastifyReply } from "fastify";
import { object, type z } from "zod";
import { randomUUID } from "crypto";

export class CreateRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserSchemaType>
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.post('/', {
            schema: {
                body: UserCreateSchema,
                response: {
                    200: object({
                        data: UserResponseSchema,
                    }),
                },
            },

        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const body = request.body as z.infer<typeof UserCreateSchema>;

            // Hash password
            const hashedPassword = await hashPassword(body.password);

            const user = this.userRepository.create({
                id: body.id || randomUUID(),
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                password: hashedPassword,
            });

            await this.userRepository.getEntityManager().flush();

            // Return user without password
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