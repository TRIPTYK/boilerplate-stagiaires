import type { UserSchemaType } from './schemas/user.schema.js';

declare module 'fastify' {
  interface FastifyRequest {
    user?: UserSchemaType;
  }
}
