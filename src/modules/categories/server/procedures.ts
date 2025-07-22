import { getPayload } from "payload"
import configPromise from "@payload-config"

import { Category } from '@/payload-types';
import { baseProcedure, createTRPCRouter } from "@/trpc/init"

export const  categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
    collection: 'categories',
    pagination: false,
    depth: 1, // Polulate Subcategory, subcategories.[0] will be a type of "Category"
    where: {
      parent: {
        exists: false
      },
    },
    sort: "name"
  })

    const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          // Because of "depth : 1" we are confident "doc" will be a type of "Category"
          ...(doc as Category),
          subcategories: undefined,
        }))
      }));

    return formattedData;
  }),
});