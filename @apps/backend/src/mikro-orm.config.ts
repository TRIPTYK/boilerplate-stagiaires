import { defineConfig } from "@mikro-orm/postgresql";
import { loadConfiguration } from "./configuration.js";
import { databaseConfig } from "./app/database.connection.js";
import { seed } from "@ngneat/falso";

const config = loadConfiguration();

/**
 * Important for test reproduction
 */
seed(config.SEED);

export default defineConfig(databaseConfig(config));
