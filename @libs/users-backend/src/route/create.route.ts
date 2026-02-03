import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { type UserEntityType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { object, z } from "zod";
import { randomUUID } from "crypto";
import { makeSingleJsonApiTopDocument, SerializedUserSchema } from "@lib/serializer/user.serializer.js";
import { hash } from "argon2";

export class CreateRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserEntityType>
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.post('/', {
            schema: {
                body: object({
                    data: object({
                        id: z.string().optional(),
                        type: z.literal('users'),
                        attributes: object({
                            email: z.email(),
                            password: z.string().min(8),
                            firstName: z.string(),                            lastName: z.string(),
                        }),
                    })
                }),
                response: {
                    200: makeSingleJsonApiTopDocument(SerializedUserSchema)
                },
            },

        }, async (request, reply) => {
            const body = request.body.data.attributes;

            const password = await hash(body.password);

            const user = this.userRepository.create({
                id: request.body.data.id || randomUUID(),
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                password,
            });

            await this.userRepository.getEntityManager().flush();

            // Return user without password
            return reply.send({
                data: {
                    id: user.id,
                    type: 'users' as const,
                    attributes: {
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    }
                },
            });
        });
    }
}