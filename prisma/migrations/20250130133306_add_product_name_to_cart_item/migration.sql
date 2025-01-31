/*
  Warnings:

  - Added the required column `productName` to the `CartItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CartItem" ADD COLUMN     "productName" TEXT NOT NULL;
