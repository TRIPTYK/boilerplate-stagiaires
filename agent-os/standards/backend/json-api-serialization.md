# JSON:API Serialization

All API responses use JSON:API format for Ember compatibility.

**Single resource:**
```json
{ "data": { "id": "123", "type": "users", "attributes": { "email": "..." } } }
```

**Collection:**
```json
{ "data": [...], "meta": { "total": 42 } }
```

**Implementation:**
```typescript
// Define schema with makeJsonApiDocumentSchema
export const UserSchema = makeJsonApiDocumentSchema("users", object({
  email: email(),
  firstName: string(),
}));

// Serialize entity to JSON:API format
export function jsonApiSerializeUser(user: UserEntity) {
  return { id: user.id, type: "users", attributes: { ... } };
}
```

**Rules:**
- Use `@libs/backend-shared` helpers: `makeJsonApiDocumentSchema`, `makeSingleJsonApiTopDocument`
- Type must match resource name (plural): `"users"`, `"posts"`
- Serializer functions live in `serializers/[entity].serializer.ts`
- Never expose entity fields directly — always use a serializer

**Why:** EmberData expects JSON:API format. Consistent serialization ensures frontend compatibility.
