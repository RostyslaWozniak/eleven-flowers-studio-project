/*
  Warnings:

  - Made the column `address_id` on table `orders` required. This step will fail if there are existing NULL values in that column.
  - Made the column `contact_info_id` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_address_id_fkey";

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivery_price" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "address_id" SET NOT NULL,
ALTER COLUMN "contact_info_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
