import { writeFileSync } from "fs";
import { join } from "path";
import { createServer } from "./server.js";

const server = await createServer();

await server.ready();

// Extract OpenAPI schema to JSON file
const openapiSchema = server.swagger();
const schemaPath = join(process.cwd(), 'openapi.json');
writeFileSync(schemaPath, JSON.stringify(openapiSchema, null, 2));

await server.close();

console.log(`OpenAPI schema exported to: ${schemaPath}`);