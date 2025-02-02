/*
  Warnings:

  - Added the required column `slug` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "slug" TEXT NOT NULL,
ALTER COLUMN "price" DROP NOT NULL;
