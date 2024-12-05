import { z } from "zod";

export const placeSchema = z.object({
  displayName: z.string().optional(),
  googlePlaceId: z.string().optional(),
});

export type Place = z.infer<typeof placeSchema>;

export const autoCompleteParamsSchema = z.object({
  querytext: z.string(),
  partnerKey: z.string(),
  SessionId: z.string(),
  types: z.string(),
  restrictCountry: z.string().optional(),
});

export type AutoCompleteParams = z.infer<typeof autoCompleteParamsSchema>;

export const ezPlaceParamsSchema = z.object({
  googlePlaceID: z.string(),
  sessionId: z.string(),
});

export type EZPlaceParams = z.infer<typeof ezPlaceParamsSchema>;
