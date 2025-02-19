import { createTRPCRouter } from "../../trpc";
import { productsRouter } from "./products";
import { uploadFilesRouter } from "./upload-files";

export const adminRouter = createTRPCRouter({
  products: productsRouter,
  uploadFiles: uploadFilesRouter,
});
