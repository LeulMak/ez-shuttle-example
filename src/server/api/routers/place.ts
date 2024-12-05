import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  axiosInstance,
  axiosInstanceWithCred,
} from "~/app/_core/config/axios-config";
import {
  getAutoCompleteLocationEndpoint,
  getEZPlaceIdEndpoint,
} from "~/app/_core/config/endpoints";
import { TRPCError } from "@trpc/server";
import type { Place } from "~/app/_core/models/place/place";
import {
  getAutoCompleteParams,
  getEZPlaceParams,
} from "~/app/_core/services/place-service";
import { getBasicAuth } from "~/app/_core/services/auth-service";

export const placeRouter = createTRPCRouter({
  getAutoCompleteLocation: publicProcedure
    .input(
      z.object({
        term: z.string(),
        isLocal: z.boolean(),
      }),
    )
    .query(async ({ input }) => {
      const { term, isLocal } = input;
      const queryParams: string = getAutoCompleteParams(term, isLocal);

      const response = await axiosInstance
        .get(getAutoCompleteLocationEndpoint(queryParams))
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });

      console.log(response.data);

      return response.data as Place[];
    }),
  getEZPlaceId: publicProcedure
    .input(
      z.object({
        googlePlaceId: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { googlePlaceId } = input;
      const queryParams: string = getEZPlaceParams(googlePlaceId);

      const response = await axiosInstanceWithCred
        .get(getEZPlaceIdEndpoint(queryParams), {
          headers: {
            Authorization: getBasicAuth() ?? "",
          },
        })
        .catch((error) => {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: error as string | undefined,
          });
        });

      return response.data as string | null;
    }),
});
