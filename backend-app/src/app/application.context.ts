import type { AppConfiguration } from "@app/configuration.js";
import type { Logger } from "pino";
import { logger } from "./logger.js";

export interface ApplicationContext {
  configuration: AppConfiguration;
  logger: Logger;
}

export async function createApplicationContext(configuration: AppConfiguration) {
  return {
    configuration,
    logger: logger({ PRODUCTION_ENV: configuration.PRODUCTION_ENV }),
  } satisfies ApplicationContext;
}
