import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { UserResponseSchema } from "@lib/schemas/user.schema.js";
import { object } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class ProfileRoute implements Route {
    public constructor() {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.get('/profile', {
            schema: {
                response: {
                    200: object({
                        data: UserResponseSchema,
                    }),
                },
            },
        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const user = request.user!;

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