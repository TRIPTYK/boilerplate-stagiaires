# JWT Authentication

Use JWT Bearer tokens for API authentication.

**Token generation:**
```typescript
import { generateTokens } from "#src/utils/jwt.utils.js";

const { accessToken, refreshToken } = generateTokens(
  { userId: user.id, email: user.email },
  jwtSecret,
  jwtRefreshSecret
);
```

**Token expiry:**
- Access token: 15 minutes
- Refresh token: 7 days (not currently used)

**Payload structure:**
```typescript
interface JwtPayload {
  userId: string;
  email: string;
}
```

**Rules:**
- Always return both accessToken and refreshToken from login
- Store tokens client-side via ember-simple-auth session
- Re-login required when access token expires
- Use `JWT_SECRET` and `JWT_REFRESH_SECRET` env vars (must be different)

**Why:** Stateless authentication without server-side session storage.
