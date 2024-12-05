import { z } from "zod";

export const vehicleSchema = z.object({
  Id: z.string().optional(),
  LinkedQuoteId: z.any(),
  TotalAmountInCents: z.number().int(),
  BaseAmountInCents: z.number().int(),
  PickupPlaceId: z.string(),
  DropoffPlaceId: z.string(),
  VehicleTypeId: z.string(),
  VehicleTypeName: z.string(),
  VehicleTypeThumbnailUrl: z.string(),
  Day: z.number().int(),
  Month: z.number().int(),
  Year: z.number().int(),
  Hour: z.number().int(),
  Minute: z.number().int(),
  ClientId: z.string(),
  CouponCode: z.string(),
  CouponDiscountAmountInCents: z.number().int(),
  AfterHoursSurcharge: z.number().int(),
  BabySeatSurcharge: z.number().int(),
  TrailerSurcharge: z.number().int(),
  PricePlanId: z.number().int(),
  IncludeTrailer: z.boolean(),
  IncludeBabySeat: z.boolean(),
  IncludeSanitize: z.boolean(),
  CreateDateTimeUtc: z.string()
    .optional()
    .transform((value) => (value ? new Date(value) : undefined)),
  VehicleTypePax: z.number().int(),
});

export type Vehicle = z.infer<typeof vehicleSchema>;