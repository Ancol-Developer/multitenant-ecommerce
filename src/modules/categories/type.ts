import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CategogriesGetManyOutput = inferRouterOutputs<AppRouter>["categories"]["getMany"];
export type CategogriesGetManyOutputSingle = CategogriesGetManyOutput[0];