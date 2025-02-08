/*
  Warnings:

  - A unique constraint covering the columns `[city,street,postCode]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Made the column `city` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `street` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `postCode` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "city" SET NOT NULL,
ALTER COLUMN "street" SET NOT NULL,
ALTER COLUMN "postCode" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_city_street_postCode_key" ON "Address"("city", "street", "postCode");
