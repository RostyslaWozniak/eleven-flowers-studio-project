/*
  Warnings:

  - Made the column `description` on table `CollectionTranslation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CollectionTranslation" ALTER COLUMN "description" SET NOT NULL;
