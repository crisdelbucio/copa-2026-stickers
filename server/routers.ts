import { z } from "zod";
import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import * as db from "./db";

export const appRouter = router({
  // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  stickers: router({
    list: protectedProcedure.query(({ ctx }) => db.getUserStickers(ctx.user.id)),

    getByCountry: protectedProcedure
      .input(z.object({ countryCode: z.string() }))
      .query(({ ctx, input }) => db.getUserStickersByCountry(ctx.user.id, input.countryCode)),

    upsert: protectedProcedure
      .input(
        z.object({
          countryCode: z.string(),
          figurinhaNumber: z.number(),
          status: z.enum(["T", "R", "F"]),
        })
      )
      .mutation(({ ctx, input }) =>
        db.upsertUserSticker({
          userId: ctx.user.id,
          countryCode: input.countryCode,
          figurinhaNumber: input.figurinhaNumber,
          status: input.status,
        })
      ),

    delete: protectedProcedure
      .input(
        z.object({
          countryCode: z.string(),
          figurinhaNumber: z.number(),
        })
      )
      .mutation(({ ctx, input }) =>
        db.deleteUserSticker(ctx.user.id, input.countryCode, input.figurinhaNumber)
      ),

    stats: protectedProcedure.query(({ ctx }) => db.getUserStickerStats(ctx.user.id)),
  }),
});

export type AppRouter = typeof appRouter;
