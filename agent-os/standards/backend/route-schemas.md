# Route Schema Validation

Use Zod schemas inline with each route definition.

```typescript
f.post("/", {
  schema: {
    body: object({ email: email(), name: string() }),
    response: {
      200: object({ data: UserSchema }),
      400: object({ message: string(), code: string() }),
    },
  },
}, handler);
```

**Rules:**
- Define schemas inline in route files, not in separate folders (colocation)
- Always validate: body, params, querystring (when present)
- Always define response schemas for all status codes the route returns
- Use `fastify-type-provider-zod` for end-to-end type inference
- Import Zod primitives directly: `import { object, string, email } from "zod"`

**Why:** Colocated schemas are easier to maintain — changes to a route and its schema happen in the same file.
