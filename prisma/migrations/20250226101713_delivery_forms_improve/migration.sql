/*
  Warnings:

  - You are about to drop the column `firsName` on the `ContactInfo` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `ContactInfo` table. All the data in the column will be lost.
  - Made the column `orderId` on table `DeliveryDetails` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ContactInfo" DROP COLUMN "firsName",
DROP COLUMN "lastName",
ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "DeliveryDetails" ADD COLUMN     "flowerMessage" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT 'N/A',
ALTER COLUMN "orderId" SET NOT NULL;
