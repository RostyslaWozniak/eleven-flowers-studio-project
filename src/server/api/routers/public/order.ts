import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";

const requiredString = z.string().trim().min(1, "Required").max(50);

export const orderRouter = createTRPCRouter({
  createNewOrder: publicProcedure
    .input(
      z.object({
        firstName: requiredString,
        lastName: requiredString,
        email: requiredString,
        address: requiredString,
        city: requiredString,
        postalCode: requiredString,
        cartId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (user) return { message: "User already exists", userId: user.id };

      try {
        const newUser = await ctx.db.user.create({
          data: {
            firstName: input.firstName,
            lastName: input.lastName,
            email: input.email,
            address: {
              create: {
                street: input.address,
                city: input.city,
                postCode: input.postalCode,
              },
            },
            cartId: input.cartId,
          },
        });

        return { message: "User created successfully", userId: newUser.id };
      } catch (err) {
        if (err instanceof Error) {
          return { message: err.message, userId: null };
        } else {
          return { message: "An unknown error occurred", userId: null };
        }
      }
    }),
});
