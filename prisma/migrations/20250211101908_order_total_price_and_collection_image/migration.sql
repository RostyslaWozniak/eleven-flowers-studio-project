/*
  Warnings:

  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Collection" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT 'https://njmm8e6312.ufs.sh/f/mgG8Yp1X9p5v0Qj5FyUDxhnoKp8aAPubiYyHfqdCLRXFBstl';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalPrice" INTEGER NOT NULL;
