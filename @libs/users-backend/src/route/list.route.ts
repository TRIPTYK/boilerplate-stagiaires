import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { UserResponseSchema, UserSchema, type UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityManager } from "@mikro-orm/core";
import { array, number, object } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class ListRoute implements Route {
    public constructor(
        private em: EntityManager
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.get('/', {
            schema: {
                response: {
                    200: object({
                        data: array(UserResponseSchema),
                        meta: object({
                            total: number(),
                        }),
                    }),
                },
            },

        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const queryParams = request.query as Record<string, any>;
            const searchQuery = queryParams['filter[search]'] as string | undefined;
            const sortParam = queryParams['sort'] as string | undefined;

            // Build where clause
            const where: any = {};

            // Apply search filter
            if (searchQuery) {
                where.$or = [
                    { firstName: { $like: `%${searchQuery}%` } },
                    { lastName: { $like: `%${searchQuery}%` } },
                    { email: { $like: `%${searchQuery}%` } },
                ];
            }

            // Build orderBy clause
            let orderBy: any = {};
            if (sortParam) {
                const isDescending = sortParam.startsWith('-');
                const field = isDescending ? sortParam.slice(1) : sortParam;
                
                if (['firstName', 'lastName', 'email'].includes(field)) {
                    orderBy = { [field]: isDescending ? 'DESC' : 'ASC' };
                }
            }

            const userRepository = this.em.getRepository(UserSchema);
            const [users, total] = await userRepository.findAndCount(where, { orderBy });

            // Map users to response format (exclude password)
            const data = users.map((user: UserSchemaType) => ({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            }));

            return reply.send({
                data,
                meta: {
                    total,
                },
            });
        });
    }
}
