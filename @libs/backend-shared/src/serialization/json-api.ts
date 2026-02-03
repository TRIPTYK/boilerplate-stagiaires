import { literal, object, string, ZodObject } from "zod";
import { z } from "zod";

export const makeJsonApiDocumentSchema = <T extends ZodObject>(type: string, attributesSchema: T): ZodObject<{
    id: z.ZodString;
    type: z.ZodLiteral<string>;
    attributes: T;
}, z.core.$strip> =>
  object({
    id: string(),
    type: literal(type),
    attributes: attributesSchema,
  });

export const makeSingleJsonApiTopDocument = <T extends ZodObject>(dataSchema: T): ZodObject<{
    data: T;
    meta: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}> =>
  object({
    data: dataSchema,
    meta: z.optional(z.record(z.string(), z.unknown())),
  });