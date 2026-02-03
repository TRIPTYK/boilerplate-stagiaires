import type { FastifyInstanceTypeForModule, Route } from "@lib/init.js";
import { object } from "zod";
import { jsonApiSerializeSingleUserResponse, SerializedUserSchema } from "@lib/serializer/user.serializer.js";

export class ProfileRoute implements Route {
    public constructor() {}

    public routeDefinition(f: FastifyInstanceTypeForModule) {
        return f.get('/profile', {
            schema: {
                response: {
                    200: object({
                        data: SerializedUserSchema,
                    }),
                },
            },
        }, async (request, reply) => {
            const user = request.user!;

            return reply.send(jsonApiSerializeSingleUserResponse(user));
        });
    }
}