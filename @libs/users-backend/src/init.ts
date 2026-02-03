import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import type { LibraryContext } from "./context.js";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { createJwtAuthMiddleware } from "#src/middlewares/jwt-auth.middleware.js";
import { LoginRoute } from "#src/routes/login.route.js";
import { CreateRoute } from "#src/routes/create.route.js";
import { ProfileRoute } from "#src/routes/profile.route.js";
import { ListRoute } from "#src/routes/list.route.js";
import { GetRoute } from "#src/routes/get.route.js";
import { UpdateRoute } from "#src/routes/update.route.js";
import { DeleteRoute } from "#src/routes/delete.route.js";
import { UserEntity } from "./entities/user.entity.js";

export type FastifyInstanceTypeForModule = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  ZodTypeProvider
>;

export interface Route {
  routeDefinition(f: FastifyInstanceTypeForModule): void;
}

export interface ModuleInterface {
  setupRoutes(fastify: FastifyInstanceTypeForModule): Promise<void>;
}

export class Module implements ModuleInterface {
  private constructor(private context: LibraryContext) {}

  public static init(context: LibraryContext): Module {
    return new Module(context);
  }

  public async setupRoutes(fastify: FastifyInstanceTypeForModule): Promise<void> {
    const repository = this.context.em.getRepository(UserEntity);

    const authRoutes: Route[] = [
      new LoginRoute(
        this.context.em.getRepository(UserEntity),
        this.context.configuration.jwtSecret,
        this.context.configuration.jwtRefreshSecret,
      ),
    ];

    const jwtAuthMiddleware = createJwtAuthMiddleware(
      this.context.em,
      this.context.configuration.jwtSecret,
    );

    await fastify.register(
      async (f) => {
        for (const route of authRoutes) {
          route.routeDefinition(f);
        }
      },
      { prefix: "/auth" },
    );

    // User CRUD routes (under /users prefix)
    await fastify.register(
      async (f) => {
        // Apply JWT authentication middleware to all routes except /profile
        f.addHook("preValidation", async (request, reply) => {
          if (!request.url.endsWith("/profile")) {
            await jwtAuthMiddleware(request, reply);
          }
        });

        const userRoutes: Route[] = [
          new CreateRoute(repository),
          new ProfileRoute(),
          new ListRoute(this.context.em),
          new GetRoute(repository),
          new UpdateRoute(repository),
          new DeleteRoute(repository),
        ];

        for (const route of userRoutes) {
          route.routeDefinition(f);
        }
      },
      { prefix: "/users" },
    );
  }
}
