import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

export const userRouter = createTRPCRouter({
  getUserData: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          firstName: true,
          lastName: true,
          email: true,
          address: {
            select: {
              street: true,
              city: true,
              postCode: true,
            },
            take: 1,
          },
        },
      });
      if (!user)
        return {
          user: null,
          message: "User not found",
        };

      return {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          address: user.address[0]?.street,
          city: user.address[0]?.city,
          postalCode: user.address[0]?.postCode,
        },
      };
    }),
});
