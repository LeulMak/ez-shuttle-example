import { axiosInstanceForCDN } from "~/app/_core/config/axios-config";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import type { SiteConfig } from "~/app/_core/models/site-config/site-config";
import { isArrayEmpty } from "~/lib/utils/array-utils";

export const appUtilRouter = createTRPCRouter({
  getBackground: publicProcedure
    .input(z.object({ url: z.string() }))
    .query(async ({ input }) => {
      const url: string = input.url;

      const response = await axiosInstanceForCDN
        .get(`${url}_config.json`)
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });

      const siteConfigResponseData: SiteConfig = response.data as SiteConfig;

      const siteHeroBackgroundImages: string[] | undefined =
        siteConfigResponseData.Style?.BackgroundImages;

      if (isArrayEmpty<string>(siteHeroBackgroundImages))
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "No Background Found",
        });
      
      const randomImage: string =
        siteHeroBackgroundImages![
          Math.floor(Math.random() * siteHeroBackgroundImages!.length)
        ]!;

      return randomImage;
    }),
});
