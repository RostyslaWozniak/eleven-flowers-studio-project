import { adminProcedure, createTRPCRouter } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { addCollectionSchema } from "@/lib/validation/collection";
import { Prisma } from "@prisma/client";
import { ADMIN_COLLECTION_SELECT_FIELDS } from "./services/collections-queries";
import { mapAdminCollectionsToDto } from "./dto/admin-collection-dto";
import { z } from "zod";

export const collectionsRouter = createTRPCRouter({
  create: adminProcedure
    .input(addCollectionSchema)
    .mutation(async ({ ctx, input }) => {
      const existingCollection = await ctx.db.collection.findUnique({
        where: {
          slug: input.slug,
        },
      });

      if (existingCollection) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Collection with this slug already exists",
        });
      }
      const collection = await ctx.db.collection.create({
        data: {
          slug: input.slug,
          imageUrl: input.imageUrl,
          translations: {
            create: [
              {
                language: "pl",
                name: input.translations.pl.name,
                description: input.translations.pl.description,
              },
              {
                language: "en",
                name: input.translations.en.name,
                description: input.translations.en.description,
              },
              {
                language: "ru",
                name: input.translations.ru.name,
                description: input.translations.ru.description,
              },
            ],
          },
        },
      });

      return collection;
    }),

  getAll: adminProcedure.query(async ({ ctx }) => {
    const collections = await ctx.db.collection.findMany({
      select: ADMIN_COLLECTION_SELECT_FIELDS,
      orderBy: {
        updatedAt: Prisma.SortOrder.desc,
      },
    });

    return mapAdminCollectionsToDto(collections);
  }),

  update: adminProcedure
    .input(addCollectionSchema.extend({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingCollection = await ctx.db.collection.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingCollection) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Collection not found",
        });
      }

      const collection = await ctx.db.collection.update({
        where: {
          id: input.id,
        },
        data: {
          slug: input.slug,
          imageUrl: input.imageUrl,
          translations: {
            deleteMany: {},
            create: [
              {
                language: "pl",
                name: input.translations.pl.name,
                description: input.translations.pl.description,
              },
              {
                language: "en",
                name: input.translations.en.name,
                description: input.translations.en.description,
              },
              {
                language: "ru",
                name: input.translations.ru.name,
                description: input.translations.ru.description,
              },
            ],
          },
        },
      });
      return collection.id;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.collection.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
