import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { stripeServerClient } from "@/lib/stripe/stripe-server";

export const stripeRouter = createTRPCRouter({
  getClientSessionSecret: publicProcedure
    .input(
      z.object({
        cartId: z.string().nullable(),
        userId: z.string().nullable(),
      }),
    )
    .query(async ({ ctx, input }) => {
      console.log(input);
      if (!input.userId) {
        throw new Error("User not found");
      }
      if (!input.cartId) {
        throw new Error("Cart not found");
      }

      const cart = await ctx.db.cart.findUnique({
        where: {
          id: input.cartId,
        },
        select: {
          id: true,
          items: {
            select: {
              price: true,
              quantity: true,
              product: {
                select: {
                  translations: {
                    select: {
                      name: true,
                    },
                    where: {
                      language: "pl",
                    },
                    take: 1,
                  },
                },
              },
            },
          },
        },
      });
      if (!cart) {
        throw new Error("Cart not found");
      }

      const lineItems = cart.items.map((item) => {
        if (item.price == null || item.price <= 0) {
          throw new Error(
            `Invalid price for item: ${item.product.translations[0]?.name}`,
          );
        }
        return {
          quantity: item.quantity,
          price_data: {
            currency: "pln",
            product_data: {
              name: item.product.translations[0]?.name ?? "",
            },
            unit_amount: item.price,
          },
        };
      });

      const session = await stripeServerClient.checkout.sessions.create({
        line_items: lineItems,
        ui_mode: "embedded",
        mode: "payment",
        return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/webhooks/stripe?stripeSessionId={CHECKOUT_SESSION_ID}`,
        customer_email: "user.email",
        payment_intent_data: {
          receipt_email: "user.email",
        },
        metadata: {
          cartId: cart.id,
          // userId: user.id,
        },
      });

      if (session.client_secret == null)
        throw new Error("Client secret is null");

      return session.client_secret;
    }),
});
