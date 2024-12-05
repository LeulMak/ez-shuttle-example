import { z } from "zod";

export const siteStyleSchema = z.object({
  Button_Primary_BackgroundColor: z.string().optional(),
  Button_Alert_BackgroundColor: z.string().optional(),
  Primary_BackgroundColor: z.string().optional(),
  BackgroundImages: z.array(z.string()).optional(),
});

export type SiteStyle = z.infer<typeof siteStyleSchema>;

export const siteConfigSchema = z.object({
  AllowedPaymentType: z.array(z.number().int()).optional(),
  IsDiscountCouponVisible: z.boolean().optional(),
  RestrictBusinessSedan: z.boolean().optional(),
  IsCostCentreVisible: z.boolean().optional(),
  CustomFieldConfigName: z.string().optional(),
  Style: siteStyleSchema.optional(),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
