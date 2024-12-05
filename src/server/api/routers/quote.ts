import { quoteSchema } from "~/app/_core/models/quote/quote";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { getQuoteQueryParams } from "~/app/_core/services/place-service";
import { axiosInstanceWithCred } from "~/app/_core/config/axios-config";
import { getQuoteEndpoint } from "~/app/_core/config/endpoints";
import { getBasicAuth } from "~/app/_core/services/auth-service";
import { TRPCError } from "@trpc/server";
import type { Vehicle } from "~/app/_core/models/vehicles/vehicles";

export const quoteRouter = createTRPCRouter({
  getQuote: publicProcedure
    .input(z.object({ quoteRequest: quoteSchema }))
    .query(async ({ input }) => {
      const { quoteRequest } = input;
      const queryParams: string = getQuoteQueryParams(quoteRequest);

      const response = await axiosInstanceWithCred
        .get(getQuoteEndpoint(queryParams), {
          headers: { Authorization: getBasicAuth() },
        })
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });

        console.log(response.data);

      return response.data as Vehicle[];
    }),
});
