/*
  Warnings:

  - Made the column `name` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "name" SET NOT NULL;
