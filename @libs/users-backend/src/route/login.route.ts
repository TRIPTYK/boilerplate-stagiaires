import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { LoginSchema, type UserSchemaType } from "@lib/schemas/user.schema.js";
import type { EntityRepository } from "@mikro-orm/core";
import { verifyPassword } from "@lib/utils/auth.utils.js";
import { generateTokens } from "@lib/utils/jwt.utils.js";
import { object, string, type z } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export class LoginRoute implements Route {
    public constructor(
        private userRepository: EntityRepository<UserSchemaType>,
        private jwtSecret: string,
        private jwtRefreshSecret: string
    ) {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.post('/login', {
            schema: {
                body: LoginSchema,
                response: {
                    200: object({
                        data: object({
                            accessToken: string(),
                            refreshToken: string(),
                        }),
                    }),
                },
            }
        }, async (request: FastifyRequest, reply: FastifyReply) => {
            const { email, password } = request.body as z.infer<typeof LoginSchema>;

            // Find user by email
            const user = await this.userRepository.findOne({ email });

            if (!user) {
                return reply.code(401).send({
                    message: 'Invalid email or password',
                    code: 'INVALID_CREDENTIALS',
                    status: 401,
                });
            }

            // Verify password
            const isValidPassword = await verifyPassword(user.password, password);

            if (!isValidPassword) {
                return reply.code(401).send({
                    message: 'Invalid email or password',
                    code: 'INVALID_CREDENTIALS',
                    status: 401,
                });
            }

            // Generate tokens
            const tokens = generateTokens(
                { userId: user.id, email: user.email },
                this.jwtSecret,
                this.jwtRefreshSecret
            );

            return reply.send({
                data: tokens,
            });
        });
    }
}
