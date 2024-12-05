import { z } from "zod";

export const quoteSchema = z.object({
  pickupPlaceId: z.string().optional(),
  dropOffPlaceId: z.string().optional(),
  day: z.string().optional(),
  month: z.string().optional(),
  year: z.string().optional(),
  hour: z.string().optional(),
  minute: z.string().optional(),
  vehicleTypeIdCsvList: z.string().optional(),
  includeBabySeat: z.string().optional(),
  includeTrailer: z.string().optional(),
  couponCode: z.string().optional(),
  isInternational: z.string().optional().default("false"),
});

export type Quote = z.infer<typeof quoteSchema>;
