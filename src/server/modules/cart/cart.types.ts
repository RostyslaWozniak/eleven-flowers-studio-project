import type { z } from "zod";
import type { CartSchema } from "./cart.schema";

export type CartMutateSchema = z.infer<typeof CartSchema.mutateCart>;
