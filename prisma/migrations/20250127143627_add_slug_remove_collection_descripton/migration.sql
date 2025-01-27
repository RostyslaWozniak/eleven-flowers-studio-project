/*
  Warnings:

  - You are about to drop the column `description` on the `CollectionTranslation` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `ProductPrice` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Integer`.
  - A unique constraint covering the columns `[slug]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "CollectionTranslation" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "ProductPrice" ALTER COLUMN "price" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Collection_slug_key" ON "Collection"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
