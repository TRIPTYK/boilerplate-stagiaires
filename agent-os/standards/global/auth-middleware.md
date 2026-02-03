# Auth Middleware

Authentication flows through middleware on both backend and frontend.

## Backend: JWT Middleware

```typescript
// Create middleware with dependencies
const jwtAuthMiddleware = createJwtAuthMiddleware(em, jwtSecret);

// Apply to routes via preValidation hook
f.addHook("preValidation", jwtAuthMiddleware);
```

The middleware:
1. Extracts Bearer token from `Authorization` header
2. Verifies token and decodes payload
3. Loads user from database
4. Attaches user to `request.user`

## Frontend: WarpDrive Auth Handler

```typescript
// handlers/auth.ts
export default class AuthHandler {
  @service declare session: SessionService;

  request<T>(context: RequestContext, next: NextFn<T>) {
    const headers = new Headers(context.request.headers);
    headers.append(
      "Authorization",
      `Bearer ${this.session.data.authenticated.access_token}`
    );
    return next({ ...context.request, headers });
  }
}
```

**Rules:**
- Backend: Always return 401 with `UNAUTHORIZED` code on auth failure
- Frontend: Register AuthHandler in request manager pipeline
- Token is stored at `session.data.authenticated.access_token`

**Why:** Consistent auth handling across the stack with clear separation of concerns.
