import Fastify from 'fastify';
import { z } from 'zod';
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { writeFileSync } from 'fs';
import { join } from 'path';
import { meta } from 'zod/v4/core';

const UserSchema = z.object({
  id: z.string(),
  type: z.literal('users'),
  attributes: z.object({
    name: z.string(),
    email: z.email(),
    createdAt: z.string(),
  }),
});

// Sample user data
const mockUsers = [
  {
    id: '1',
    type: 'users' as const,
    attributes: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      createdAt: new Date('2024-01-15').toISOString(),
    },
  },
  {
    id: '2',
    type: 'users' as const,
    attributes: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      createdAt: new Date('2024-02-20').toISOString(),
    },
  },
  {
    id: '3',
    type: 'users' as const,
    attributes: {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      createdAt: new Date('2024-03-10').toISOString(),
    },
  },
];


const UsersResponseSchema = z.object({
  data: z.array(UserSchema),
  meta: z.object({
    total: z.number(),
  }),
});

export async function createServer() {
    // Create Fastify instance with Zod type provider
    const server = Fastify({
    logger: true,
    }).withTypeProvider<ZodTypeProvider>();

    // Set Zod validator and serializer
    server.setValidatorCompiler(validatorCompiler);
    server.setSerializerCompiler(serializerCompiler);

    // Register Swagger
    await server.register(fastifySwagger, {
    openapi: {
        info: {
        title: 'Users API',
        description: 'Get all users',
        version: '1.0.0',
        },
        servers: [
        {
            url: 'http://localhost:3000',
            description: 'Development server',
        },
        ],
    },
    transform: jsonSchemaTransform,
    });

    // Register Swagger UI
    await server.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false,
    },
    });

    // Define the /users endpoint
    server.get(
    '/users',
    {
        schema: {
        response: {
            200: UsersResponseSchema,
        },
        },
    },
    async (request, reply) => {
        return {
        data: mockUsers,
        meta: {
            total: mockUsers.length,
        }
        };
    }
    );

    return server;    
}